import './dragNdrop.css';
import { HandleDrop, handleDragOver,sendFile } from '../../helpers/dragNdrop'
import { useRef, useState } from 'react';
const dragDropfile = () => {
    const [File, setFile] = useState(null);
    const inputRef = useRef();
    return (
        <div className='dnd-container'>
            <div className="dragndrop" onDragOver={handleDragOver} onDrop={async (e) =>{
                e.preventDefault();
                const img = await HandleDrop(e);
                setFile(img);
            }}>
                <h3 className='dnd-title'>{File?.name || 'arrastra la imagen'}</h3>
                <span className='dnd-span'>{File ? '': 'o'}</span>
                <input type="file" name="" id="search-file" accept='image/*' hidden ref={inputRef} onChange={async (e)=>{
                    e.preventDefault();
                    const img = await HandleDrop(e);
                    setFile(img);
                }}/>
                <button className='dnd-btn' type='button' onClick={() => {File ? sendFile(File) : inputRef.current.click()}}>{File ? 'actualizar foto' : 'buscar imagen'}</button>
            </div>
        </div>
    );
};

export default dragDropfile;