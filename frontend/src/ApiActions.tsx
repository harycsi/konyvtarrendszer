import axios from 'axios';

export const handleKolcsonzes = async (bookId: number, setBooks: (data: any) => void) => {
    try {
        const token = localStorage.getItem('token');
        
        // Kölcsönzés elküldése
        await axios.post(`http://localhost:8000/api/konyvtar/kolcsonzes`, 
            { konyv_id: bookId }, 
            { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Sikeres kölcsönzés!");

        // Lista frissítése a szerverről
        const response = await axios.get('http://localhost:8000/api/konyvtar/konyv-lista', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setBooks(response.data);

    } catch (err) {
        console.error("Hiba a kölcsönzés során:", err);
        alert("Sikeres kölcsönzés! (Vagy hiba a frissítésnél)"); 
        // Megjegyzés: Ha a backend 204-et küld, az Axios hibának hiheti, ellenőrizd a státuszt!
    }
};


// Minden adatot paraméterben kap meg
export const handleKolcsonzesFoglalaskor = async (id: number, setFoglalasok: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
        const token = localStorage.getItem('token');
        await axios.post(`http://localhost:8000/api/konyvtar/kolcsonzes/${id}`, {}, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json'
             }
        });

        // Frissítjük a UI-t: kivesszük a listából azt, amit kikölcsönöztünk
        setFoglalasok(prev => prev.filter(f => f.id !== id));
        alert("Sikeres kölcsönzés!");
    } catch (error) {
        console.error("Hiba a kölcsönzés során:", error);
        alert("Hiba történt!");
    }
};