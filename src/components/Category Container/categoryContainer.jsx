import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import './categoryContainer.style.css'
import Category from '../category/category'
import { getCategories } from '../../helpers/category';

const categoryContainer = ({ hookNavigate }) => {
  const [category, setCategory] = useState([]);
  const [context, setContext] = useOutletContext();
  useEffect(() => {
    getCategories().then((res) => {
      setCategory(res);
    });
  }, []);
  return (
    <div className='category-container'>
      {category.map((cat) => (
        <Category key={cat._id} category={cat} hookNavigate={hookNavigate} context={[context, setContext]} />
      ))}
    </div>
  )
}

export default categoryContainer