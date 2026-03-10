import { useState, createContext, useContext, useEffect } from 'react';
import '../../App.css';
import { NavLink } from 'react-router-dom';
import { Logout } from '../Auth/LogoutPage';
import { handleKolcsonzes } from '../../ApiActions';
import axios from 'axios';

interface Book {
  id: number;
  cim: string;
  szerzo: string;
  kiadas_eve: string;
  oldalak: number;
  db_szam: number;
}

interface LibraryContextType {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    sortBy: string;
    setSortBy: (val: string) => void;
    books: Book[];
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
    handleSearch: (term: string) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibrarySystem = () => {

const [searchTerm, setSearchTerm] = useState("");
const [sortBy, setSortBy] = useState("cim");
const [books, setBooks] = useState<Book[]>([]); 

useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
        headers: { 'Accept': 'application/json', Authorization: `Bearer ${token}` }
    };

    // Vár 300ms-ot, mielőtt elküldi a kérést
    const delayDebounceFn = setTimeout(() => {
        if (searchTerm.length > 2) {
            axios.get(`http://localhost:8000/api/konyvtar/keres?query=${searchTerm}`, config)
                .then(res => setBooks(res.data))
                .catch(err => console.error("Keresési hiba:", err));
        } else if (searchTerm.length === 0) {
            axios.get('http://localhost:8000/api/konyvtar/konyv-lista', config)
                .then(res => setBooks(res.data))
                .catch(err => console.error("Hiba:", err));
        }
    }, 300);

    return () => clearTimeout(delayDebounceFn); // Kitakarítja az időzítőt, ha a user tovább gépel
}, [searchTerm]); // Ez a hook minden searchTerm változáskor lefut

const handleSearch = (term: string) => {
    setSearchTerm(term);
};

const contextValue: LibraryContextType = {
    books,
    searchTerm,
    sortBy,
    setBooks,
    setSearchTerm,
    setSortBy,
    handleSearch,
};

return <>
     <LibraryContext.Provider value={contextValue}>
          <div className="library-container">
            <header>
            <div className="logo">Könyvtárrendszer</div>
            <nav>
                <ul>   
                <li><NavLink to="/kolcsonzok">Kölcsönzők</NavLink></li>
                <li><NavLink to="/kolcsonzesek">Kölcsönzések</NavLink></li>
                <li><NavLink to="/foglalasok">Foglalások</NavLink></li>
                <li><button type="button" onClick={Logout} className="nav-link-button">
                    Kilépés</button></li>
                </ul>
            </nav>
            </header>
            <div className="konyvtar-lista-container">
            <SearchBar />
            <hr />
            <h3>Teljes könyvkínálat</h3>
            <table className="konyv-tablazat">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cím</th>
                        <th>Szerző</th>
                        <th>Kiadás éve</th>
                        <th>Oldalak</th>
                        <th>Darabszám</th>
                        <th>Kölcsönzés</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length > 0 ? (
                        books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.cim}</td>
                                <td>{book.szerzo}</td>
                                <td>{book.kiadas_eve}</td>
                                <td>{book.oldalak}</td>
                                <td>{book.db_szam} db</td>
                                <td>
                                    <button className="kolcsonzes-gomb" disabled={book.db_szam === 0} onClick={() => handleKolcsonzes(book.id, setBooks)}
                                        > {book.db_szam > 0 ? "Kölcsönzés" : "Elfogyott"}</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>Betöltés vagy üres lista...</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
    </div>
    </LibraryContext.Provider>
</>
}

const useLibrary = () => {
  const context = useContext(LibraryContext);

  if (!context) throw Error("Nincs Provider átadva a komponensnek!");

  const { searchTerm, books, sortBy, setBooks, handleSearch, setSearchTerm } = context;
  return { searchTerm, books, sortBy, setBooks, handleSearch, setSearchTerm };
}

export const SearchBar = () => {
  const { searchTerm, handleSearch } = useLibrary();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <label>Keresés:
            <input 
            type="text" 
            value={searchTerm}  
            onChange={(e) => handleSearch(e.target.value)} 
            placeholder="Cím vagy szerző..."
            />      
        </label>
    </form>
  );
}