import React from 'react';

export const IndividualProduct = ({ url, nombre, descripcion, precio, addToCart }) => {
    console.log(url, nombre, descripcion, precio);

    return (
        <div className='product'>            
            <div className='product-img'>
                <img src={url} alt='product-img'/>
            </div>
            <div className='product-text title'>{nombre}</div>
            <div className='product-text description'>{descripcion}</div>
            <div className='product-text price'>{precio}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={() => addToCart({ url, nombre, descripcion, precio })}>ADD TO CART</div>
        </div>
    );
}