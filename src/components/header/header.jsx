import { useState, memo } from "react";
import "./header.style.css";

export const navBarOptions = [
  {
    Name: "Mis productos",
    id: "myproducts",
  },
  {
    Name: "Vender",
    id: "sell",
  },
  {
    Name: "Creditos",
    id: "credit",
  },
];

const Header = ({ Hook, Value, hookNavigate }) => {
  const navigate = hookNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(true); // Estado para el menú colapsable

  // Función para manejar el cambio de estado del menú
  const handleClick = () => {
    setIsMenuOpen((prevState) => !prevState); // Cambia el estado de apertura/cierre
  };

  return (
    <header className="header">
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <h1 className="headerTitle" onClick={() => navigate("/home")}>
          AGROMARKET
        </h1>
        <div
          id="collapseMenu"
          className={`${
            isMenuOpen
              ? "block" // Si el menú está abierto
              : "hidden" // Si el menú está cerrado
          } max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50`}
        >
          <button
            id="toggleClose"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            onClick={handleClick} // Cerramos el menú al hacer click
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </button>
          <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            {navBarOptions?.map((option) => {
              return (
                <li
                  className="max-lg:border-b max-lg:py-3 px-3"
                  key={option.id}
                >
                  <button
                    onClick={() => navigate(`/home/${option.id}`)}
                    className="text-white font-bold block text-base"
                  >
                    {option.Name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center max-lg:ml-auto space-x-5">
          <button onClick={() => navigate("/home/profile")}>
            <svg
              className="cursor-pointer inline"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                opacity="0.5"
                cx="12"
                cy="9"
                r="3"
                stroke="#fff"
                strokeWidth="1.5"
              />
              <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="1.5" />
              <path
                opacity="0.5"
                d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button onClick={() => navigate("/home/cart")}>
            <svg
              className="cursor-pointer inline"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.86376 16.4552C3.00581 13.0234 2.57684 11.3075 3.47767 10.1538C4.3785 9 6.14721 9 9.68462 9H14.3153C17.8527 9 19.6214 9 20.5222 10.1538C21.4231 11.3075 20.9941 13.0234 20.1362 16.4552C19.5905 18.6379 19.3176 19.7292 18.5039 20.3646C17.6901 21 16.5652 21 14.3153 21H9.68462C7.43476 21 6.30983 21 5.49605 20.3646C4.68227 19.7292 4.40943 18.6379 3.86376 16.4552Z"
                stroke="#fff"
                strokeWidth="1.5"
              />
              <path
                opacity="0.5"
                d="M19.5 9.5L18.7896 6.89465C18.5157 5.89005 18.3787 5.38775 18.0978 5.00946C17.818 4.63273 17.4378 4.34234 17.0008 4.17152C16.5619 4 16.0413 4 15 4M4.5 9.5L5.2104 6.89465C5.48432 5.89005 5.62128 5.38775 5.90221 5.00946C6.18199 4.63273 6.56216 4.34234 6.99922 4.17152C7.43808 4 7.95872 4 9 4"
                stroke="#fff"
                strokeWidth="1.5"
              />
              <path
                d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4Z"
                stroke="#fff"
                strokeWidth="1.5"
              />
              <path
                opacity="0.5"
                d="M4.5 18L12 9M19.5 18L12.5 9.5M4.5 10L12 21L19.5 10"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            id="toggleOpen"
            className="lg:hidden !ml-7"
            onClick={handleClick}
          >
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent default button behavior
              fetch("/logout", {
                method: "GET",
                credentials: "include", // Include cookies in the request
              })
                .then((response) => {
                  if (response.ok) {
                    // Perform any additional logout logic here if needed
                    navigate("/");
                  } else {
                    console.error("Logout failed");
                  }
                })
                .catch((error) => {
                  console.error("Error during logout:", error);
                });
            }}
          >
            <svg
              className="cursor-pointer inline"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 17L21 12L16 7"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12H9"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3 3 5 3H12"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
