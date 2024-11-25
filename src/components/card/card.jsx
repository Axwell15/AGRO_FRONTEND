import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './card.style.css';
import {deleteProduct} from '../../helpers/card'
import Swal from  'sweetalert2';

//✅
const card = ({ hookNavigate, owner, card, ...props }) => {
    const [product, setProduct] = useOutletContext();
  const navigate = hookNavigate();
  return (
    <article className='card' {...props}>
      <div className='w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4'>
        <img src={card.image} alt="img" className='card-image' onClick={() => {
          owner ? setProduct(card) : setProduct(null);
          owner ? navigate('/home/update-product') : navigate(`/home/item/${card._id}`)}} />
      </div>
      <div>
        <h3 className='card-title'>{card.name}</h3>
        <p className='text-gray-600 text-sm mt-2'>{card.category?.name}</p>
        <p className='text-lg text-gray-800 font-bold mt-4'>${card.price}</p>
      </div>
      <button className={`btn-del ${!owner && 'hidden'}`} onClick={async () => {
        const res = await deleteProduct(card)
        if(res){
          const res = await Swal.fire({
            title: 'Producto eliminado',
            icon: 'success',
            confirmButtonText: 'Ok'
          })

          if(res.isConfirmed){
            navigate('/home');
          }
        }
      }}>eliminar</button>
    </article>
  )
}

export default card