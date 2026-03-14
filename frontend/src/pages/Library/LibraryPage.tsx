import { useState, createContext, useContext, useEffect } from 'react';
import '../../App.css';
import { NavLink } from 'react-router-dom';
import { Logout } from '../Auth/LogoutPage';

interface Book {
  id: number;
  cim: string;
  szerzo: string;
  kiadas_eve: string;
  oldalak: number;
  db_szam: number;
  kep: string;
  leiras: string;
}

interface LibraryContextType {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  selectedBook: Book | null;
  setSelectedBook: React.Dispatch<React.SetStateAction<Book | null>>;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const Library = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("cim");
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // A login-nál elmentett token
    const delayDebounceFn = setTimeout(() => {
      // URL meghatározása: ha van keresőkifejezés, a kereső végpontot hívjuk
      const url = searchTerm.length > 2
        ? `http://localhost:8000/api/konyvtar/keres?query=${searchTerm}&sort=${sortBy}`
        : `http://localhost:8000/api/konyvtar/konyv-lista?sort=${sortBy}`;

      fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`, // Ez kulcsfontosságú!
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
        .then(res => {
          if (res.status === 401) throw new Error("Lejárt a munkamenet!");
          return res.json();
        })
        .then(data => setBooks(data))
        .catch(err => console.error("Hiba:", err));
    }, 300); // 300ms várakozás, hogy ne terheljük a szervert minden betűnél

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, sortBy]); // Újratölt, ha változik a keresőszó

  const contextValue: LibraryContextType = {
    books,
    searchTerm,
    sortBy,
    setBooks,
    setSearchTerm,
    setSortBy,
    selectedBook,
    setSelectedBook
  };

  return <>
    <LibraryContext.Provider value={contextValue}>
      <div className="library-container">
        <header>
          <div className="logo">Könyvtár</div>
          <h4>Üdvözlünk könyvtárunkban!</h4>
          <nav>
            <ul>
              <li><NavLink to="/kolcsonzes">Kölcsönzéseim</NavLink></li>
              <li><NavLink to="/foglalas">Foglalásaim</NavLink></li>
              <li><NavLink to="/profil">Profilom</NavLink></li>
              <li><button type="button" onClick={() => Logout('/belepes')} className="nav-link-button">
                Kilépés</button></li>
            </ul>
          </nav>
        </header>
        <h3>Újdonságok</h3>
        <div className="konyvtar-ujdonsagok">
          <a href="https://alomgyar.hu/konyv/kobalt-a-pekingi-jatszma">
            <img src={`http://localhost:8000/storage/kepek/kobalt.jpg`} alt='Kobalt' /></a>
          <a href="https://magveto.hu/konyvek/satantango/139528461">
            <img src={`http://localhost:8000/storage/kepek/satantango.jpg`} alt='Sátántangó' /></a>
          <a href="https://europakiado.hu/konyv/regeny/szepirodalmi/melissa-da-costa/az-eg-minden-kekje">
            <img src={`http://localhost:8000/storage/kepek/egmindenkekje.jpg`} alt='Az ég minden kékje' /></a>
          <a href="https://21.szazadkiado.hu/szerintem-naray-tamas">
            <img src={`http://localhost:8000/storage/kepek/szerintem.jpg`} alt='Szerintem' /></a>
          <a href="https://gabo.hu/ujdonsag/3835-ken-follett-stonehenge-az-ido-katedralisa-9789635668748.html">
            <img src={`http://localhost:8000/storage/kepek/stonehenge.jpg`} alt='Stonehenge' /></a>
        </div>
        <hr />
        <SearchBar />
        <BookList />
        <footer>Az éves tagság december 31-ig érvényes!</footer>
      </div>
    </LibraryContext.Provider>
  </>
}

const useLibrary = () => {
  const context = useContext(LibraryContext);

  if (!context) throw Error("Nincs Provider átadva a komponensnek!");

  const { searchTerm, books, sortBy, setBooks, setSearchTerm, setSortBy, selectedBook, setSelectedBook } = context;
  return { searchTerm, books, sortBy, setBooks, setSearchTerm, setSortBy, selectedBook, setSelectedBook };
}

const SearchBar = () => {
  const { searchTerm, setSearchTerm, sortBy, setSortBy } = useLibrary();

  return <form onSubmit={(e) => e.preventDefault()}>
    <label>Keresés:
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </label>
    <div className="sort-button-group">
      <button
        onClick={() => setSortBy('cim')}
        className={sortBy === 'cim' ? 'active' : ''}
      >
        Cím szerint
      </button>
      <button
        onClick={() => setSortBy('szerzo')}
        className={sortBy === 'szerzo' ? 'active' : ''}
      >
        Szerző szerint
      </button>
    </div>
  </form>
}

const BookList = () => {
  const { books, setBooks, selectedBook, setSelectedBook } = useLibrary();

  const handleFoglalas = (bookId: number, bookTitle: string) => {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8000/api/foglal`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest' 
      },
      body: JSON.stringify({ konyv_id: bookId })
    })
      .then(async res => {
        if (res.ok) {
          alert(`Sikeres foglalás: ${bookTitle}`);

          // Frissítésnél is kell a token a fejlécbe!
          const response = await fetch('http://localhost:8000/api/konyvtar/konyv-lista', {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
          });

          if (response.ok) {
            const data = await response.json();
            setBooks(data);
          }
        } else {
          const errorData = await res.json();
          alert(`Hiba: ${errorData.hiba || errorData.message || 'Sikertelen foglalás'}`);
        }
      })
      .catch(err => {
        console.error("Hiba a foglalásnál:", err);
        alert("Hálózati hiba történt!");
      });
  };

  return (
    <>
      <div className="book-grid">
        {books.map((book: Book) => (
          <div key={book.id} className="book-card" onClick={() =>
            setSelectedBook(book)} style={{ cursor: 'pointer' }}>
            <img
              src={`http://localhost:8000/storage/${book.kep}`}
              alt={book.cim}
              style={{ width: '120px', height: '180px', objectFit: 'cover' }}
            />
            <h3>{book.cim}</h3>
            <p className="author">{book.szerzo}</p>
            <p className="info">Kiadás éve: {book.kiadas_eve}</p>
            {book.db_szam > 0 ? (
              <button className="foglalas-gomb" onClick={(e) => {
                e.stopPropagation(); handleFoglalas(book.id, book.cim);
              }}>Foglalás</button>)
              : (<button className="foglalas-gomb" disabled>Nincs készleten
              </button>
              )}
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedBook(null)}>X</button>
            <div className="modal-body">
              <img src={`http://localhost:8000/storage/${selectedBook.kep}`} alt={selectedBook.cim} />
              <h2>{selectedBook.cim}</h2>
              <p><strong>Szerző:</strong> {selectedBook.szerzo}</p>
              <p className="description">{selectedBook.leiras}</p>
              <p>Oldalak száma: {selectedBook.oldalak}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
