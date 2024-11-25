import { createBrowserRouter, useNavigate } from 'react-router-dom';
//#region Login page
import UserForms from '../pages/UserForms/UserForms';
import Login from '../components/login/login';
import Register from '../components/register/register';
//#endregion
//#region Main page
import App from '../pages/main/App';
import CardContainer from "../components/Card Container/CardContainer";
import Pview from "../components/pView/pView";
import Selling from "../components/selling/selling";
import Profile from "../components/profile view/profile_view";
import Credits from '../components/credits/credits';
import CategoryContaniner from '../components/Category Container/categoryContainer.jsx'
//#endregion
import Error from '../pages/error/error';
import { Cart } from '../components/Cart/Cart.jsx';

const createRoutes = createBrowserRouter([
  {
    path: '/',
    element: <UserForms />,
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <Login hookNavigate={useNavigate} />,
        id: 'login',
      },
      {
        path: 'register',
        element: <Register hookNavigate={useNavigate} />,
        id: 'register',
      }
    ]
  },
  {
    path: '/home',
    element: <App hookNavigate={useNavigate} />,
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <CardContainer hookNavigate={useNavigate} typeref='home' />,
        id: 'cardContainer',
      },
      {
        path: 'myproducts',
        element: <CardContainer hookNavigate={useNavigate} typeref='user' />,
        id: 'myProducts',
      },
      {
        path: 'categoryproducts',
        element: <CardContainer hookNavigate={useNavigate} typeref='category' />,
        id: 'categoryProducts',
      },
      {
        path: 'item/:id',
        element: <Pview />,
        id: 'pview',
      },
      {
        path: 'profile',
        element: <Profile />,
        id: 'profile',
      },
      {
        path: 'sell',
        element: <Selling />,
        id: 'sell',
      },
      {
        path: 'update-product',
        element: <Selling />,
        id: 'update-product',
      },
      {
        path: 'category',
        element: <CategoryContaniner hookNavigate={useNavigate} />,
        id: 'category',
      },
      {
        path: 'credit',
        element: <Credits />,
        id: 'credit',
      },
      {
        path: 'cart',
        element: <Cart />,
        id: 'cart'
      }
    ]
  }
]);

export const Routes = createRoutes;