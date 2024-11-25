import './login.style.css';
import React from 'react';
import Button from '../Button/button';
import { CheckLogin } from '../../helpers/validate';

//✅
const login = ({hookNavigate}) => {
    const navigate = hookNavigate();
    return (
        <div className='border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto'>
            <form id='login-form' className='space-y-4' method='POST' onSubmit={async (e) => {
                e.preventDefault();
                const band =  await CheckLogin(e);
                if (band) {
                    navigate('/home');
                }
            }}>
                <div className='mb-8'>
                    <h3 className='text-gray-800 text-3xl font-extrabold'>AGROMARKET</h3>
                    <p class="text-gray-500 text-sm mt-4 leading-relaxed">Inicia sesion para continuar.</p>
                </div>
                <div>
                    <label className='labels'>Usuario</label>
                    <div className='relative flex items-center'>
                        <input name="user" type="text" id="user-name" className='inputs' placeholder='ingrese su usuario' required />
                        <svg className='w-[18px] h-[18px] absolute right-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle opacity="0.5" cx="12" cy="9" r="3" stroke="#1C274C" stroke-width="1.5"/>
                            <circle cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.5"/>
                            <path opacity="0.5" d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                <div>
                    <label className='labels'>Contraseña</label>
                    <div className='relative flex items-center'>
                        <input name="password" type="password" id="user-password" className='inputs' placeholder='ingrese su contraseña'required />
                        <svg className='w-[18px] h-[18px] absolute right-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5" d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#1C274C" stroke-width="1.5"/>
                            <path d="M11 12C11 13.3807 9.88071 14.5 8.5 14.5C7.11929 14.5 6 13.3807 6 12C6 10.6193 7.11929 9.5 8.5 9.5C9.88071 9.5 11 10.6193 11 12Z" stroke="#1C274C" stroke-width="1.5"/>
                            <path d="M11 12H15.5M15.5 12H17C17.5523 12 18 12.4477 18 13V14M15.5 12V13.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                <div className='!mt-8'>
                    <Button id="login-button" type="submit">
                        Ingresar
                    </Button>
                </div>
                <br></br>
                <div className='!mt-8'>
                    <Button id="register-button" type="button" onClick={() => {navigate("/register")}}>
                        Registrarse
                    </Button>
                </div>
            </form>
        </div>
    )
};

export default login;