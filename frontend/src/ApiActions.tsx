import axios from 'axios';

export const handleKolcsonzes = (bookId: number, setBooks: (data: any) => void) => {

    fetch(`https://localhost:8000/api/konyvtar/kolcsonzes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ konyv_id: bookId }) 
    })
    .then(res => {
        if (res.ok) {
            alert("Sikeres kölcsönzés!");
            return fetch('https://localhost:8000/api/konyvtar/konyv-lista');
        }
    })
    .then(res => res && res.json())
    .then(data => data && setBooks(data))
    .catch(err => console.error("Hiba:", err));
};

// Minden adatot paraméterben kap meg
export const handleKolcsonzesFoglalaskor = async (
    id: number, 
    setFoglalasok: React.Dispatch<React.SetStateAction<any[]>>
) => {
    try {
        const token = localStorage.getItem('token');
        await axios.post(`http://localhost:8000/api/konyvtar/kolcsonzes/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });

        // Frissítjük a UI-t: kivesszük a listából azt, amit kikölcsönöztünk
        setFoglalasok(prev => prev.filter(f => f.id !== id));
        alert("Sikeres kölcsönzés!");
    } catch (error) {
        console.error("Hiba a kölcsönzés során:", error);
        alert("Hiba történt!");
    }
};