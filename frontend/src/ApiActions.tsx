import axios from 'axios';

export const handleKolcsonzes = async (
    bookId: number, 
    userId: number, 
    setBooks: React.Dispatch<React.SetStateAction<any[]>>
) => {
    try {
        const token = localStorage.getItem('token');
        // Kölcsönzés elküldése
        await axios.post(`http://localhost:8000/api/konyvtar/kolcsonzes`,
            { 
                konyv_id: bookId, 
                user_id: Number (userId) 
            },
            { headers: { Authorization: `Bearer ${token}`}}
        );

        alert("Sikeres kölcsönzés! Határidő: 14 nap.");

        // Lista frissítése a szerverről
        const response = await axios.get('http://localhost:8000/api/konyvtar/konyv-lista', {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        }
        });
        setBooks(response.data);

    } catch (err: any) {
        console.error("Hiba a kölcsönzés során:", err);
        const message = err.response?.data?.message || "Hiba történt a kölcsönzés során!";
        alert(message);
    }
};

export const handleKolcsonzesFoglalaskor = async (
    foglalas: any,
    setFoglalasok: React.Dispatch<React.SetStateAction<any[]>>,
    fetchBooks: () => void
) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest' 
            }
        };

        // 1. Kölcsönzés rögzítése (a 14 napos határidőt a Laravel állítja be)
        await axios.post(`http://localhost:8000/api/konyvtar/kolcsonzes`,
            {
                konyv_id: foglalas.konyv_id,
                user_id: foglalas.user_id
            },
            config
        );

        // 2. A foglalás törlése (már nincs rá szükség, mert nála a könyv)
        // Fontos: a Laravel route-odnak /api/konyvtar/foglalas/{id} formátumban kell lennie
        await axios.delete(`http://localhost:8000/api/konyvtar/foglalas/${foglalas.id}`, config);

        // 3. UI frissítése: kivesszük a listából a feldolgozott foglalást
        setFoglalasok(prev => prev.filter(f => f.id !== foglalas.id));

        // 4. Könyvlista frissítése a trigger miatti darabszám változás miatt
        fetchBooks();

        alert("Sikeres kölcsönzés, a foglalás törölve!");

    } catch (error: any) {
        console.error("Hiba a folyamat során:", error);
        const message = error.response?.data?.hiba || error.response?.data?.message || "Hiba történt!";
        alert(message);
    }
};

export const handleVisszavetel = async (
    kolcsonzesId: number,
    setKolcsonzesek: React.Dispatch<React.SetStateAction<any[]>>,
    fetchBooks: () => void
) => {
    try {
        const token = localStorage.getItem('token');

        // DELETE kérés a konkrét kölcsönzés ID-ra
        await axios.delete(`http://localhost:8000/api/konyvtar/kolcsonzes/${kolcsonzesId}`, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest' 
            }
        });

        // Csak a törölt elemet vesszük ki a listából (nem kell az egészet újratölteni)
        setKolcsonzesek(prev => prev.filter(k => k.id !== kolcsonzesId));
        fetchBooks();

        alert("A könyv visszavétele sikeres, a készlet frissült!");

    } catch (err: any) {
        console.error("Hiba a visszavétel során:", err);
        alert(err.response?.data?.hiba || "Hiba történt a visszavétel során!");
    }
};
