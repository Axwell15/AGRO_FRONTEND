import Swal from 'sweetalert2';
import axios from 'axios';

export const Request = async (config) => {
    axios.defaults.withCredentials = true;
    return await axios(config);
};

export const CheckLogin = async (e) => {
    const Data = new FormData(e.target);
    const username = Data.get('user');
    const password = Data.get('password');

    //testing
    if (username === 'admin' && password === 'admin') {
        return true;
    }

    const uri = import.meta.env.VITE_AGRO_API;
    const data = JSON.stringify({
        username,
        password,
    });
    const config = {
        method: 'post',
        url: `${uri}auth/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        data: data
    };

    try{
        const res = await Request(config);
        if (res){
            localStorage.setItem('token', res.data.token);
            return true;
        }
    }catch(error){
        const modalresult = await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario o contraseña incorrectos',
        });

        if (modalresult.isConfirmed) {
            e.target['password'].value = '';
            return false;
        }
    }
};

export const CheckRegister = async (e) => {
    const Data = new FormData(e.target);

    const username = Data.get('username');
    const email = Data.get('email');
    const address = Data.get('address');
    const phone = Data.get('phone');
    const password = Data.get('password');
    const pass2 = Data.get('confirm-password');

    //testing
    if (username === 'admin' && password === '123123') {
        return true;
    }

    if (password !== pass2) {
        const modalresult = Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Las contraseñas no coinciden',
        });

        if ((await modalresult).isConfirmed) {
            return false;
        }
    }

    const uri = import.meta.env.VITE_AGRO_API;
    const data = JSON.stringify({
        username,
        email,
        address,
        phone,
        password
    });
    const config = {
        method: 'post',
        url: `${uri}auth/register`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    try{
        await Request(config);

        const Result = await Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Ahora puedes iniciar sesión',
        });
    
        if (Result.isConfirmed) {
            return true;
        }
    }catch(error){
        console.log(error);
        const modalresult = await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.response.data.message}`,
        });

        if (modalresult.isConfirmed) {
            e.target['username'].value = '';
            e.target['password'].value = '';
            e.target['confirm-password'].value = '';
        }
    }
};

export const Checklogout = async (e) => {
    const uri = import.meta.env.VITE_AGRO_API;
    const config = {
        method: 'get',
        url: `${uri}auth/logout`,
        headers: {
            'Content-Type': 'application/json'
        },
        Credential: 'include'
    };

    try{
        await Request(config);
        localStorage.removeItem('token');
        return true;
    }catch(error){
        console.log(error);
        const modalresult = await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.response.data.message}`,
        });

        if (modalresult.isConfirmed) {
            return false;
        }
    }
};
