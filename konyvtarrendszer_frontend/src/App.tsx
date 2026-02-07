import { useState, PropsWithChildren } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const LibraryProvider = ({ children }: PropsWithChildren) => {


  const contextValue = {


  }

  return <>
    
  </>

}

function UsernameInput() {
  const [username, setUsername] = useState('');

  return (
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  );
};

function PasswordInput() {
  const [password, setPassword] = useState("");

  return (
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  );
}

function App() {
  return (
    <LibraryProvider>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1>Könyvtári rendszer</h1>
            <h2>Könyvtáros felülete</h2>
            <label>Bejelentkezés
              <p>Felhasználó név:</p>
              <UsernameInput></UsernameInput>
              <p>Jelszó:</p>
              <PasswordInput></PasswordInput>
            </label>
            <button type="submit">Belépés</button>
          </header>
        </div >

        <Routes>
          <Route path="/login" element={<> <UsernameInput /> && <PasswordInput /> </>} />
        </Routes>
      </BrowserRouter>
    </LibraryProvider>
  );
}

export default App;
