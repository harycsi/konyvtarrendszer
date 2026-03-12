import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true; // Ez kell a Sanctumhoz
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserLogin, UserRegister } from './pages/Auth/UserLoginPage';
import { Login } from './pages/Auth/LoginPage';
import { Library } from './pages/Library/LibraryPage';
import { LibraryProvider, LibrarySystem } from './pages/LibrarySystem/LibrarySystemPage';
import { FoglalasLista } from './pages/LibrarySystem/ReservingsPage';
import { UsersLista } from './pages/LibrarySystem/UsersPage';
import { ProfilePage } from './pages/Library/UserProfilePage';
import { KolcsonzesLista } from './pages/LibrarySystem/LendingsPage';
import { LentPage } from './pages/Library/UserLentPage';
import { ReservedPage } from './pages/Library/UserReservedPage';

function App() {

  return (
    <BrowserRouter>
      <LibraryProvider>
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
      </LibraryProvider>
    </BrowserRouter>
  );
}

export default App;