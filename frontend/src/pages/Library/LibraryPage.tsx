import { useState, createContext, useContext, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Logout } from '../Auth/LogoutPage';
import { Modal } from '../../Modals';

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
  foglalasokSzama: number;
  setFoglalasokSzama: React.Dispatch<React.SetStateAction<number>>;
  modal: { msg: string | null; type: 'success' | 'error' };
  notify: (msg: string, type: 'success' | 'error') => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("szerzo");
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [foglalasokSzama, setFoglalasokSzama] = useState<number>(0);
  const [modal, setModal] = useState<{ msg: string | null; type: 'success' | 'error' }>({
    msg: null,
    type: 'success'
  });

  const notify = (msg: string, type: 'success' | 'error') => {
    setModal({ msg, type });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const token = localStorage.getItem('user_token');
      const url = searchTerm.length > 1
        ? `http://localhost:8000/api/konyvtar/keres?query=${searchTerm}&sort=${sortBy}`
        : `http://localhost:8000/api/konyvek?sort=${sortBy}`;

      try {
        const res = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        setBooks(res.data);
      } catch (err: any) {
        if (err.response?.status === 401) console.error("Lejárt a munkamenet!");
        console.error("Hiba a könyvek betöltésekor:", err);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, sortBy]);

  const contextValue: LibraryContextType = {
    books,
    searchTerm,
    sortBy,
    setBooks,
    setSearchTerm,
    setSortBy,
    selectedBook,
    setSelectedBook,
    foglalasokSzama,
    setFoglalasokSzama,
    modal,
    notify
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
              <li><NavLink to="/foglalas" className="nav-with-badge">Foglalásaim{foglalasokSzama > 0 && (
                <span className="cart-badge">{foglalasokSzama}</span>
              )}</NavLink></li>
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
        <Modal
          msg={modal.msg}
          type={modal.type}
          onClose={() => setModal({ ...modal, msg: null })}
        />
        <footer>Az éves tagság december 31-ig érvényes!</footer>
      </div>
    </LibraryContext.Provider>
  </>
}

const useLibrary = () => {
  const context = useContext(LibraryContext);

  if (!context) throw Error("Nincs Provider átadva a komponensnek!");

  const { searchTerm, books, sortBy, setBooks, setSearchTerm, setSortBy, selectedBook, setSelectedBook, foglalasokSzama, setFoglalasokSzama, notify } = context;
  return { searchTerm, books, sortBy, setBooks, setSearchTerm, setSortBy, selectedBook, setSelectedBook, foglalasokSzama, setFoglalasokSzama, notify };
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
  const { books, setBooks, selectedBook, setSelectedBook, foglalasokSzama, setFoglalasokSzama, notify } = useLibrary();

  const handleFoglalas = async (
    bookId: number,
    bookTitle: string,) => {
    const token = localStorage.getItem('user_token');

    try {
      await axios.post(`http://localhost:8000/api/foglal`,
        { konyv_id: bookId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );

      notify(`Sikeres foglalás: ${bookTitle}`, 'success');

      setFoglalasokSzama(prev => prev + 1);

      const res = await axios.get('http://localhost:8000/api/konyvek', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setBooks(res.data);

    } catch (err: any) {
      const hibaUzenet = err.response?.data?.hiba || err.response?.data?.message || "Ezt a könyvet már lefoglaltad!";
      notify(`${hibaUzenet}`, 'error');
    }
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