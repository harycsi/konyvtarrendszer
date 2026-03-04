import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserLogin, UserRegister } from './pages/UserLoginPages';
import { Login } from './pages/LoginPages';
import { Library } from './pages/LibraryPages';
import { LibrarySystem } from './pages/LibrarySystemPages';
import { FoglalasLista } from './pages/ReservingsPages';
import { UsersLista} from './pages/UsersPages';
import { useEffect } from 'react';
import axios from 'axios';
import KolcsonzesLista from './pages/LendingsPages';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true; // Ez kell a Sanctumhoz

function App() {

  useEffect(() => {
    const fetchCsrf = async () => {
      try {
        // 1️⃣ CSRF cookie lekérése
        await fetch("http://localhost:8000/sanctum/csrf-cookie", {
          credentials: "include"
      });
      } catch (error) {
        console.error("Szerver hiba:", error);
      }
    };
    fetchCsrf();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/belepes" element={<UserLogin />} />
        <Route path="/regisztracio" element={<UserRegister />} />
        <Route path="/" element={<Login />} />
        <Route path="/konyvtarrendszer" element={<LibrarySystem />} />
        <Route path="/konyvtar" element={<Library />} />
        <Route path="/konyvek" element={<LibrarySystem />} />
        <Route path="/foglalasok" element={<FoglalasLista />} />
        <Route path="/kolcsonzesek" element={<KolcsonzesLista />} />
        <Route path="/kolcsonzok" element={<UsersLista />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
