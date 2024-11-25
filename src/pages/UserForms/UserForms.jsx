import './UserForms.style.css';
import { memo, useState } from "react";
import BgForms from '../../assets/images/bg-forms.jpg';
import { Outlet } from 'react-router-dom';

const UserForms = () => {
    return (
        <div>
            <div className='min-h-screen flex fle-col items-center justify-center py-6 px-4'>
                <div className='grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full'>
                    <Outlet />
                    <div className='lg:h-[600px] md:h-[400px] max-md:mt-8'>
                        <img src={BgForms} className='w-full h-full max-md:w-4/5 mx-auto block object-cover' alt="imagen" />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default memo(UserForms);