import { useState } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    if(e) e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/belepes", 
        {
          user_nev: username,
          jelszo: password
        }, 
        { withCredentials: true }
      );

      const data = response.data;

      // --- TÖBB FIÓK KEZELÉSE ---
      const users = JSON.parse(localStorage.getItem('active_users') || '[]');
      
      const userData = { 
        id: data.user.id, 
        name: data.user.user_nev, 
        token: data.token,
        type: 'admin'
      };

      const index = users.findIndex((u: any) => u.id === data.user.id && u.type === 'admin');
      
      if (index === -1) {
        users.push(userData);
      } else {
        users[index] = userData;
      }

      console.log("Sikeres dolgozói bejelentkezés:", data);

      localStorage.setItem('active_users', JSON.stringify(users));
      localStorage.setItem('current_admin_id', data.user.id);
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_user", JSON.stringify(data.user));

      window.location.href = '/konyvtarrendszer';

    } catch (error: any) {
      console.error("Login hiba:", error);
      alert(error.response?.data?.message || "Hibás dolgozói név vagy jelszó!");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Könyvtárrendszer</h1>
        <h3>Bejelentkezés</h3>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Felhasználó név:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Jelszó:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit'>Belépés</button>
        </form>
      </div>
    </div>
  );
}