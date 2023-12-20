import React from 'react';
import '../index.css'

export const CartProducts =  ({
    cartProduct,
  cartProductIncrease,
  cartProductDecrease,
}) => {
  // Verificar si cartProduct tiene un valor
  if (!cartProduct) {
    return null;
  }

  return (
    <div className='individual-cart-product'>
      <img src={cartProduct.url} alt={cartProduct.nombre} className='product-image' />
      <div className='product-details'>
        <h3>{cartProduct.nombre}</h3>
        <p>Precio: ${cartProduct.precio}</p>
      </div>
      <div className='product-quantity'>
        <button onClick={cartProductDecrease}>-</button>
        <span>{cartProduct.qty}</span>
        <button onClick={cartProductIncrease}>+</button>
      </div>
    </div>
  );
};