import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { addPicture, CreateProduct, getCategories, GetUnits, protectRoute, UpdateProduct } from '../../helpers/selling';
import Button from '../Button/button';
import './selling.style.css';

const selling = () => {
    const [product, setProduct] = useOutletContext();
    const [category, setCategory] = useState([]);
    const [unitOfMeasure, setUnitOfMeasure] = useState([]);
    const [img, setImg] = useState(product?.image || null);

    const [name, setName] = useState(() => product?.name || '');
    const [description, setDescription] = useState(() => product?.description || '');
    const [quantity, setQuantity] = useState(() => product?.quantity || '');
    const [price, setPrice] = useState(() => product?.price || '');
    const [stock, setStock] = useState(() => product?.stock || '');
    const [categorySelected, setCategorySelected] = useState('');
    const [unitOfMeasureSelected, setUnitOfMeasureSelected] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImg(reader.result); // Establecer la imagen seleccionada
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        return () => {
            // Limpiar todos los estados al desmontarse
            setName('');
            setDescription('');
            setQuantity('');
            setPrice('');
            setStock('');
            setCategorySelected('');
            setUnitOfMeasureSelected('');
            setImg('');
        };
    }, []);
    useEffect(() => {
        protectRoute()
            .then(() => {
                getCategories()
                    .then((data) => {
                        setCategory(data);
                        console.log(data)
                        // Si ya existe un valor para la categoría seleccionada, actualiza el estado
                        if (product?.category) {
                            setCategorySelected(product.category.name);
                        } else {
                            setCategorySelected(data[0]?.name || ''); // Selecciona la primera categoría si no hay una predefinida
                        }
                    });

                GetUnits()
                    .then((data) => {
                        setUnitOfMeasure(data);
                        console.log(data)
                        // Similar para la unidad de medida
                        if (product?.unitOfMeasure) {
                            setUnitOfMeasureSelected(product.unitOfMeasure.name);
                        } else {
                            setUnitOfMeasureSelected(data[0]?.name || ''); // Selecciona la primera unidad si no hay una predefinida
                        }
                    });
            });
    }, [product]);

    return (
        <div className='font-[Inter]'>
            <div className='min-h-screen flex flex-col items-center justify-center py-4 px-4'>
                <div className='grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full'>
                    <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
                        {img ? (
                                <img src={img} alt="Imagen del producto" className="h-full w-full object-cover" />
                            ) : (
                                <label htmlFor="uploadFile1"
                                    className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[Inter]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                                        <path
                                            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                        />
                                        <path
                                            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                        />
                                    </svg>
                                    Upload file

                                    <input type="file" id="uploadFile1" className="hidden" onChange={handleImageChange} />
                                    <p className="text-xs font-medium text-gray-400 mt-2">PNG, JPG and WEBP are Allowed.</p>
                                </label>
                            )}
                    </div>
                    <div className='border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto'>
                        <form className='space-y-4'
                            onSubmit={(e) => {
                                e.preventDefault();
                                product ? UpdateProduct(e, img, product) : CreateProduct(e, img);
                                e.target.reset();
                                setImg(null);
                            }}>
                            <div className='mb-8'>
                                <h3 className='text-gray-800 text-3xl font-extrabold'>{product ? 'EDITAR' : 'VENDER'}</h3>
                            </div>
                            <div>
                                <label className='labels'>Nombre</label>
                                <div className='relative flex items-center'>
                                    <input type="text" name='name' className='inputs' value={name} onChange={(e) => setName(e.target.value)} placeholder='ingrese nombre del producto' required />
                                </div>
                            </div>
                            <div>
                                <label className='labels'>Descripcion</label>
                                <div className='relative flex items-center'>
                                    <input type="text" name='description' className='inputs' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='ingrese una descripcion' required />
                                </div>
                            </div>

                            {/* Categoría con TailwindCSS */}
                            <div>
                                <label className='labels'>Categoria</label>
                                <select 
                                    id="category" 
                                    value={categorySelected} 
                                    onChange={(e) => setCategorySelected(e.target.value)} 
                                    className="inputs block w-full mt-2 border-gray-300 rounded-md shadow-sm"
                                >
                                    {category.length > 0 ? (
                                        category.map((cat, index) => (
                                            <option key={index} value={cat}>
                                                {cat}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">Cargando categorías...</option>
                                    )}
                                </select>
                            </div>

                            {/* Unidad de medida con TailwindCSS */}
                            <div>
                                <label className='labels'>Unidad de medida</label>
                                <select 
                                    id="unitOfMeasure" 
                                    value={unitOfMeasureSelected} 
                                    onChange={(e) => setUnitOfMeasureSelected(e.target.value)} 
                                    className="inputs block w-full mt-2 border-gray-300 rounded-md shadow-sm"
                                >
                                    {unitOfMeasure.length > 0 ? (
                                        unitOfMeasure.map((unit, index) => (
                                            <option key={index} value={unit}>
                                                {unit}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">Cargando unidades...</option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <label className='labels'>Cantidad</label>
                                <div className='relative flex items-center'>
                                    <input type="number" name='amount' className='inputs' value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='ingrese unidades de venta' min='0' required />
                                </div>
                            </div>
                            <div>
                                <label className='labels'>Precio</label>
                                <div className='relative flex items-center'>
                                    <input type="number" name='price' className='inputs' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='ingrese precio de venta' min='0' required />
                                </div>
                            </div>
                            <div>
                                <label className='labels'>Cantidad disponible en Inventario</label>
                                <div className='relative flex items-center'>
                                    <input type="number" name='stock' className='inputs' value={stock} onChange={(e) => setStock(e.target.value)} placeholder='ingrese cantidad en inventario' min='0' required />
                                </div>
                            </div>
                            <div className='!mt-8'>
                                <Button classes='btn-selling' id='submit-product' type='submit'>
                                    Publicar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default selling;
