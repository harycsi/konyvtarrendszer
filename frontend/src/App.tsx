import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserLogin, UserRegister, Login } from './pages/Login';
import { Library } from './pages/Library';
import { LibrarySystem } from './pages/LibrarySystem';
import { FoglalasLista } from './pages/Reservings';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    const login = async () => {
      try {
        // 1️⃣ CSRF cookie lekérése
        await fetch("http://localhost:8000/sanctum/csrf-cookie", {
          credentials: "include"
      });
      } catch (error) {
        console.error("Szerver hiba:", error);
      }
    };
    login();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/belepes" element={<UserLogin />} />
        <Route path="/regisztracio" element={<UserRegister />} />
        <Route path="/" element={<Login />} />
        <Route path="/bejelentkezes" element={<Login />} />
        <Route path="/konyvtarrendszer" element={<LibrarySystem />} />
        <Route path="/konyvtar" element={<Library />} />
        <Route path="/konyvek" element={<LibrarySystem />} />
        <Route path="/foglalasok" element={<FoglalasLista />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;