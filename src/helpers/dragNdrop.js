import {tokenRefresh} from './tokenRefresh';
import {Request} from './validate';
import Swal from "sweetalert2";

const uploadImage = async (image) => {
    const uri = 'https://api.cloudinary.com/v1_1/';
    const data = {
        file: image,
        upload_preset: 'avatar',
    };
    const config = {
        method: 'POST',
        url: `${uri}${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        data,
    };

    const response = await Request(config);
    return response.data.secure_url;
};

export const handleDragOver = (event) => {
    event.preventDefault();
}

export const HandleDrop = (event) =>{
    event.preventDefault();
    if(event.type === 'drop'){
        return event.dataTransfer.files[0];
    }

    if(event.type === 'change'){
        return event.target.files[0];
    }
}

export const sendFile = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (e) => {
        const restoken = await tokenRefresh();
        const image = await uploadImage(e.target.result);
        const uri = import.meta.env.VITE_AGRO_API;
        if(image){
            const data = {
                image: image,
            };
            const config = {
                method: 'PUT',
                url: `${uri}profile/change-image`,
                headers: {
                    authorization: `Bearer ${restoken ? restoken : localStorage.getItem('token')}`,
                },
                data: data,
            }
            const response = await Request(config);
            if(response.status === 200){
                const result = await Swal.fire({
                    icon: 'success',
                    title: 'Imagen actualizada',
                    showConfirmButton: false,
                    timer: 1500
                });
                if(result.isConfirmed){
                    window.location.reload();
                }
            }
        }
    };
};
