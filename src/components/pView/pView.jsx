import './pView.style.css';
import { useState, useEffect } from 'react';
import { getProduct, buyproduct } from '../../helpers/pView';
import { FaStar } from 'react-icons/fa';

const ProductView = ({ ...props }) => {
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState(0); // Estado para la calificación seleccionada
  const [hover, setHover] = useState(0); // Estado para manejar el hover sobre las estrellas

  useEffect(() => {
    getProduct().then((res) => {
      setProduct(res.product);
    });
  }, []);

  const handleRatingChange = (newRating) => {
    setRating(newRating); // Actualiza la calificación seleccionada
  };

  return (
    <div {...props}>
      <div className="p-4 lg:max-w-5xl max-w-lg mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
          {/* Imagen del producto */}
          <div className="w-full lg:sticky top-0 sm:flex gap-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-4/5 rounded-md object-cover"
            />
          </div>
          {/* Detalles del producto */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-gray-800 text-xl font-bold">${product.price}</p>
            </div>
            <p className="text-gray-800 text-xl font-bold">
              {product.category?.name || "Categoría no especificada"}
            </p>
            <p className="text-gray-800 text-xl font-bold">
              {product.measureUnit?.name || "Unidad no especificada"}
            </p>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">Calificación:</h3>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer ${
                      (hover || rating) >= star ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                    onClick={() => handleRatingChange(star)} // Selecciona calificación
                    onMouseEnter={() => setHover(star)} // Maneja hover
                    onMouseLeave={() => setHover(0)} // Limpia el hover
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Selecciona una calificación para el producto.
              </p>
            </div>
            <button
              className="w-full mt-8 px-6 py-3 bg-primary-color hover:bg-primary-alt text-white text-sm font-semibold rounded-md"
              onClick={() => buyproduct(product)}
            >
              Agregar al carrito
            </button>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">Acerca del producto:</h3>
              <p className="text-gray-800">{product.description}</p>
            </div>
            {/* Información adicional */}
            <div className="mt-4 space-y-2">
              <p className="text-gray-800">
                <strong>Variedad de grano:</strong> {product.grainVariety || "N/A"}
              </p>
              <p className="text-gray-800">
                <strong>Calidad:</strong> {product.quality || "N/A"}
              </p>
              <p className="text-gray-800">
                <strong>Año de cosecha:</strong> {product.harvestYear || "N/A"}
              </p>
              <p className="text-gray-800">
                <strong>Métodos de producción:</strong> {product.productionMethods || "N/A"}
              </p>
              <p className="text-gray-800">
                <strong>Stock disponible:</strong> {product.stock || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
