import React from 'react'
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import {auth,fs} from '../Config/Config'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'


export const IndividualCartProduct = ({cartProduct, cartProductIncrease, cartProductDecrease}) => {
    console.log(cartProduct);
    const totalProductPrice = cartProduct.price * cartProduct.qty;


    const handleCartProductIncrease = () =>{
        cartProductIncrease(cartProduct);
    }

    const handleCartProductDecrease = () =>{
        cartProductDecrease(cartProduct);
    }


    const HandleCartProductDelete = () => {
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection('Cart ' + user.uid).doc(cartProduct.ID).delete().then(() => {
                    console.log("El Producto se borró correctamente - 200");
                }).catch(error => {
                    console.log("Error al borrar el producto:", error);
                });
            }
        });
    };
    
    
    return (
        <div className='product'>
          <div className='product-img'>
            <img src={cartProduct.url} alt="product-img" />
          </div>
          <div className='product-text title'>{cartProduct.nombre}</div>
          <div className='product-text description'>{cartProduct.descripcion}</div>
          <div className='product-text price'>$ {cartProduct.precio}</div>
          <span>Quantity</span>
          <div className='product-text quantity-box'>
            <div className='action-btns minus' onClick={handleCartProductDecrease}>
              <Icon icon={minus} size={20} />
            </div>
            <div>{cartProduct.qty}</div>
            <div className='action-btns plus' onClick={handleCartProductIncrease}>
              <Icon icon={plus} size={20} />
            </div>
            <div className='product-text cart-price'>
                $ {totalProductPrice ?? 'Calculating...'}
            </div>
            <div className='btn btn-danger btn-md cart-btn' onClick={HandleCartProductDelete}>DELETE</div>            
          </div>
          <div className='product-text cart-price'>
            $ {totalProductPrice ?? 'Calculating...'}
          </div>
          <div className='btn btn-danger btn-md cart-btn'>DELETE</div>
    
          <div className='cart-purchase-btn'>
            <Link className='navlink' to="/checkout">
              <button>comprar para mí</button>
            </Link>
          </div>
        </div>
      );
    };