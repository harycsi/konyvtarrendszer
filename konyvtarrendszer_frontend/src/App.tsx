import { useState, PropsWithChildren } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { text } from 'stream/consumers';

const LibraryProvider = ({ children }: PropsWithChildren) => {

  const contextValue = {

  }

  return <>

  </>

}

function UserLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");

  return <>
    <h1>Könyvtár</h1>
    <form>
    <label>Bejelentkezés
    <div>
    <label>Felhasználó név:</label>
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    </div>
    <div>
    <label>Jelszó:</label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    </div>
    </label>
    <button type='button'>Belépés</button>
    </form>
  </>
}

function UserRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  return <>
    <h1>Könyvtár</h1>
    <form>
    <label>Regisztráció
    <div>
    <label>Teljes név:</label>
     <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    </div>
    <div>
    <label>Felhasználó név:</label>
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    </div>
    <div>
    <label>Jelszó:</label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    </div>
    <div>
    <label>Email cím:</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    </div>
    <div>
    <label>Lakcím:</label>
    <input
      type="text"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />
    </div>
    <div>
    <label>Telefonszám:</label>
     <input
      type="tel"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
    />
    </div>
    </label>
    <button type='submit'>Regisztráció</button>
    </form>
  </>
}

function App() {

  return (
    <LibraryProvider>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
          </header>
        </div >
        <Routes>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
        </Routes>
      </BrowserRouter>
    </LibraryProvider>
  );
}

export default App;
