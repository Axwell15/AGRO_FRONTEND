import Swal from 'sweetalert2';
import { Request } from './validate';
import { tokenRefresh } from './tokenRefresh';

const uploadImage = async (image) => {
    const uri = 'https://api.cloudinary.com/v1_1/';
    const data = {
        file: image,
        upload_preset: 'product',
    };
    const config = {
        method: 'POST',
        url: `${uri}agromarket/image/upload`,//ola
        withCredentials: false,
        data,
    };

    const response = await Request(config);
    return response.data.secure_url;
};

export const protectRoute = async () => {
    const restoken = await tokenRefresh();

    if (!restoken) {
        //window.location.href = '/';
    }
};

export const getCategories = async () => {
    const array = [];
    const uri = import.meta.env.VITE_AGRO_API;
    const config = {
        method: 'GET',
        url: `${uri}data/categories`,
    }
    const res = await Request(config);
    if (res.status === 200) {
        res.data.forEach(element => {
            array.push(element["name"]);
        });
        return array;
    }
};

export const GetUnits = async () => {
    const array = [];
    const uri = import.meta.env.VITE_AGRO_API;
    const config = {
        method: 'GET',
        url: `${uri}data/measureUnits`,
    }
    const res = await Request(config);
    if (res.status === 200) {
        res.data.forEach(element => {
            array.push(element["name"]);
        });
        return array;
    }
};

export const addPicture = async () => {
    let result;
    const Swalmixin = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            denyButton: 'btn btn-success'
        }
    });

    const Result = await Swalmixin.fire({
        title: 'Agregar imagen',
        text: '¿De donde desea agregar la imagen?',
        icon: 'question',
        confirmButtonText: 'local',
        showDenyButton: true,
        denyButtonText: 'url',
        confirmButtonColor: '#255A1B',
        denyButtonColor: '#255A1B',
        focusConfirm: false,
    });

    if (Result.isConfirmed) {
        const { value: file } = await Swal.fire({
            title: 'Seleccione una imagen',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Subir una imagen'
            }
        });

        if (file) {
            result = {
                type: 'local',
                file
            }
        }
    }

    if (Result.isDenied) {
        const { value: url } = await Swal.fire({
            title: 'Ingrese una url',
            input: 'url',
            inputPlaceholder: 'Ingrese una url'
        });

        if (url) {
            let Img = url;
            if (url.includes('drive.google.com')) {
                const id = url.split('/')[5];
                Img = `https://drive.google.com/uc?export=view&id=${id}`;
            }
            result = {
                type: 'url',
                url: Img
            }
        }
    }

    return result;
};

export const CreateProduct = async (event, image) => {
    const uri = import.meta.env.VITE_AGRO_API;
    const name = event.target["name"].value;
    const description = event.target["description"].value;
    const category = event.target["category"].value;
    const measureUnit = event.target["unitOfMeasure"].value;
    const quantity = event.target["amount"].value;
    const price = event.target["price"].value;
    const stock = event.target["stock"].value;
    const image_url = await uploadImage(image);

    const data = JSON.stringify({
        name,
        description,
        price,
        quantity,
        category,
        measureUnit,
        stock,
        image: image_url
    });

    try {
        const restoken = await tokenRefresh();
        const config = {
            method: 'POST',
            url: `${uri}products/create`,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${restoken? restoken : localStorage.getItem('token')}`
            },
            data: data
        }
        const response = await Request(config);
        if (response) {
            const modalresult = await Swal.fire({
                title: 'Producto creado',
                text: 'El producto se creo correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });
            if (modalresult.isConfirmed) {
                return;
            }
        }
    } catch (error) {
        alert(error);
    }
};

export const UpdateProduct = async (event, image, product) => {
    const uri = import.meta.env.VITE_AGRO_API;
    const name = event.target["name"].value;
    const description = event.target["description"].value;
    const category = event.target["category"].value;
    const measureUnit = event.target["unitOfMeasure"].value;
    const quantity = event.target["amount"].value;
    const price = event.target["price"].value;
    const stock = event.target["stock"].value;
    const image_url = await uploadImage(image);

    const data = JSON.stringify({
        name,
        description,
        price,
        quantity,
        category,
        measureUnit,
        stock,
        image: image_url
    });

    try {
        const restoken = await tokenRefresh();
        const config = {
            method: 'PATCH',
            url: `${uri}products/update/${product._id}`,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${restoken ? restoken : localStorage.getItem('token')}`
            },
            data: data
        }
        const response = await Request(config);
        if (response) {
            const modalresult = await Swal.fire({
                title: 'Producto actualizado',
                text: 'El producto se actualizo correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });
            if (modalresult.isConfirmed) {
                return;
            }
        }
    } catch (error) {
        alert(error);
    }
};
