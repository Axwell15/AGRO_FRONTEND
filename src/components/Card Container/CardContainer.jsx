import React, { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import { getFeed } from '../../helpers/feed';
import Card from "../card/card";
import Swal from 'sweetalert2'; // Importar SweetAlert2

const CardContainer = ({ hookNavigate, typeref }) => {
    const [products, setProducts] = useState([]);
    const [contextValue, setContextValue] = useOutletContext();

    useEffect(() => {
        getFeed(typeref, contextValue).then((res) => {
            res.products.reverse();
            setProducts(res.products);
        });
    }, [typeref, contextValue]);

    const openFiltersModal = () => {
        Swal.fire({
            title: 'Filtros Avanzados',
            html: `
        <div class="space-y-4">
          <!-- Filtros por variedad de grano -->
          <div>
            <label for="variety" class="block">Variedad de Grano</label>
            <select id="variety" class="w-full border p-2">
              <option value="arabica">Arabica</option>
              <option value="robusta">Robusta</option>
            </select>
          </div>

          <!-- Filtros por calidad -->
          <div>
            <label for="quality" class="block">Calidad</label>
            <select id="quality" class="w-full border p-2">
              <option value="organico">Orgánico</option>
              <option value="convencional">Convencional</option>
            </select>
          </div>

          <!-- Filtros por año de cosecha -->
          <div>
            <label for="year" class="block">Año de Cosecha</label>
            <input type="number" id="year" class="w-full border p-2" />
          </div>

          <!-- Filtros por método de producción -->
          <div>
            <label for="method" class="block">Método de Producción</label>
            <select id="method" class="w-full border p-2">
              <option value="natural">Natural</option>
              <option value="lavado">Lavado</option>
              <option value="honey">Honey</option>
            </select>
          </div>

          <!-- Filtro de rango de precio -->
          <div>
            <label for="price" class="block">Rango de Precio</label>
            <input type="range" id="price" min="0" max="1000" step="10" class="w-full" />
            <div class="flex justify-between">
              <span>$0</span>
              <span>$1000</span>
            </div>
          </div>
        </div>
      `,
            showCancelButton: true,
            confirmButtonText: 'Aplicar Filtros',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                // Aquí se pueden capturar los valores de los filtros y pasarlos para aplicar
                const variety = document.getElementById('variety').value;
                const quality = document.getElementById('quality').value;
                const year = document.getElementById('year').value;
                const method = document.getElementById('method').value;
                const price = document.getElementById('price').value;

                // Aquí podrías manejar el filtrado de los productos según los valores seleccionados
                console.log({ variety, quality, year, method, price });

                // Simular la aplicación de filtros
                Swal.fire({
                    title: 'Filtros aplicados',
                    text: `Variedad: ${variety}, Calidad: ${quality}, Año: ${year}, Método: ${method}, Precio: ${price}`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });
            },
        });
    };

    return (
        <div className="font-[Inter] bg-gray-100 max-h-[calc(100vh-50px)] overflow-y-auto">
            <div className='p-4 mx-auto lg:max-w-7xl sm:max-w-full'>
                <h2 className='text-4xl font-extrabold text-gray-800 mb-12'>Productos a la venta</h2>

                {/* Botón para abrir el modal de filtros */}
                <button
                    className="px-4 py-2.5 bg-primary-color hover:bg-primary-color text-white rounded-md"
                    onClick={openFiltersModal}
                >
                    Filtros Avanzados
                </button>

                {/* Grid de productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6 mt-6">
                    {products?.map((product) => (
                        <Card card={product} key={product._id} owner={typeref === 'user'} hookNavigate={hookNavigate} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardContainer;
