import {Request} from './validate';
import {tokenRefresh} from './tokenRefresh';

const deleteImage = async (image_url) => {
    const uri = 'https://api.cloudinary.com/v1_1/';
    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const apiKey = import.meta.env.VITE_CLOUD_API_KEY;
    const data = {
        public_id: image_url,
        api_key: apiKey,
    };
    const config = {
        method: 'POST',
        url: `${uri}${cloudName}/image/destroy`,
        data: data
    };

    const response = await Request(config);

    return response;
};

export const deleteProduct = async  (product) => {
    const restoken = await tokenRefresh();
    const uri = import.meta.env.VITE_AGRO_API;
    const config = {
        method: 'DELETE',
        url: `${uri}products/delete/${product._id}`,
        headers: {
            authorization: `Bearer ${restoken ? restoken : localStorage.getItem('token')}`,
        }
    }
    const response = await Request(config);
    if (response.status === 200){
        /* if (product.image){
            const deleteResponse = await deleteImage(product.image);
            if (deleteResponse.status === 200){
                return response;
            }
        } */
        return response;
    }
};
