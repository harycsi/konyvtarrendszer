import { useState, useEffect } from 'react';
import '../../App.css';
import { NavLink } from 'react-router-dom';
import { Logout } from '../Auth/LogoutPage';

interface Foglalas {
    id:number;
    user_id: number;
    konyv_id: number;
    konyv?: Konyv; 
    fogl_datum: string;
}

interface Konyv {
    id: number;
    cim: string;
}

export const ReservedPage = () => {
    const [foglalasok, setFoglalasok] = useState<Foglalas[]>([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
        const token = localStorage.getItem('token');

        fetch(`http://localhost:8000/api/foglalas`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        
        .then(res => {
            if (!res.ok) throw new Error("Sikertelen betöltés");
            return res.json();
        })
        .then(data => {
            setFoglalasok(data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Hiba:", err);
            setLoading(false);
        });
    
    }, []);

    if (loading) return <div>Betöltés...</div>;

const handleDelete = (id: number) => {
    console.log("Törlendő ID:", id);
    if (!window.confirm("Biztosan törlöd a foglalást?")) return;

    const token = localStorage.getItem('token');
    fetch(`http://localhost:8000/api/foglalas/${id}`, {
        method: 'DELETE',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest' 
        }
    })
    .then(async res => {
        if (res.ok) {
            // Frissítjük a listát a képernyőn (kivesszük a töröltet)
            setFoglalasok(prev => prev.filter(f => f.id !== id));
            alert("Sikeres törlés!");
        }else{
            const errorText = await res.text();
            console.error("Szerver hiba:", res.status, errorText);
            alert(`Hiba történt (${res.status}): Ellenőrizd a konzolt!`);
        }
    })
    //.catch(err => console.error(err));
};

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
          <h3>Foglalásaim</h3>
          {foglalasok.length > 0 ? (
            foglalasok.map((f, index) => (
                <div className="foglalas" key={index}>
                    <p><strong>Könyv azonosító:</strong> {f.konyv_id}</p>
                    <p><strong>Könyv címe:</strong> {f.konyv ? f.konyv.cim : "Ismeretlen könyv"}</p>
                    <p><strong>Foglalás dátuma:</strong> {f.fogl_datum}</p>
                    <button className="foglalas-gomb" onClick={() => handleDelete(f.id)}>Lemondás</button>
            <hr />
          </div>
          ))
          ) : (
                <p>Nincs aktív foglalásod!</p>                  
            )}
          <footer>Az éves tagság december 31-ig érvényes!</footer>
      </div>    
    );
}

export default ReservedPage;