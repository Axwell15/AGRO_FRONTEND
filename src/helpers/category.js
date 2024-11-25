import { Request } from './validate';

export const getCategories = async () => {
    const uri = import.meta.env.VITE_AGRO_API;
    const config = {
        method: 'GET',
        url: `${uri}data/categories`,
    }
    const res = await Request(config);
    if (res.status === 200) {
        return res.data;
    }
}
