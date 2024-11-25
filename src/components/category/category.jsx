import React from 'react'
import './category.style.css';

const category = ({ category, hookNavigate, context }) => {
    const [contextValue, setContextValue] = context;
    const navigate = hookNavigate();
    return (
        <article className='card-category' onClick={() => {
            setContextValue(category._id);
            navigate(`/home/categoryproducts`);
        }}>
            <figure className='image-container'>
                <img className='category-image' src={category.image} alt="img" />
            </figure>
            <h3 className='category-title'>{category.name}</h3>
        </article>
    )
}

export default category