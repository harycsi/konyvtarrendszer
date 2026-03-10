import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserLogin, UserRegister } from './pages/Auth/UserLoginPage';
import { Login } from './pages/Auth/LoginPage';
import { Library } from './pages/Library/LibraryPage';
import { LibrarySystem } from './pages/LibrarySystem/LibrarySystemPage';
import { FoglalasLista } from './pages/LibrarySystem/ReservingsPage';
import { UsersLista} from './pages/LibrarySystem/UsersPage';
import { ProfilePage } from './pages/Library/UserProfilePage';
import { useEffect } from 'react';
import axios from 'axios';
import { KolcsonzesLista } from './pages/LibrarySystem/LendingsPage';
import { LentPage } from './pages/Library/UserLentPage';
import { ReservedPage } from './pages/Library/UserReservedPage';
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
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/kolcsonzes" element={<LentPage />} />
        <Route path="/foglalas" element={<ReservedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
