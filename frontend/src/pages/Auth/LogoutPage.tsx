import axios from "axios";

export const Logout = async (redirectPath = '/') => {
    const adminToken = localStorage.getItem('admin_token');
    const userToken = localStorage.getItem('user_token');
    const activeToken = adminToken || userToken;
    
    try {
        if (activeToken) {
            await axios.post('http://localhost:8000/api/kilepes', {}, {
                headers: { 
                    Authorization: `Bearer ${activeToken}`,
                    'Accept': 'application/json'
                }
            });
        }
    } catch (error) {
        console.error("Szerver oldali kijelentkezés hiba", error);
    } finally {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('active_users');

        window.location.href = redirectPath;
    }
};