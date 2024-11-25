import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { tokenRefresh } from "../../helpers/tokenRefresh";
import { useNavigate } from "react-router-dom";

// Function to get the token
const getToken = async () => {
  const restoken = await tokenRefresh();
  return restoken ? restoken : localStorage.getItem("token");
};

// Show a progress modal with a 10-second wait time
const showProgressModal = () =>
  new Promise((resolve) => {
    let currentStep = 0;
    const steps = [
      "Estamos preparando tu pedido...",
      "Su pedido está en camino...",
      "El pedido ha sido entregado.",
    ];

    Swal.fire({
      title: "Procesando...",
      html: `
        <div class="progress-container">
          <div class="progress-bar" id="progress-bar"></div>
          <div id="progress-message" class="mt-4 text-lg font-bold"></div>
        </div>
      `,
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        const progressBar =
          Swal.getHtmlContainer().querySelector("#progress-bar");
        const progressMessage =
          Swal.getHtmlContainer().querySelector("#progress-message");

        progressBar.style.width = "0%";
        progressBar.style.height = "10px";
        progressBar.style.backgroundColor = "#4caf50";

        const interval = setInterval(() => {
          currentStep++;
          progressBar.style.width = `${(currentStep / 10) * 100}%`;
          if (currentStep % 3 === 1) {
            progressMessage.textContent = steps[Math.floor(currentStep / 3)];
          }

          if (currentStep === 10) {
            clearInterval(interval);
            resolve();
            Swal.close();
          }
        }, 1000);
      },
    });
  });

// Handle the checkout process
const handleCheckout = async (setCart, navigate) => {
  try {
    const token = await getToken();

    const response = await fetch(
      `${import.meta.env.VITE_AGRO_API}transactions/cart/checkout`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const checkoutData = await response.json(); // Assuming this contains product details
      const products = checkoutData.products || []; // Extract products from the response

      await showProgressModal(); // Show progress bar
      await showRatingModal(products); // Pass the products to the modal
      setCart(null); // Clear the cart
      setTimeout(() => {
        navigate("/home"); // Navigate to home
      }, 500);
    } else {
      Swal.fire({
        title: "¡Error!",
        text: "Hubo un problema al procesar el pago. Intenta nuevamente.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "¡Error!",
      text: "Hubo un error al realizar la operación. Intenta nuevamente.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    console.error("Error en el checkout:", error);
  }
};

// Show a rating modal with stars
const showRatingModal = (cartDetails) =>
  new Promise((resolve, reject) => {
    let selectedRating = 0; // The single rating to apply to all products

    Swal.fire({
      title: '¡Gracias por tu compra!',
      html: `
        <div>
          <h3 class="text-lg font-bold mb-4">¿Qué te pareció tu experiencia?</h3>
          <div id="star-rating" class="flex justify-center gap-2 mb-4">
            ${[1, 2, 3, 4, 5]
              .map(
                (i) => `
                  <svg id="star-${i}" class="star w-8 h-8 cursor-pointer text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                `
              )
              .join('')}
          </div>
        </div>
      `,
      showCancelButton: false,
      confirmButtonText: 'Enviar',
      didOpen: () => {
        const stars = Array.from(document.getElementsByClassName('star'));

        stars.forEach((star, index) => {
          star.addEventListener('click', () => {
            selectedRating = index + 1; // Update the selected rating
            stars.forEach((s, i) => {
              s.classList.toggle('text-yellow-500', i < selectedRating);
              s.classList.toggle('text-gray-300', i >= selectedRating);
            });
          });
        });
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (selectedRating === 0) {
          Swal.fire('Calificación requerida', 'Por favor selecciona una calificación antes de enviar.', 'error');
          reject(new Error('Rating not selected'));
          return;
        }

        // Build the payload only if selectedRating is valid
        const ratings = cartDetails.map((item) => {
          return {
            productId: item.productId,
            rating: selectedRating,
          };
        });

        // Send the ratings to the backend
        const token = await getToken();

        fetch(`${import.meta.env.VITE_AGRO_API}products/rate`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ratings }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to send ratings');
            }
            return response.json();
          })
          .then((data) => {
            resolve(data); // Resolve with server response
          })
          .catch((error) => {
            console.error('Error sending ratings:', error);
            reject(error);
          });
      }
    });
  });

export const Cart = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate(); // Use the useNavigate hook to navigate to other routes

  // Fetch cart information from the API with token
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = await getToken();
        const response = await fetch(
          `${import.meta.env.VITE_AGRO_API}transactions/cart`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener el carrito");
        }

        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, []);

  if (!cart) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="font-[Inter] md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
          <h2 className="text-2xl font-bold text-gray-800">Carrito</h2>
          <hr className="border-gray-300 mt-4 mb-8" />

          <div className="space-y-4">
            {cart.cartDetails.map((item) => (
              <div
                key={item.productId}
                className="grid grid-cols-3 items-center gap-4"
              >
                <div className="col-span-2 flex items-center gap-4">
                  <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                    <img
                      src={item.image}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-800">
                      {item.name}
                    </h3>
                    <h4 className="text-base font-bold text-gray-800">
                      Cantidad: {item.quantity}
                    </h4>
                  </div>
                </div>
                <div className="ml-auto">
                  <h4 className="text-base font-bold text-gray-800">
                    ${item.price}
                  </h4>
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-8">
              <span className="text-base font-bold">Total</span>
              <span className="text-base font-bold">${cart.totalPrice}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
          <ul className="text-gray-800 mt-8 space-y-4">
            <li className="flex flex-wrap gap-4 text-base">
              Envio <span className="ml-auto font-bold">$2.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base font-bold">
              Total <span className="ml-auto">${(cart.totalPrice || 0) + 2}</span>
            </li>
          </ul>

          <div className="mt-8 space-y-2">
            <button
              type="button"
              onClick={() => handleCheckout(setCart, navigate)} // Pass navigate to the handleCheckout function
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Comprar
            </button>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <img
                src="https://readymadeui.com/images/master.webp"
                alt="card1"
                className="w-10 object-contain"
              />
              <img
                src="https://readymadeui.com/images/visa.webp"
                alt="card2"
                className="w-10 object-contain"
              />
              <img
                src="https://readymadeui.com/images/american-express.webp"
                alt="card3"
                className="w-10 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
