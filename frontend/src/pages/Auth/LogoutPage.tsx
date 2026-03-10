import axios from 'axios';

export const UserLogout = async() => {
    try {
        await axios.post('http://localhost:8000/api/kilepes', {}, {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Accept": "application/json", 
            }
        });
    } catch (error) {
        console.error("Hiba a kijelentkezés során", error);
    } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('user_nev');
        window.location.href = '/belepes'; //az oldal teljesen újra fog töltődni. 
        // Ez API-knál és kijelentkezésnél kifejezetten biztonságos, tuti mindne kitörlődik.
    }
};

export const Logout = async() => {
    try {
        await axios.post('http://localhost:8000/api/konyvtar/kilepes', {}, {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`, 
                "Accept": "application/json",
            }
        });
    } catch (error) {
        console.error("Hiba a kijelentkezés során", error);
    } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('user_nev');
        window.location.href = '/'; 
    }
};