import { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Logout } from '../Auth/LogoutPage';

interface Kolcsonzes {
    user_id: number;
    konyv_id: number;
    konyv?: Konyv;
    kolcs_datum: string;
    hatarido: string;
    email: number;
}

interface Konyv {
    id: number;
    cim: string;
}

export const LentPage = () => {
    const [kolcsonzesek, setKolcsonzesek] = useState<Kolcsonzes[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchKolcsonzesek = async () => {
            const token = localStorage.getItem('user_token');

            try {
                const response = await axios.get('http://localhost:8000/api/kolcsonzes', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });
                setKolcsonzesek(response.data);
            } catch (err: any) {
                console.error("Hiba a kölcsönzések betöltésekor:", err);
                if (err.response?.status === 401) {
                    alert("Lejárt a munkamenet, jelentkezz be újra!");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchKolcsonzesek();
    }, []);

    if (loading) return <div>Betöltés...</div>;

    return (
        <div className="library-container">
            <header>
                <div className="logo">Könyvtár</div>
                <h4>Üdvözlünk könyvtárunkban!</h4>
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
            <h3>Kölcsönzéseim</h3>
            {kolcsonzesek.length > 0 ? (
                kolcsonzesek.map((k, index) => (
                    <div className="kolcsonzes" key={index}>
                        <p><strong>Könyv azonosító:</strong> {k.konyv_id}</p>
                        <p><strong>Könyv címe:</strong> {k.konyv ? k.konyv.cim : "Ismeretlen könyv"}</p>
                        <p><strong>Kölcsönzés dátuma:</strong> {k.kolcs_datum}</p>
                        <p><strong>Határidő:</strong> {k.hatarido}</p>
                        <p><strong>Küldtünk emailt:</strong> {k.email ? "Igen" : "Nem"}</p>
                        <hr />
                    </div>
                ))
            ) : (
                <p>Nincs aktív kölcsönzésed!</p>
            )}
            <footer>Az éves tagság december 31-ig érvényes!</footer>
        </div>
    );
}

export default LentPage;