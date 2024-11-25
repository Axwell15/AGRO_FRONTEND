import './register.style.css';
import React from 'react';
import Button from '../Button/button';
import { CheckRegister } from '../../helpers/validate';

//✅
const register = ({hookNavigate}) => {
    const navigate = hookNavigate();
    return (
        <div className='border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto'>
            <form className='space-y-4' method='POST' onSubmit={async (e) => {
                e.preventDefault();
                const band = await CheckRegister(e);
                if (band) {
                    navigate('/');
                }
            }}>
                <div class="mb-8">
                <h3 class="text-gray-800 text-3xl font-extrabold">AGROMARKET</h3>
                <p class="text-gray-500 text-sm mt-4 leading-relaxed">registrate con nosotros.</p>
              </div>
                <div>
                    <label className='labels'>Usuario</label>
                    <div className='relative flex items-center'>
                        <input name="username" type="text" id="register-user" className='inputs' required />
                        <svg className='w-[18px] h-[18px] absolute right-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle opacity="0.5" cx="12" cy="9" r="3" stroke="#1C274C" stroke-width="1.5"/>
                            <circle cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.5"/>
                            <path opacity="0.5" d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                <div>
                    <label className='labels'>Correo</label>
                    <div className='relative flex items-center'>
                        <input name="email" type="email" id="register-email" className='inputs' required />
                        <svg className='w-[18px] h-[18px] absolute right-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5" d="M18 6.10156C19.3001 6.22944 20.1752 6.51846 20.8284 7.17164C22 8.34322 22 10.2288 22 14.0001C22 17.7713 22 19.6569 20.8284 20.8285C19.6569 22.0001 17.7712 22.0001 14 22.0001H10C6.22876 22.0001 4.34315 22.0001 3.17157 20.8285C2 19.6569 2 17.7713 2 14.0001C2 10.2288 2 8.34322 3.17157 7.17164C3.82475 6.51846 4.69989 6.22944 6 6.10156" stroke="#1C274C" stroke-width="1.5"/>
                            <path d="M10 6H14" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M11 9H13" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M8.1589 11.7991L7.43926 11.1994C6.73152 10.6096 6.37764 10.3147 6.18882 9.91156C6 9.50842 6 9.04778 6 8.1265V7C6 4.64298 6 3.46447 6.73223 2.73223C7.46447 2 8.64298 2 11 2H13C15.357 2 16.5355 2 17.2678 2.73223C18 3.46447 18 4.64298 18 7V8.1265C18 9.04778 18 9.50842 17.8112 9.91156C17.6224 10.3147 17.2685 10.6096 16.5607 11.1994L15.8411 11.7991C14.0045 13.3296 13.0861 14.0949 12 14.0949C10.9139 14.0949 9.99553 13.3296 8.1589 11.7991Z" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M6 10L8.1589 11.7991C9.99553 13.3296 10.9139 14.0949 12 14.0949C13.0861 14.0949 14.0045 13.3296 15.8411 11.7991L18 10" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                <div>
                    <label className='labels'>Direccion</label>
                    <div className='relative flex items-center'>
                        <input name="address" type="address" id="register-address" className='inputs' required />
                        <svg className='w-[18px] h-[18px] absolute right-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z" stroke="#1C274C" stroke-width="1.5"/>
                            <path opacity="0.5" d="M5.5 8.75732C5.5 6.95835 7.067 5.5 9 5.5C10.933 5.5 12.5 6.95835 12.5 8.75732C12.5 10.5422 11.3829 12.625 9.64003 13.3698C9.23374 13.5434 8.76626 13.5434 8.35997 13.3698C6.61708 12.625 5.5 10.5422 5.5 8.75732Z" stroke="#1C274C" stroke-width="1.5"/>
                            <path opacity="0.5" d="M14.0004 13.9993L20.5004 20.4993M14.0004 13.9993L6.39453 21.6053M14.0004 13.9993L21.6072 6.39258" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                            <path opacity="0.5" d="M10 9C10 9.55228 9.55228 10 9 10C8.44772 10 8 9.55228 8 9C8 8.44772 8.44772 8 9 8C9.55228 8 10 8.44772 10 9Z" fill="#1C274C"/>
                        </svg>
                    </div>
                </div>
                <div>
                    <label className='labels'>Telefono</label>
                    <div className='relative flex items-center'>
                        <input name="phone" type="tel" id="register-phone" className='inputs' required />
                        <svg className='w-[18px] h-[18px] absolute right-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 2C14 2 16.2 2.2 19 5C21.8 7.8 22 10 22 10" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M14.207 5.53564C14.207 5.53564 15.197 5.81849 16.6819 7.30341C18.1668 8.78834 18.4497 9.77829 18.4497 9.77829" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                            <path opacity="0.5" d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                <div>
                    <label className='labels'>Contraseña</label>
                    <div className='relative flex items-center'>
                        <input name="password" type="password" id="register-password" minLength='6' className='inputs' required />
                        <svg className='w-[18px] h-[18px] absolute right-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5" d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#1C274C" stroke-width="1.5"/>
                            <path d="M11 12C11 13.3807 9.88071 14.5 8.5 14.5C7.11929 14.5 6 13.3807 6 12C6 10.6193 7.11929 9.5 8.5 9.5C9.88071 9.5 11 10.6193 11 12Z" stroke="#1C274C" stroke-width="1.5"/>
                            <path d="M11 12H15.5M15.5 12H17C17.5523 12 18 12.4477 18 13V14M15.5 12V13.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                <div>
                    <label className='labels'>Confirmar contraseña</label>
                    <div className='relative flex items-center'>
                        <input name="confirm-password" type="password" id="password-confirm" className='inputs' required />
                        <svg className='w-[18px] h-[18px] absolute right-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5" d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#1C274C" stroke-width="1.5"/>
                            <path d="M11 12C11 13.3807 9.88071 14.5 8.5 14.5C7.11929 14.5 6 13.3807 6 12C6 10.6193 7.11929 9.5 8.5 9.5C9.88071 9.5 11 10.6193 11 12Z" stroke="#1C274C" stroke-width="1.5"/>
                            <path d="M11 12H15.5M15.5 12H17C17.5523 12 18 12.4477 18 13V14M15.5 12V13.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                <div className='!mt-8'>
                    <Button id="register-button" type="submit">
                        Registrarse
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default register