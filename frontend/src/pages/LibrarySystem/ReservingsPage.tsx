import axios from 'axios';
import { useState, useMemo, createContext, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Logout } from '../Auth/LogoutPage';
import '../../App.css';
import { handleKolcsonzesFoglalaskor, handleTorlesFoglalaskor } from '../../ApiActions';
import { LibraryContext } from './LibrarySystemPage';
import { Modal } from '../../Modals';

interface Foglalas {
    id: number;
    user_id: number;
    konyv_id: number;
    fogl_datum: string;
    user?: Users;
    konyv?: Book;
}

interface Users {
    id: number;
    nev: string;
}

interface Book {
    id: number;
    cim: string;
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
    const [modal, setModal] = useState<{ msg: string | null; type: 'success' | 'error' }>({
        msg: null,
        type: 'success'
    });
    const context = useContext(LibraryContext);
    const notify = (msg: string, type: 'success' | 'error') => {
        setModal({ msg, type });
    };

    useEffect(() => {
        const fetchFoglalasok = async () => {
            const adminToken = localStorage.getItem('admin_token');
            try {
                const response = await axios.get('http://localhost:8000/api/konyvtar/foglalas-lista', {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
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
            f.user?.nev?.toLowerCase().includes(lowerSearch)
        );
    }, [searchTerm, foglalasok]);

    if (!context) {
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
                                <th>Kölcsönző</th>
                                <th>Könyv címe</th>
                                <th>Dátum</th>
                                <th>Műveletek</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFoglalasok.map((f) => (
                                <tr key={f.id}>
                                    <td>{f.id}</td>
                                    <td>{f.user ? f.user.nev : "Ismeretlen kölcsönző"}</td>
                                    <td>{f.konyv ? f.konyv.cim : "Ismeretlen könyv"}</td>
                                    <td>{new Date(f.fogl_datum).toLocaleDateString('hu-HU')}</td>
                                    <td>
                                        <button onClick={() => handleKolcsonzesFoglalaskor(f, setFoglalasok, fetchBooks, notify)}>
                                            Kölcsönzés
                                        </button>
                                    </td>
                                    <td><button onClick={() => handleTorlesFoglalaskor(f.id, setFoglalasok, fetchBooks, notify)}>
                                        Törlés
                                    </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredFoglalasok.length === 0 && <p>Nincsenek aktív foglalások.</p>}
                </div>
                <Modal
                    msg={modal.msg}
                    type={modal.type}
                    onClose={() => setModal({ ...modal, msg: null })}
                />
            </div>
        </FoglalasContext.Provider >
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
                    placeholder="Név..."
                    onChange={(e) => context.setSearchTerm(e.target.value)}
                />
            </label>
        </form>
    );
}

export default FoglalasLista;