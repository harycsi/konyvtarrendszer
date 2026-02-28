import axios from 'axios';
import { useState, createContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Logout } from './Logout';
import '../App.css';
import { handleKolcsonzesFoglalaskor } from '../ApiActions';

interface Foglalas {
    id: number;
    user_id: number;
    konyv_id: number;
    fogl_datum: string;
}

interface LibraryContextType {
    foglalasok: Foglalas[];
    setFoglalasok: React.Dispatch<React.SetStateAction<Foglalas[]>>;
}

export const ReserveContext = createContext<LibraryContextType | undefined>(undefined);

export const FoglalasLista = () => {
    const [foglalasok, setFoglalasok] = useState<Foglalas[]>([]);
    const [searchId, setSearchId] = useState<string>("");

    useEffect(() => {
        const fetchFoglalasok = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/konyvtar/foglalas-lista', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFoglalasok(response.data);
            } catch (error) {
                console.error("Hiba a lekérésnél:", error);
            }
        };
        fetchFoglalasok();
    }, []);

    const szurtFoglalasok = foglalasok.filter(f => 
        f.id.toString().includes(searchId) || 
        f.user_id.toString().includes(searchId)
    );

    return (
        <ReserveContext.Provider value={{ foglalasok, setFoglalasok }}>
            <div className="library-container">
                <header>
                    <div className="logo">Könyvtárrendszer</div>
                    <nav>
                        <ul>
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
                    <div className="input-group">
                    <label>Keresés (ID):</label>
                    <input
                        type="text"
                        placeholder='Írj be egy ID-t...'
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                    </div>
                    <hr />
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
                            {szurtFoglalasok.map((f) => (
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
                    {szurtFoglalasok.length === 0 && <p>Nincsenek aktív foglalások.</p>}
                </div>
            </div>
        </ReserveContext.Provider>
    );
};