//para crear un componente nuevo solo le ponen rafc y despues enter
import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import logo from '../images/logo.jpg'
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import { auth } from '../Config/Config'
import {useHistory} from 'react-router-dom'
import '../LogoStyle.css';
export const Navbar = ({user}) => {

  const history = useHistory();

  const handleLogout=()=>{
    auth.signOut().then(()=>{
      history.push('/login');
    })
  }

  return (
    <div className='navbar'>
      <div className='leftside'>
        <div className='logo'>
          <a href='/'>
            <img src='https://firebasestorage.googleapis.com/v0/b/projectofinalapps.appspot.com/o/product-images%2FimaegneEzquina.gif?alt=media&token=ce2951be-b3f9-4c55-b639-c055c2f4d622' alt='logo' width='100' />
          </a>
        </div>
      </div>
      <div className='rightside'>
        {!user && (
          <>
            <div><Link className='navlink' to='signup'>Sign Up</Link></div>
            <div><Link className='navlink' to='login'>Log In</Link></div>
          </>
        )}

        {user && (
          <>
            <div className='user-profile'>
              {/* Aquí debes reemplazar la URL con la ruta correcta de la imagen del usuario */}
              <img src='https://firebasestorage.googleapis.com/v0/b/projectofinalapps.appspot.com/o/product-images%2Fuser.png?alt=media&token=3c030ef1-60e4-49d4-a986-17e352a97ffa' alt='user-avatar' width='30' height='30' />
            </div>

            <div className='cart-menu-btn'>
              <Link className='navlink' to="cart">
                <Icon icon={shoppingCart} size={20} />
              </Link>
              {/*  <span className='cart-indicator'>{totalQty}</span>*/}
            </div>

            <div className='logout-btn' onClick={handleLogout}>Logout</div>
          </>
        )}
      </div>
    </div>
  );
};