import axios from 'axios';

export const handleKolcsonzes = async (
    bookId: number,
    userId: number,
    setBooks: React.Dispatch<React.SetStateAction<any[]>>,
    notify: (msg: string, type: 'success' | 'error') => void
) => {
    try {
        const adminToken = localStorage.getItem('admin_token');
        await axios.post(`http://localhost:8000/api/konyvtar/kolcsonzes`,
            {
                konyv_id: bookId,
                user_id: Number(userId)
            },
            { headers: { Authorization: `Bearer ${adminToken}` } }
        );

        notify("Sikeres kölcsönzés! Határidő: 14 nap.", 'success');

        const response = await axios.get('http://localhost:8000/api/konyvtar/konyv-lista', {
            headers: {
                Authorization: `Bearer ${adminToken}`,
            }
        });
        setBooks(response.data);

    } catch (err: any) {
        notify(err.response?.data?.message || "Hiba történt a kölcsönzés során!", 'error');
    }
};

export const handleKolcsonzesFoglalaskor = async (
    foglalas: any,
    setFoglalasok: React.Dispatch<React.SetStateAction<any[]>>,
    fetchBooks: () => void,
    notify: (msg: string, type: 'success' | 'error') => void
) => {
    try {
        const adminToken = localStorage.getItem('admin_token');
        const config = {
            headers: {
                Authorization: `Bearer ${adminToken}`,
            }
        };

        await axios.post(`http://localhost:8000/api/konyvtar/kolcsonzes`,
            {
                konyv_id: foglalas.konyv_id,
                user_id: foglalas.user_id
            },
            config
        );

        await axios.delete(`http://localhost:8000/api/konyvtar/foglalas/${foglalas.id}`, config);

        setFoglalasok(prev => prev.filter(f => f.id !== foglalas.id));

        fetchBooks();

        notify("Sikeres kölcsönzés, a foglalás törölve!", 'success');

    } catch (err: any) {
        notify(err.response?.data?.message || "Hiba történt a kölcsönzés során!", 'error');
    }
};

export const handleVisszavetel = async (
    kolcsonzesId: number,
    setKolcsonzesek: React.Dispatch<React.SetStateAction<any[]>>,
    fetchBooks: () => void,
    notify: (msg: string, type: 'success' | 'error') => void
) => {
    try {
        const adminToken = localStorage.getItem('admin_token');

        await axios.delete(`http://localhost:8000/api/konyvtar/kolcsonzes/${kolcsonzesId}`, {
            headers: {
                Authorization: `Bearer ${adminToken}`,
            }
        });

        setKolcsonzesek(prev => prev.filter(k => k.id !== kolcsonzesId));
        fetchBooks();

        notify("A könyv visszavétele sikeres, a készlet frissült!", 'success');

    } catch (err: any) {
        console.error("Hiba a visszavétel során:", err);
        notify(err.response?.data?.hiba || "Hiba történt a visszavétel során!", 'error');
    }
};

export const handleTorlesFoglalaskor = async (
    foglalasId: number,
    setFoglalasok: React.Dispatch<React.SetStateAction<any[]>>,
    fetchBooks: () => void,
    notify: (msg: string, type: 'success' | 'error') => void
) => {
    const token = localStorage.getItem('admin_token');

    try {
        await axios.delete(`http://localhost:8000/api/konyvtar/foglalas/${foglalasId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setFoglalasok(prev => prev.filter(f => f.id !== foglalasId));
        fetchBooks();

        notify("Sikeres törlés!", 'success');

    } catch (err: any) {
        console.error("Hiba a törléskor:", err);
        notify(err.response?.data?.message || "Hiba történt a törlés során!", 'error');
    }
};