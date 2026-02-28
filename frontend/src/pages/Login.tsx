import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

async function login(navigate, username, password) {

  //const navigate = useNavigate(); 
    // 2️⃣ XSRF token kiolvasása a cookie-ból
    try {
      const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const xsrfToken = getCookie("XSRF-TOKEN");

    // 3️⃣ Bejelentkezés X-XSRF-TOKEN headerrel
    const response = await fetch("http://localhost:8000/api/belepes", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken as string)
      },
      body: JSON.stringify({
        user_nev: username,
        jelszo: password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Hiba:", data);
      return;
    }

    console.log("Sikeres bejelentkezés:", data);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate('/konyvtarrendszer'); 

    } catch (error) {
       console.error("Login hiba:", error);
    }
}

export const UserLogin = () => {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");

  return <>
    <div className="login-container">
      <div className="login-box">
        <h1>Könyvtár</h1>
        <h3>Bejelentkezés</h3>

        <form>
          <div className="input-group">
            <label>Felhasználó név:</label>
            <input
              type="text"
              value={username}
               onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Jelszó:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='button' onClick={() => login()}>Belépés</button>
          <div className="form-footer">
            <a href="/regisztracio" className="register-link">Regisztráció</a>
          </div>
        </form>
      </div>
  </div>
</>
}

export const UserRegister = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
     const regData = {
      nev: name,
      felhasznalonev: username,
      jelszo: password,
      email: email,
      lakcim: address,
      telefon: phone
    };

    try {
      const response = await fetch('https://localhost:8000/api/regisztral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regData)
      });

      if (response.ok) {
        alert("Sikeres regisztráció!");
        navigate('/konyvtar'); 
      } else {
        alert("Hiba történt a regisztráció során.");
      }
    } catch (err) {
      console.error("Hálózati hiba:", err);
    }
  };

  return <>
    <div className="login-container">
      <div className="login-box">
        <h1>Könyvtár</h1>
        <h3>Regisztráció</h3>

    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Teljes név:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
      </div>

      <div className="input-group">
        <label>Felhasználó név:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
      </div>

      <div className="input-group">
        <label>Jelszó:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
      </div>

      <div className="input-group">
        <label>Email cím:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
      </div>    

     <div className="input-group">
      <label>Lakcím:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
    </div>

    <div className="input-group">
      <label>Telefonszám:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
    </div>
    <button type='submit'>Küldés</button>
    </form>
    </div>
  </div>    
</>
}

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");

  return <>
    <div className="login-container">
      <div className="login-box">
        <h1>Könyvtárrendszer</h1>
        <h3>Bejelentkezés</h3>

        <form>
          <div className="input-group">
            <label>Felhasználó név:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Jelszó:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='button' onClick={() => login(navigate, username, password)}>Belépés</button>
        </form>
      </div>
    </div>
</>
}