import { useState, createContext, useContext, useEffect } from 'react';
import '../../App.css';
import { NavLink, useLocation } from 'react-router-dom';
import { Logout } from '../Auth/LogoutPage';
import { handleKolcsonzes } from '../../ApiActions';
import axios from 'axios';
import { Modal, InputModal } from '../../Modals';


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
    fetchBooks: () => void;
    modal: { msg: string | null; type: 'success' | 'error' };
    notify: (msg: string, type: 'success' | 'error') => void;
}

export const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [books, setBooks] = useState<Book[]>([]);
    const location = useLocation();

    const [modal, setModal] = useState<{ msg: string | null; type: 'success' | 'error' }>({
        msg: null,
        type: 'success'
    });

    const notify = (msg: string, type: 'success' | 'error') => {
        setModal({ msg, type });
    };

    const fetchBooks = async () => {
        const adminToken = localStorage.getItem('admin_token');

        try {
            const res = await axios.get('http://localhost:8000/api/konyvtar/konyv-lista', {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    'Accept': 'application/json',
                }
            });
            setBooks(res.data);
        } catch (err) {
            console.error("Hiba a letöltéskor", err);
        }
    };

    const getData = async () => {
        const adminToken = localStorage.getItem('admin_token');

        if (!adminToken) {
            console.warn("Nincs token, lekérés kihagyva.");
            return;
        }

        const url = searchTerm.length > 2
            ? `http://localhost:8000/api/konyvtar/keres?query=${searchTerm}&sort=${sortBy}`
            : `http://localhost:8000/api/konyvtar/konyv-lista?sort=${sortBy}`;

        try {
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    'Accept': 'application/json'
                }
            });
            setBooks(res.data);
        } catch (err) {
            console.error("Hiba a betöltéskor:", err);
        }
    };

    useEffect(() => {
        getData();

    }, [searchTerm, sortBy, location.key]);

    const contextValue = { books, searchTerm, sortBy, setBooks, setSearchTerm, setSortBy, handleSearch: setSearchTerm, fetchBooks, modal, notify };

    return (
        <LibraryContext.Provider value={contextValue}>
            {children}
            <Modal
                msg={modal.msg}
                type={modal.type}
                onClose={() => setModal({ ...modal, msg: null })}
            />
        </LibraryContext.Provider>
    );
};

export const LibrarySystem = () => {
    const { books, setBooks, notify } = useLibrary();
    const [inputModalOpen, setInputModalOpen] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

    const openInputModal = (id: number) => {
        setSelectedBookId(id);
        setInputModalOpen(true);
    };

    const handleInputSubmit = (userId: string) => {
        if (userId && selectedBookId) {
            handleKolcsonzes(selectedBookId, Number(userId), setBooks, notify);
            setInputModalOpen(false);
        } else {
            notify("Kérjük, adj meg egy érvényes ID-t!", "error");
        }
    };

    return (
        <div className="library-container">
            <header>
                <div className="logo">Könyvtárrendszer</div>
                <nav>
                    <ul>
                        <li><NavLink to="/kolcsonzok">Kölcsönzők</NavLink></li>
                        <li><NavLink to="/kolcsonzesek">Kölcsönzések</NavLink></li>
                        <li><NavLink to="/foglalasok">Foglalások</NavLink></li>
                        <li><button type="button" onClick={() => Logout('/')} className="nav-link-button">
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
                            <th>Művelet</th>
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
                                        <button
                                            className="kolcsonzes-gomb"
                                            disabled={book.db_szam === 0}
                                            onClick={() => openInputModal(book.id)}>
                                            {book.db_szam > 0 ? "Kölcsönzés" : "Elfogyott"}
                                        </button>
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
            <InputModal
                isOpen={inputModalOpen}
                title="Kölcsönző azonosítója"
                onClose={() => setInputModalOpen(false)}
                onSubmit={handleInputSubmit}
            />
        </div>
    );
};

export const useLibrary = () => {
    const context = useContext(LibraryContext);

    if (!context) throw Error("Nincs Provider átadva a komponensnek!");

    const { searchTerm, books, sortBy, setBooks, handleSearch, setSearchTerm, fetchBooks, notify, modal } = context;
    return { searchTerm, books, sortBy, setBooks, handleSearch, setSearchTerm, fetchBooks, notify, modal };
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