import { useState, useEffect } from 'react';
import '../../App.css';
import { NavLink } from 'react-router-dom';
import { Logout } from '../Auth/LogoutPage';
import axios from 'axios';

interface User {
    id: number;
    nev: string;
    user_nev: string;
    email_cim: string;
    lakcim: string;
    telefonszam: number;
}

export const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        uj_nev: '',
        uj_email: '',
        uj_cim: '',
        uj_tel: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:8000/api/profil', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Sikertelen betöltés");
                return res.json();
            })
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Hiba:", err);
                setLoading(false);
            });

    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleModositasKeres = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const hasData = Object.values(formData).some(val => val.trim() !== '');
        if (!hasData) {
            setMessage("Kérjük, töltsön ki legalább egy módosítandó mezőt!");
            return;
        }

        const token = localStorage.getItem('token');
        try {
            const res = await axios.post('http://localhost:8000/api/profil/modositas', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage(res.data.uzenet || "Kérelem sikeresen elküldve az adminnak!");
            setFormData({ uj_nev: '', uj_email: '', uj_cim: '', uj_tel: '' });
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Hiba történt a beküldéskor.");
        }
    };

    if (loading) return <div>Betöltés...</div>;
    if (!user) return <div>Hiba az adatok betöltésekor. Jelentkezz be újra!</div>;

    return (
        <div className="library-container">
            <header>
                <div className="logo">Könyvtár</div>
                <h4>Üdvözlünk könyvtárunkban, {user.nev}!</h4>
                <nav>
                    <ul>
                        <li><NavLink to="/konyvtar">Könyvek</NavLink></li>
                        <li><NavLink to="/kolcsonzes">Kölcsönzéseim</NavLink></li>
                        <li><NavLink to="/foglalas">Foglalásaim</NavLink></li>
                        <li><NavLink to="/profil">Profilom</NavLink></li>
                        <li><button type="button" onClick={() => Logout('/belepes')} className="nav-link-button">
                            Kilépés</button></li>
                    </ul>
                </nav>
            </header>
            <div className="profile-grid">
                <h3>Adataim</h3>
                <div className="user-profile">
                    <p><strong>Azonosító:</strong> <span>{user.id}</span></p>
                    <p><strong>Név:</strong> <span></span>{user.nev}</p>
                    <p><strong>Felhasználó név:</strong> <span>{user.user_nev}</span></p>
                    <p><strong>Email cím:</strong> <span>{user.email_cim}</span></p>
                    <p><strong>Lakcím:</strong> <span>
                        {user.lakcim.replace(/\.(?!\s|$)/g, ". ")}
                    </span></p>
                    <p><strong>Telefonszám:</strong> <span>{user.telefonszam}</span></p>
                </div>
            </div>
            <hr />

            <div className="edit-section">
                <h3>Adatok módosításának kérése</h3>
                {message && <div className="alert-box">{message}</div>}
                <form onSubmit={handleModositasKeres} className="modositas-form">
                    <input type="text" name="uj_nev" placeholder="Új név" value={formData.uj_nev} onChange={handleInputChange} />
                    <input type="email" name="uj_email" placeholder="Új email" value={formData.uj_email} onChange={handleInputChange} />
                    <input type="text" name="uj_cim" placeholder="Új lakcím" value={formData.uj_cim} onChange={handleInputChange} />
                    <input type="tel" name="uj_tel" placeholder="Új telefonszám" value={formData.uj_tel} onChange={handleInputChange} />
                    <button type="submit" className="foglalas-gomb">Kérés beküldése</button>
                </form>
            </div>
            <footer>Az éves tagság december 31-ig érvényes!</footer>
        </div>
    );
}

export default ProfilePage;