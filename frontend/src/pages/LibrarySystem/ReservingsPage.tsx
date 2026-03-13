import axios from 'axios';
import { useState, useMemo, createContext, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Logout } from '../Auth/LogoutPage';
import '../../App.css';
import { handleKolcsonzesFoglalaskor } from '../../ApiActions';
import { LibraryContext } from './LibrarySystemPage';

interface Foglalas {
    id: number;
    user_id: number;
    konyv_id: number;
    fogl_datum: string;
    user?: { name: string };
    konyv?: { cim: string };
}

interface FoglalasContextType {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    foglalasok: Foglalas[];
    setFoglalasok: React.Dispatch<React.SetStateAction<Foglalas[]>>;
}

const FoglalasContext = createContext<FoglalasContextType | undefined>(undefined);

export const FoglalasLista = () => {
    const [foglalasok, setFoglalasok] = useState<Foglalas[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const context = useContext(LibraryContext);

    useEffect(() => {
        const fetchFoglalasok = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const response = await axios.get('http://localhost:8000/api/konyvtar/foglalas-lista', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                setFoglalasok(response.data);
            } catch (error) {
                console.error("Hiba a lekérésnél:", error);
            }
        };
        fetchFoglalasok();
    }, []);

    const filteredFoglalasok = useMemo(() => {
        const lowerSearch = searchTerm.toLowerCase();
        return foglalasok.filter(f =>
            f.id.toString().includes(lowerSearch) ||
            f.user_id.toString().includes(lowerSearch) ||
            f.fogl_datum.includes(lowerSearch)
        );
    }, [searchTerm, foglalasok]);

    if (!context){
        return <p>Betöltés (Context hiba)...</p>;
    }

    const { fetchBooks } = context;

    return (
        <FoglalasContext.Provider value={{ searchTerm, setSearchTerm, foglalasok, setFoglalasok }}>
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

                <div className="foglalas-lista-container">
                    <FoglalasSearchBar />
                    <hr />
                    <h3>Aktuális foglalások</h3>
                    <table className="foglalas-tablazat">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Felhasználó ID</th>
                                <th>Könyv ID</th>
                                <th>Dátum</th>
                                <th>Művelet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFoglalasok.map((f) => (
                                <tr key={f.id}>
                                    <td>{f.id}</td>
                                    <td>{f.user_id}</td>
                                    <td>{f.konyv_id}</td>
                                    <td>{new Date(f.fogl_datum).toLocaleDateString('hu-HU')}</td>
                                    <td>
                                        <button onClick={() => handleKolcsonzesFoglalaskor(f, setFoglalasok, fetchBooks)}>
                                            Kölcsönzés
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredFoglalasok.length === 0 && <p>Nincsenek aktív foglalások.</p>}
                </div>
            </div>
        </FoglalasContext.Provider>
    );
};

const FoglalasSearchBar = () => {
    const context = useContext(FoglalasContext);
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

export default FoglalasLista;