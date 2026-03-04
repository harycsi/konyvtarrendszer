import { useState, useMemo, createContext, useContext, useEffect } from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { UserLogout } from './LogoutPages';

interface Book {
  id: number;
  cim: string;
  szerzo: string;
  kiadas_eve: string;
  oldalak: number;
  db_szam: number;
  kep: string;
}

interface LibraryContextType {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    sortBy: string;
    setSortBy: (val: string) => void;
    books: Book[];
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
    filteredBooks: Book[];
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const Library = () => {

const [searchTerm, setSearchTerm] = useState("");
const [sortBy, setSortBy] = useState("cim");
const [books, setBooks] = useState<Book[]>([]); 

useEffect(() => {
    fetch('http://localhost:8000/api/konyvtar/konyv-lista')
        .then(res => res.json())
        .then(data => setBooks(data))
        .catch(err => console.error("Hiba a letöltéskor:", err));
}, []);

const filteredBooks = useMemo<Book[]>(() => {
  const lowerSearchTerm = searchTerm.toLowerCase();

  return books
            .filter((book: Book) => 
            book.cim.toLowerCase().includes(lowerSearchTerm) || 
            book.szerzo.toLowerCase().includes(lowerSearchTerm))
            .sort((a: Book, b: Book) => {
              if (sortBy === 'cim') return a.cim.localeCompare(b.cim, 'hu');
              if (sortBy === 'szerzo') return a.szerzo.localeCompare(b.szerzo, 'hu');
              return 0;
            });
}, [searchTerm, books, sortBy]);

const contextValue: LibraryContextType = {
    books,
    searchTerm,
    sortBy,
    setBooks,
    setSearchTerm,
    setSortBy,
    filteredBooks
};

return <>
     <LibraryContext.Provider value={contextValue}>
      <div className="library-container">
        <header>
        <div className="logo">Könyvtár</div>
        <h3>Üdvözlünk könyvtárunkban!</h3>
        <nav>
            <ul>
            <li><NavLink to="/kolcsonzes">Kölcsönzéseim</NavLink></li>
            <li><NavLink to="/foglalas">Foglalásaim</NavLink></li>
            <li><NavLink to="/profil">Profilom</NavLink></li>
            <li><button type="button" onClick={UserLogout} className="nav-link-button">
                Kilépés</button></li>
            </ul>
        </nav>
        </header>
          <h3>Újdonságok</h3>
          <div className="konyvtar-ujdonsagok">
          <img src={`http://localhost:8000/storage/kepek/kobalt.jpg`}></img>
          <img src={`http://localhost:8000/storage/kepek/satantango.jpg`}></img>
          <img src={`http://localhost:8000/storage/kepek/egmindenkekje.jpg`}></img>
          </div>
          <hr />
          <SearchBar />
          <BookList />
      </div>
    </LibraryContext.Provider>
 </>
}

const useLibrary = () => {
  const context = useContext(LibraryContext);

  if (!context) throw Error("Nincs Provider átadva a komponensnek!");

  const { searchTerm, books, setBooks, sortBy, filteredBooks, setSearchTerm } = context;
  return { searchTerm, books, setBooks, sortBy, filteredBooks, setSearchTerm };
}

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useLibrary();

  return <form>
    <label>Keresés (cím vagy szerző): 
        <input 
          type="text" 
          placeholder="Pl. Gárdonyi..."
          value={searchTerm}  
          onChange={(e) => setSearchTerm(e.target.value)} 
        />      
        {searchTerm }
      </label>
  </form>
}

const BookList = () => {
  const { filteredBooks, setBooks } = useLibrary();

  const handleFoglalas = (bookId: number, bookTitle: string) => {
    fetch(`http://localhost:8000/api/foglalas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ konyv_id: bookId }) // Most már létezik a bookId változó
    })
    .then(res => {
        if (res.ok) {
            alert(`Sikeres foglalás: ${bookTitle}`); // Most már létezik a bookTitle változó
            return fetch('http://localhost:8000/api/konyvtar/konyv-lista');
        }
    })
    .then(res => res && res.json())
    .then(data => data && setBooks(data))
    .catch(err => console.error("Hiba a foglalásnál:", err));
  };

  return (
    <div className="book-grid">
      {filteredBooks.map((book: Book) => (
        <div key={book.id} className="book-card">
          <img 
            src={`http://localhost:8000/storage/${book.kep}`}
            alt={book.cim} 
            style={{ width: '120px', height: '180px', objectFit: 'cover' }} 
          />
          <h3>{book.cim}</h3>
          <p className="author">{book.szerzo}</p>
          <p className="info">Kiadás éve: {book.kiadas_eve}</p>
          {book.db_szam > 0 ? (
            <button className="foglalas-gomb" onClick={() => 
              handleFoglalas(book.id, book.cim)}>Foglalás</button>) 
              : (<button className="foglalas-gomb" disabled>Nincs készleten
            </button>
          )}
        </div>
      ))}
    </div>
  );
};