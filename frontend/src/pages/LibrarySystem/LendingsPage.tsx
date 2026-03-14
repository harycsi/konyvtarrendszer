import axios from 'axios';
import { useState, useMemo, createContext, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Logout } from '../Auth/LogoutPage';
import '../../App.css';
import { handleVisszavetel } from '../../ApiActions';
import { useLibrary } from './LibrarySystemPage';

interface Kolcsonzes {
    id: number;
    user_id: number;
    konyv_id: number;
    kolcs_datum: string;
    hatarido: string;
    email: number;
    dolg_id: number;
    uzenet: string | null;
    user?: { name: string };
    konyv?: { cim: string };
}

interface KolcsonzesContextType {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    kolcsonzesek: Kolcsonzes[];
    setKolcsonzesek: React.Dispatch<React.SetStateAction<Kolcsonzes[]>>;
}

const KolcsonzesContext = createContext<KolcsonzesContextType | undefined>(undefined);

export const KolcsonzesLista = () => {
    const [kolcsonzesek, setKolcsonzesek] = useState<Kolcsonzes[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { fetchBooks } = useLibrary();

    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchKolcsonzesek = async () => {
            if (!token || role !== "1") return;
            try {
                const response = await axios.get('http://localhost:8000/api/konyvtar/kolcsonzes-lista', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                setKolcsonzesek(response.data);
            } catch (error) {
                console.error("Hiba a lekérésnél:", error);
            }
        };
        fetchKolcsonzesek();
    }, [token, role]);

    if (role !== "1") {
        return (
            <div className="library-container">
                <p>Nincs jogosultságod az oldal megtekintéséhez!</p>
                <NavLink to="/">Vissza a főoldalra</NavLink>
            </div>
        );
    }

    const filteredKolcsonzesek = useMemo(() => {
        const lowerSearch = searchTerm.toLowerCase();
        return kolcsonzesek.filter(k =>
            k.id.toString().includes(lowerSearch) ||
            k.user_id.toString().includes(lowerSearch) ||
            k.kolcs_datum.includes(lowerSearch)
        );
    }, [searchTerm, kolcsonzesek]);

    // Segédfüggvény a késés ellenőrzéséhez
    const isOverdue = (dateStr: string) => {
        return new Date(dateStr) < new Date();
    };

    return (
        <KolcsonzesContext.Provider value={{ searchTerm, setSearchTerm, kolcsonzesek, setKolcsonzesek }}>

            <div className="library-container">
                <header>
                    <div className="logo">Könyvtárrendszer</div>
                    <nav>
                        <ul>
                            <li><NavLink to="/konyvtarrendszer">Könyvek</NavLink></li>
                            <li><NavLink to="/kolcsonzok">Kölcsönzők</NavLink></li>
                            <li><NavLink to="/kolcsonzesek">Kölcsönzések</NavLink></li>
                            <li><NavLink to="/foglalasok">Foglalások</NavLink></li>
                            <li>
                                <button type="button" onClick={() => Logout('/')} className="nav-link-button">
                                    Kilépés
                                </button>
                            </li>
                        </ul>
                    </nav>
                </header>

                <div className="kolcsonzes-lista-container">
                    <KolcsonzesSearchBar />
                    <hr />
                    <h3>Aktuális kölcsönzések</h3>
                    <table className="kolcsonzes-tablazat">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Felhasználó ID</th>
                                <th>Könyv ID</th>
                                <th>Kölcsönzés</th>
                                <th>Határidő (14 nap)</th>
                                <th>E-mail</th>
                                <th>Könyvtáros</th>
                                <th>Megjegyzés</th>
                                <th>Művelet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredKolcsonzesek.map((k) => (
                                <tr key={k.id} className={isOverdue(k.hatarido) ? "overdue-row" : ""}>
                                    <td>{k.id}</td>
                                    <td>{k.user_id}</td>
                                    <td>{k.konyv_id}</td>
                                    <td>{new Date(k.kolcs_datum).toLocaleDateString('hu-HU')}</td>
                                    <td className={isOverdue(k.hatarido) ? "overdue-date" : ""}>
                                        {new Date(k.hatarido).toLocaleDateString('hu-HU')}
                                    </td>
                                    <td>{k.email === 1 ? "Igen" : "Nem"}</td>
                                    <td>{k.dolg_id}</td>
                                    <td>{k.uzenet || "-"}</td>
                                    <td>
                                        <button onClick={() => { handleVisszavetel(k.id, setKolcsonzesek, fetchBooks); }}>
                                            Visszavétel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </KolcsonzesContext.Provider>
    );
};

const KolcsonzesSearchBar = () => {
    const context = useContext(KolcsonzesContext);
    if (!context) return null;

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <label>Keresés:
                <input
                    type="text"
                    value={context.searchTerm}
                    placeholder="ID..."
                    onChange={(e) => context.setSearchTerm(e.target.value)}
                />
            </label>
        </form>
    );
}

export default KolcsonzesLista;
