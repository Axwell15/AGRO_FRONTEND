import './profile_view.css';
import {useState, useEffect} from 'react';
import Profile from '../profile/profile';
import DragNDrop from '../drag n drop/dragndrop';
import ModData from '../modData/modData';
import ModPass from '../modPassword/modPassword';

const formToRender = (form) => {
  switch(form){
    case 'data':
      return <ModData />
    case 'pass':
      return <ModPass />
    case 'picture':
      return <DragNDrop />
    default:
      return
  }
}


const profile_view = () => {
  const [form , setForm] = useState(null);
  useEffect(() => {
    formToRender(form);
  },[form]);
  return (
    <div className='profile-view'>
        <Profile hook={[form, setForm]} />
        {formToRender(form)}
    </div>
  )
};

export default profile_view;