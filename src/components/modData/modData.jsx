import './modData.style.css'
import React from 'react'
import { TextField } from '@mui/material';
import {updateUser} from '../../helpers/UserInfo'

const modData = () => {
    return (
        <div className='mod-data'>
            <form className='modify-data' onSubmit={async (e) => {
                e.preventDefault();
                updateUser(e);
            }}>
                <TextField variant='standard' id='data-name' className='data-info' label="Nombre" />
                <TextField variant='standard' id='data-phone' className='data-info' label="Teléfono" />
                <TextField variant='standard' id='data-direction' className='data-info' label="Dirección" />
                <TextField variant='standard' id='data-email' className='data-info' label="email" />
                <button className='data-btn'>
                    Guardar Cambios
                </button>
            </form>
        </div>
    )
}

export default modData