import { useState } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
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
      localStorage.setItem("role", data.user.role);

      navigate('/konyvtarrendszer');

    } catch (error) {
      console.error("Login hiba:", error);
    }
  }

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
          <button type='button' onClick={() => handleLogin()}>Belépés</button>
        </form>
      </div>
    </div>
  </>
}
