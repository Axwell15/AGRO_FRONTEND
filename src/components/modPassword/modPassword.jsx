import './modPassword.style.css'
import React from 'react'
import { TextField } from '@mui/material';
import {changePassword} from '../../helpers/UserInfo'

const modPassword = () => {
    return (
        <div className='mod-password'>
            <form className='modify-password' onSubmit={async (e) => {
                    e.preventDefault();
                    changePassword(e);
                }}>
                <TextField variant='standard' id='act-password' type='password' className='password-info' label="Contraseña Actual" required />
                <TextField variant='standard' id='new-password' type='password' className='password-info' label="Contraseña Nueva" required />
                <TextField variant='standard' id='confirm-password' type='password' className='password-info' label="Confirmar Contraseña" required />
                <button className='password-btn'>
                    Guardar Contraseña
                </button>
            </form>
        </div>
    )
}

export default modPassword