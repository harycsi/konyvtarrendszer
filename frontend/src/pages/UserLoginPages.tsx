import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

export const UserLogin = () => {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const xsrfToken = getCookie("XSRF-TOKEN");

    // 3️⃣ Bejelentkezés X-XSRF-TOKEN headerrel
    const response = await fetch("http://localhost:8000/api/user-belepes", {
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

    navigate('/konyvtar'); 

    } catch (error) {
       console.error("Login hiba:", error);
    }
}

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
          <button type='button' onClick={() => loginUser()}>Belépés</button>
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

  const handleSubmit = async () => {

     const regData = {
      nev: name,
      felhasznalonev: username,
      jelszo: password,
      email: email,
      lakcim: address,
      telefon: phone
    };

    try {
      const response = await fetch('http://localhost:8000/api/regisztral', {
        method: 'POST',
        credentials: "include",
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json'
        },
        body: JSON.stringify(regData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sikeres regisztráció!");
        navigate('/belepes'); 
      } else {
        alert("Hiba: " + (data.message || "Hiba történt a regisztráció során."));
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
    <button type="button" onClick={handleSubmit}>Küldés</button>
    </form>
    </div>
  </div>    
</>
}
