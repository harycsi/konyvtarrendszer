import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import { NavLink } from 'react-router-dom';
import { Logout } from '../Auth/LogoutPage';
import { useLibrary } from '../LibrarySystem/LibrarySystemPage';
import { ConfirmModal } from '../../Modals';

interface Foglalas {
    id: number;
    user_id: number;
    konyv_id: number;
    konyv?: Book;
    fogl_datum: string;
}

interface Book {
    id: number;
    cim: string;
}

export const ReservedPage = () => {
    const [foglalasok, setFoglalasok] = useState<Foglalas[]>([]);
    const [loading, setLoading] = useState(true);
    const { notify } = useLibrary();
    const [deleteId, setDeleteId] = useState<number | null>(null);

    useEffect(() => {
        const fetchFoglalasok = async () => {
            const token = localStorage.getItem('user_token');
            try {
                const response = await axios.get('http://localhost:8000/api/foglalas', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFoglalasok(response.data);
            } catch (err) {
                console.error("Hiba a betöltéskor:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFoglalasok();
    }, []);

    const handleDelete = async (id: number, notify: (msg: string, type: 'success' | 'error') => void) => {
        const token = localStorage.getItem('user_token');

        try {
            await axios.delete(`http://localhost:8000/api/foglalas/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setFoglalasok(prev => prev.filter(f => f.id !== id));
            notify("Sikeres törlés!", 'success');
        } catch (err: any) {
            console.error("Hiba a törléskor:", err);
            notify(err.response?.data?.message || "Hiba történt a törlés során!", 'error');
        }
    };

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
            <h3>Foglalásaim</h3>
            {foglalasok.length > 0 ? (
                foglalasok.map((f) => (
                    <div className="foglalas" key={f.id}>
                        <p><strong>Könyv azonosító:</strong> {f.konyv_id}</p>
                        <p><strong>Könyv címe:</strong> {f.konyv ? f.konyv.cim : "Ismeretlen könyv"}</p>
                        <p><strong>Foglalás dátuma:</strong> {f.fogl_datum}</p>
                        <button className="foglalas-gomb" onClick={() => setDeleteId(f.id)}>Lemondás</button>
                        <hr />
                    </div>
                ))
            ) : (
                <p>Nincs aktív foglalásod!</p>
            )}
            <ConfirmModal
                isOpen={deleteId !== null}
                title="Törlés megerősítése"
                message="Biztosan törölni szeretnéd ezt a tételt? Ez a művelet nem vonható vissza."
                onCancel={() => setDeleteId(null)}
                onConfirm={() => {
                    if (deleteId) {
                        handleDelete(deleteId, notify);
                        setDeleteId(null);
                    }
                }}
            />
            <footer>Az éves tagság december 31-ig érvényes!</footer>
        </div>
    );
}

export default ReservedPage;