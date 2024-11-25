import axios from 'axios';


export const tokenRefresh = async () => {
    const uri = import.meta.env.VITE_AGRO_API;
    const config = {
        url: `${uri}auth/refresh`,	
        method: 'GET',
        withCredentials: true,
    }
    try {
        const response = await axios(config);
        localStorage.setItem('token', response.data.token);
        return response.data.token;
    }
    catch (error) {
        return false;
    }
};
