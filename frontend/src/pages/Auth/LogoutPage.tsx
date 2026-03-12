import axios from 'axios';

export const Logout = async (redirectPath = '/') => {
    const token = localStorage.getItem('token');
    
    try {
        if (token) {
            await axios.post('http://localhost:8000/api/kilepes', {}, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
        }
    } catch (error) {
        console.error("Szerver oldali kijelentkezés sikertelen", error);
    } finally {
        // A kliens oldali takarítás MINDIG lefut
        localStorage.clear(); // Mindent töröl (token, név, stb.)
        window.location.href = redirectPath;
    }
};