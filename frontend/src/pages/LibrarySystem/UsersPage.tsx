import axios from 'axios';
import { useState, useMemo, createContext, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Logout } from '../Auth/LogoutPage';
import '../../App.css';

interface Users {
    id: number;
    nev: string;
    user_nev: string;
    email_cim: string;
    lakcim: string;
    telefonszam: number;
}

interface UsersContextType {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    users: Users[];
    setUsers: React.Dispatch<React.SetStateAction<Users[]>>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersLista = () => {
    const [users, setUsers] = useState<Users[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user', {
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Hiba a lekérésnél:", error);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        const lowerSearch = searchTerm.toLowerCase();
        return users.filter(u => 
            u.id.toString().includes(lowerSearch) || 
            u.user_nev.toLowerCase().includes(lowerSearch) ||
            u.nev.toLowerCase().includes(lowerSearch) // Most már név alapján is szűr!
        );
    }, [searchTerm, users]);

    return (
        <UsersContext.Provider value={{ searchTerm, setSearchTerm, users, setUsers }}>
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

                <div className="users-container">
                    <UsersSearchBar />
                    <h3>Kölcsönzők</h3>
                    <table className="users-tablazat">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Teljes név</th>
                                <th>Felhasználó név</th>
                                <th>E-mail cím</th>
                                <th>Lakcím</th>
                                <th>Telefonszám</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.nev}</td>
                                    <td>{u.user_nev}</td>
                                    <td>{u.email_cim}</td>
                                    <td>{u.lakcim}</td>
                                    <td>{u.telefonszam}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </UsersContext.Provider>
    );
};

const UsersSearchBar = () => {
    const context = useContext(UsersContext);
    if (!context) return null;
    
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <label>Keresés (név szerint):
                <input 
                    type="text" 
                    value={context.searchTerm}  
                    onChange={(e) => context.setSearchTerm(e.target.value)} 
                />      
            </label>
        </form>
    );
}

export default UsersLista;