import { useState, useMemo, createContext, useContext, useEffect } from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { Logout } from './LogoutPages';
import { handleKolcsonzes } from '../ApiActions';
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
    filteredBooks: Book[];
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibrarySystem = () => {

const [searchTerm, setSearchTerm] = useState("");
const [sortBy, setSortBy] = useState("cim");
const [books, setBooks] = useState<Book[]>([]); 

useEffect(() => {
    axios.get('http://localhost:8000/api/konyvtar/konyv-lista', {
        headers: { 
            'Accept': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then(res => setBooks(res.data))
    .catch(err => console.error("Hiba a letöltéskor:", err));
}, []);

const filteredBooks = useMemo<Book[]>(() => {
const lowerSearchTerm = searchTerm.toLowerCase();

  return books
            .filter((book: Book) => 
            book.cim.toLowerCase().includes(lowerSearchTerm) || 
            book.szerzo.toLowerCase().includes(lowerSearchTerm))
            .sort((a: Book, b: Book) => {
              if (sortBy === 'cim') return a.cim.localeCompare(b.cim);
              if (sortBy === 'szerzo') return a.szerzo.localeCompare(b.szerzo);
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
    filteredBooks,
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
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
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
                            <td colSpan={6}>Betöltés vagy üres lista...</td>
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

  const { searchTerm, books, sortBy, setBooks, filteredBooks, setSearchTerm } = context;
  return { searchTerm, books, sortBy, setBooks, filteredBooks, setSearchTerm };
}

export const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useLibrary();

  return <form>
    <label>Keresés (cím vagy szerző):
        <input 
          type="text" 
          value={searchTerm}  
          onChange={(e) => setSearchTerm(e.target.value)} 
        />      
        {searchTerm}
      </label>
  </form>
}