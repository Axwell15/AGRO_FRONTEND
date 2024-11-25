import './pView.style.css';
import {useState, useEffect} from 'react';
import {getProduct, buyproduct} from '../../helpers/pView';

const productView = ({ ...props }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProduct().then((res) => {
      setProduct(res.product);
    });
  }, []);

  return (
    <div {...props}>
      <div className="p-4 lg:max-w-5xl max-w-lg mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
          {/* Product Image */}
          <div className="w-full lg:sticky top-0 sm:flex gap-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-4/5 rounded-md object-cover"
            />
          </div>
          {/* Product Details */}
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
            <div className="flex space-x-2 mt-4">
              {/* Star Rating Section */}
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 ${
                    i < product.averageRating ? "fill-blue-600" : "fill-[#CED5D8]"
                  }`}
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              ))}
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
            {/* Additional Information */}
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

export default productView;