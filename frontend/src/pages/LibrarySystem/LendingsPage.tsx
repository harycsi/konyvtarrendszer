import axios from 'axios';
import { useState, useMemo, createContext, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Logout } from '../Auth/LogoutPage';
import '../../App.css';
import { handleVisszavetel } from '../../ApiActions';
import { useLibrary } from './LibrarySystemPage';
import { Modal } from '../../Modals';

interface Kolcsonzes {
    id: number;
    user_id: number;
    konyv_id: number;
    kolcs_datum: string;
    hatarido: string;
    email: number;
    dolg_id: number;
    uzenet: string | null;
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
    const [modal, setModal] = useState<{ msg: string | null; type: 'success' | 'error' }>({
        msg: null,
        type: 'success'
    });

    const notify = (msg: string, type: 'success' | 'error') => {
        setModal({ msg, type });
    };

    const [onlyOverdue, setOnlyOverdue] = useState(false);

    useEffect(() => {
        const fetchKolcsonzesek = async () => {
            const adminToken = localStorage.getItem('admin_token');
            try {
                const response = await axios.get('http://localhost:8000/api/konyvtar/kolcsonzes-lista', {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
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
    }, []);

    const isOverdue = (dateStr: string) => {
        return new Date(dateStr) < new Date();
    };

    const filteredKolcsonzesek = useMemo(() => {
        const lowerSearch = searchTerm.toLowerCase();
        return kolcsonzesek.filter(k => {
            const keres = k.user?.nev?.toLowerCase().includes(lowerSearch);
            const lejart = onlyOverdue ? isOverdue(k.hatarido) : true;
            return keres && lejart;
        });
    }, [searchTerm, kolcsonzesek, onlyOverdue]);

    const overdueCount = useMemo(() => {
        return kolcsonzesek.filter(k => isOverdue(k.hatarido)).length;
    }, [kolcsonzesek]);

    const handleUpdateUzenet = async (id: number, ujUzenet: string | null) => {
        const adminToken = localStorage.getItem('admin_token');
        try {
            await axios.put(`http://localhost:8000/api/konyvtar/kolcsonzes/${id}`,
                { uzenet: ujUzenet },
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            setKolcsonzesek(prev =>
                prev.map(k => k.id === id ? { ...k, uzenet: ujUzenet } : k)
            );

            console.log("Sikeres mentés az adatbázisba.");
        } catch (error) {
            console.error("Mentési hiba:", error);
            notify("Nem sikerült elmenteni a megjegyzést!", 'error');
        }
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
                    {overdueCount > 0 && (
                        <div className="overdue-alert" >
                            <button
                                className={`foglalas-gomb ${onlyOverdue ? 'active' : ''}`}
                                onClick={() => setOnlyOverdue(!onlyOverdue)}>
                                {onlyOverdue ? "Összes megjelenítése" : "Csak a lejártak listázása"}
                            </button>
                        </div>
                    )}
                    <hr />
                    <h3>Aktuális kölcsönzések</h3>
                    <table className="kolcsonzes-tablazat">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Kölcsönző</th>
                                <th>Könyv címe</th>
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
                                    <td>{k.user ? k.user.nev : "Ismeretlen kölcsönző"}</td>
                                    <td>{k.konyv ? k.konyv.cim : "Ismeretlen könyv"}</td>
                                    <td>{new Date(k.kolcs_datum).toLocaleDateString('hu-HU')}</td>
                                    <td className={isOverdue(k.hatarido) ? "overdue-date" : ""}>
                                        {new Date(k.hatarido).toLocaleDateString('hu-HU')}
                                    </td>
                                    <td>{k.email === 1 ? "Igen" : "Nem"}</td>
                                    <td>{k.dolg_id}</td>
                                    <td
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => {
                                            const ujErtek = e.currentTarget.textContent;
                                            handleUpdateUzenet(k.id, ujErtek);
                                        }}
                                    >
                                        {k.uzenet}
                                    </td>
                                    <td>
                                        <button onClick={() => { handleVisszavetel(k.id, setKolcsonzesek, fetchBooks, notify); }}>
                                            Visszavétel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Modal
                    msg={modal.msg}
                    type={modal.type}
                    onClose={() => setModal({ ...modal, msg: null })}
                />
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
                    placeholder="Név..."
                    onChange={(e) => context.setSearchTerm(e.target.value)}
                />
            </label>
        </form>
    );
}

export default KolcsonzesLista;