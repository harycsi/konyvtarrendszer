import { useState, useEffect } from 'react';
import '../../App.css';
import { NavLink } from 'react-router-dom';
import { UserLogout } from '../Auth/LogoutPage';

interface User{
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

useEffect(() => {
        const token = localStorage.getItem('token'); 

        fetch('http://localhost:8000/api/profil', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
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
            <li><button type="button" onClick={UserLogout} className="nav-link-button">
                Kilépés</button></li>
            </ul>
        </nav>
        </header>
          <h3>Adataim</h3>
          <div className="user-profile">
            <p><strong>Azonosító:</strong> {user.id}</p>
            <p><strong>Név:</strong> {user.nev}</p>
            <p><strong>Felhasználó név:</strong> {user.user_nev}</p>
            <p><strong>Email cím:</strong> {user.email_cim}</p>
            <p><strong>Lakcím:</strong> {user.lakcim}</p>
            <p><strong>Telefonszám:</strong> {user.telefonszam}</p>
          </div>
          <hr />
          <footer>Az éves tagság december 31-ig érvényes!</footer>
      </div>    
    );
}

export default ProfilePage;