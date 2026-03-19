import { useState } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal } from '../../Modals';

export const UserLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/user-belepes",
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
        type: 'user'
      };

      const index = users.findIndex((u: any) => u.id === data.user.id && u.type === 'user');
      if (index === -1) {
        users.push(userData);
      } else {
        users[index] = userData;
      }

      console.log("Sikeres bejelentkezés:", data);

      localStorage.setItem('active_users', JSON.stringify(users));
      localStorage.setItem('current_user_id', data.user.id);
      localStorage.setItem("user_token", data.token);
      localStorage.setItem("user_data", JSON.stringify(data.user));

      navigate('/konyvtar');

    } catch (error: any) {
      console.error("Login hiba:", error);
      alert(error.response?.data?.message || "Hibás felhasználónév vagy jelszó!");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Könyvtár</h1>
        <h3>Bejelentkezés</h3>
        <form onSubmit={(e) => { e.preventDefault(); loginUser(); }}>
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
          <div className="form-footer">
            <a href="/regisztracio" className="register-link">Regisztráció</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export const UserRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nev: '',
    user_nev: '',
    jelszo: '',
    email_cim: '',
    lakcim: '',
    telefonszam: ''
  });
  const [modal, setModal] = useState<{ msg: string | null; type: 'success' | 'error' }>({
    msg: null,
    type: 'success'
  });

  const notify = (msg: string, type: 'success' | 'error') => {
    setModal({ msg, type });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/regisztral', formData, {
        withCredentials: true
      });

      if (response.status === 200 || response.status === 201) {
        notify("Sikeres regisztráció!", 'success');
      }
    } catch (err: any) {
      console.error("Regisztrációs hiba:", err);
      const hibaUzenet = err.response?.data?.message || "Hiba történt a regisztráció során.";
      notify(hibaUzenet, 'error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Könyvtár</h1>
        <h3>Regisztráció</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Teljes név:</label>
            <input type="text" name="nev" value={formData.nev} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Felhasználó név:</label>
            <input type="text" name="user_nev" value={formData.user_nev} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Jelszó:</label>
            <input type="password" name="jelszo" value={formData.jelszo} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Email cím:</label>
            <input type="email" name="email_cim" value={formData.email_cim} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Lakcím:</label>
            <input type="text" name="lakcim" value={formData.lakcim} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Telefonszám:</label>
            <input type="tel" name="telefonszam" value={formData.telefonszam} onChange={handleChange} required />
          </div>
          <button type="submit">Küldés</button>
          <Modal
            msg={modal.msg}
            type={modal.type}
            onClose={() => {
              setModal({ ...modal, msg: null });
              if (modal.type === 'success') {
                navigate('/belepes');
              }
            }}
          />
        </form>
      </div>
    </div>
  );
}