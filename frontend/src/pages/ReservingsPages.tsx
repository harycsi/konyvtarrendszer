import axios from 'axios';
import { useState, useMemo, createContext, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Logout } from './LogoutPages';
import '../App.css';
import { handleKolcsonzesFoglalaskor } from '../ApiActions';

interface Foglalas {
    id: number;
    user_id: number;
    konyv_id: number;
    fogl_datum: string;
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

    useEffect(() => {
        const fetchFoglalasok = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/konyvtar/foglalas-lista', {
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        "Accept": "application/json" 
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
                                <button type="button"  onClick={() => Logout()}className="nav-link-button">
                                    Kilépés
                                </button>
                            </li>
                        </ul>
                    </nav>
                </header>

                <div className="foglalas-lista-container">
                    <FoglalasSearchBar />
                    <h3>Aktuális Foglalások</h3>
                    <table className="foglalas-tablazat">
                        <thead>
                            <tr>
                                <th>Foglalás ID</th>
                                <th>Felhasználó ID</th>
                                <th>Könyv ID</th>
                                <th>Dátum</th>
                                <th>Kölcsönzés</th>
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
                                     <button onClick={() => {handleKolcsonzesFoglalaskor(f.id, setFoglalasok);}}>
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

export default FoglalasLista;