import {useState,useEffect} from 'react';
import {GetUserInfo} from '../../helpers/UserInfo';
import './profile.style.css';

const profile = ({hook}) => {
    const [profileData,setProfileData] = useState({});
    const [form,setForm] = hook;
    useEffect(() => {
        GetUserInfo()
        .then((data) => {
            setProfileData(data.user);
        })
    },[form]);
    return (
        <div className='profile'>
            <img className='profile-img' src={profileData.image} alt="profile" />
            <h2 className='userName'>{profileData.username}</h2>
            <div className='user-info'>
                <h3 className='info'>{profileData.phone}</h3>
                <h3 className='info'>{profileData.email}</h3>
                <h3 className='info'>{profileData.address}</h3>
            </div>
            <button className='profile-opt' onClick={() => setForm('pass')}>
                Modificar Contraseña
            </button>
            <button className='profile-opt' onClick={() => setForm('data')}>
                Editar perfil
            </button>
            <button className='profile-opt' onClick={() => setForm('picture')}>
                Cambiar imagen
            </button>
        </div>
    )
};

export default profile;