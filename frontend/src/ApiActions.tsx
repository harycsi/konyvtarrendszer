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

    } catch (err: any) {
        console.error("Hiba a kölcsönzés során:", err);
        const message = err.response?.data?.message || "Hiba történt a kölcsönzés során!";
        alert(message);
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
    } catch (error: any) {
        console.error("Hiba a kölcsönzés során:", error);
        const message = error.response?.data?.message || "Hiba történt a kölcsönzés során!";
        alert(message);
    }
};