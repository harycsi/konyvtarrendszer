import axios from 'axios';
import { useState, useMemo, createContext, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Logout } from './LogoutPages';
import '../App.css';
import { handleKolcsonzes } from '../ApiActions';

interface Kolcsonzes {
    id: number;
    user_id: number;
    konyv_id: number;
    kolcs_datum: string;
    vissza_datum: string;
    email: boolean;
    dolg_id: number;
    uzenet: string;
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

    useEffect(() => {
        const fetchKolcsonzesek = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/konyvtar/kolcsonzes-lista', {
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        "Accept": "application/json" 
                    }
                });
                setKolcsonzesek(response.data);
            } catch (error) {
                console.error("Hiba a lekérésnél:", error);
            }
        };
        fetchKolcsonzesek();
    }, []);

    const filteredKolcsonzesek = useMemo(() => {
        const lowerSearch = searchTerm.toLowerCase();
        return kolcsonzesek.filter(k => 
            k.id.toString().includes(lowerSearch) || 
            k.user_id.toString().includes(lowerSearch) ||
            k.kolcs_datum.includes(lowerSearch)
        );
    }, [searchTerm, kolcsonzesek]);

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
                                <button type="button"  onClick={() => Logout()}className="nav-link-button">
                                    Kilépés
                                </button>
                            </li>
                        </ul>
                    </nav>
                </header>

                <div className="kolcsonzes-lista-container">
                    <KolcsonzesSearchBar />
                    <h3>Aktuális kölcsönzések</h3>
                    <table className="kolcsonzes-tablazat">
                        <thead>
                            <tr>
                                <th>Kölcsönzés ID</th>
                                <th>Felhasználó ID</th>
                                <th>Könyv ID</th>
                                <th>Kikölcsönözte</th>
                                <th>Visszahozta</th>
                                <th>Kapott e-mailt?</th>
                                <th>Könyvtáros ID</th>
                                <th>Megjegyzés</th>
                                <th>Vissza</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredKolcsonzesek.map((k) => (
                                <tr key={k.id}>
                                    <td>{k.id}</td>
                                    <td>{k.user_id}</td>
                                    <td>{k.konyv_id}</td>
                                    <td>{new Date(k.kolcs_datum).toLocaleDateString('hu-HU')}</td>
                                    <td>{k.vissza_datum ? new Date(k.vissza_datum).toLocaleDateString('hu-HU') 
                                        : "Nincs visszahozva"}</td>
                                    <td>{k.email ? "Igen" : "Nem"}</td>
                                    <td>{k.dolg_id}</td>
                                    <td>{k.uzenet || "-"}</td>
                                    <td>
                                     <button onClick={() => {handleKolcsonzes(k.id, setKolcsonzesek);}}>
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
            <label>Keresés (ID vagy dátum):
                <input 
                    type="text" 
                    value={context.searchTerm}  
                    onChange={(e) => context.setSearchTerm(e.target.value)} 
                />      
            </label>
        </form>
    );
}

export default KolcsonzesLista;