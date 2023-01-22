import React, { useEffect, useState } from 'react'
import './styles.css'

export const BoxPokemon = ({name, link, remove})=>{
    const [image, setImage] = useState('');

    useEffect(()=>{
        fetch(link).then(response => response.json()).then(r => setImage(r.sprites.front_default))
    }, [])

    return(
        <div className='box-card'>
            <h3>{name}</h3>
            <img src={image} width='150px' height='150px'/>
            <button onClick={()=>remove(name)}>Remover</button>
        </div>
    );
}