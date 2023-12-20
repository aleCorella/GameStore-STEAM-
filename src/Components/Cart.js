import React,{useState, useEffect} from 'react'
import {Navbar} from './Navbar'
import {auth,fs} from '../Config/Config'
import { CartProducts } from './CartProducts';
import StripeCheckout from 'react-stripe-checkout';
import { Link } from 'react-router-dom';
import '../LoginStyle.css'

export const Cart = () => {
    const [user, setUser] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                const cartRef = fs.collection('Cart ' + user.uid);

                const unsubscribeCart = cartRef.onSnapshot(snapshot => {
                    const newCartProduct = snapshot.docs.map(doc => ({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);
                });

                return () => unsubscribeCart();
            } else {
                setUser(null);
                setCartProducts([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const cartProductsRemove = (productId) => {
        setCartProducts(currentProducts => {
            const updatedProducts = currentProducts.filter(product => product.ID !== productId);

            auth.onAuthStateChanged(user => {
                if (user) {
                    fs.collection('Cart ' + user.uid)
                        .doc(productId)
                        .delete()
                        .then(() => console.log('Product removed'))
                        .catch(error => console.error('Error removing product:', error));
                } else {
                    console.log('User is not logged in to remove product');
                }
            });

            return updatedProducts;
        });
    };

    const cartProductsIncrease = (productId) => {
        setCartProducts(currentProducts => {
            return currentProducts.map(product => {
                if (product.ID === productId) {
                    const updatedProduct = {
                        ...product,
                        qty: product.qty + 1,
                        TotalProductPrice: (product.qty + 1) * product.price,
                    };

                    auth.onAuthStateChanged(user => {
                        if (user) {
                            fs.collection('Cart ' + user.uid)
                                .doc(productId)
                                .update(updatedProduct)
                                .then(() => console.log('Increment added'))
                                .catch(error => console.error('Error incrementing product:', error));
                        } else {
                            console.log('User is not logged in to increment');
                        }
                    });

                    return updatedProduct;
                } else {
                    return product;
                }
            });
        });
    };

    const cartProductsAdd = (productId) => {
        setCartProducts(currentProducts => {
            return currentProducts.map(product => {
                if (product.ID === productId) {
                    const updatedProduct = {
                        ...product,
                        qty: product.qty + 1,
                        TotalProductPrice: (product.qty + 1) * product.precio,
                    };

                    auth.onAuthStateChanged(user => {
                        if (user) {
                            fs.collection('Cart ' + user.uid)
                                .doc(productId)
                                .update(updatedProduct)
                                .then(() => console.log('Increment added'))
                                .catch(error => console.error('Error incrementing product:', error));
                        } else {
                            console.log('User is not logged in to increment');
                        }
                    });

                    return updatedProduct;
                } else {
                    return product;
                }
            });
        });
    };
    // console.log(cartProducts);

    //variable global producto
    let Product;   

    //funcion para subir el el qty de productos en el carrito  
     /* const cartProductsIncrease=(cartProducts)=> {
        //console.log(cartProducts);
        Product = cartProducts
        Product.qty = Product.qty + 1;
         auth.onAuthStateChanged(user =>{
            if(user){
                fs.collection('Cart ' + user.uid).doc(cartProducts.ID).update(Product).then(()=>{
                    console.log('se anhadio el incremento!!');
                })
            }else{
                console.log('El usuario no esta logeado para subir la cantidad de productos ');
            }
         })
    } */ 

   /*  const cartProductsIncrease = (cartProduct) => {
        // Create a new product object to avoid mutating the original cartProduct
        const updatedProduct = { ...cartProduct, qty: cartProduct.qty + 1 };
        updatedProduct.TotalProductPrice = updatedProduct.qty * updatedProduct.price;

        // Update the local state
        setCartProducts(currentProducts => {
            return currentProducts.map(product => 
                product.ID === cartProduct.ID ? updatedProduct : product
            );
        });

        // Update Firestore
        if (user) {
            fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(updatedProduct).then(() => {
                console.log('Increment added');
            }).catch(error => {
                console.error('Error incrementing product:', error);
            });
        } else {
            console.log('User is not logged in to increment');
        }
    }; */

    /*const cartProductsDecrease = (productId) => {
        setCartProducts(currentProducts => {
            return currentProducts.map(product => {
                if (product.ID === productId) {
                    const updatedQty = product.qty - 1;
                    return { 
                        ...product, 
                        qty: updatedQty, 
                        TotalProductPrice: updatedQty * product.price 
                    };
                }
                return product;
            });
        });
    }; */

   /* const cartProductsDecrease =(cartProduct)=>{
        Product=cartProduct;
        if(Product.qty > 1){
            Product.qty=Product.qty-1;
            Product.TotalProductPrice=Product.qty*Product.price;
             // updating in database
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                        console.log('decrement');
                    })
                }
                else{
                    console.log('user is not logged in to decrement');
                }
            })
        }
    } */

   
    
    const cartProductsDecrease = (productId) => {
        setCartProducts(currentProducts => {
            return currentProducts.map(product => {
                if (product.ID === productId) {
                    const updatedProduct = {
                        ...product,
                        qty: Math.max(product.qty - 1, 1), // Ensure quantity doesn't go below 1
                        TotalProductPrice: Math.max(product.qty - 1, 1) * product.price,
                    };

                    auth.onAuthStateChanged(user => {
                        if (user) {
                            fs.collection('Cart ' + user.uid)
                                .doc(productId)
                                .update(updatedProduct)
                                .then(() => console.log('Decrement added'))
                                .catch(error => console.error('Error decrementing product:', error));
                        } else {
                            console.log('User is not logged in to decrement');
                        }
                    });

                    return updatedProduct;
                } else {
                    return product;
                }
            });
        });
    };

    const calculateTotalPrice = () => {
        return cartProducts.reduce((total, product) => total + product.TotalProductPrice, 0);
    };
    
    console.log('User UID:', user?.uid);

     return (
        <>
            <Navbar user={user} />
            <br />
            {cartProducts.length > 0 ? (
                <div className='container-fluid'>
                    <h1 className='text-center'>Cart</h1>
                    <div className='products-box'>
                        {cartProducts.map(cartProduct => (
                            <div key={cartProduct.ID} className='individual-cart-product'>
                                <img src={cartProduct.url} alt={cartProduct.nombre} className='product-image' />
                                <div className='product-details'>
                                    <h3>{cartProduct.nombre}</h3>
                                    <p>Precio: ${cartProduct.precio}</p>
                                </div>
                                <div className='product-quantity'>
                                    <button onClick={() => cartProductsDecrease(cartProduct.ID)}>-</button>
                                    <span>{cartProduct.qty}</span>
                                    <button onClick={() => cartProductsIncrease(cartProduct.ID)}>+</button>
                                    <button onClick={() => cartProductsAdd(cartProduct.ID)}>Añadir</button>
                                    <button onClick={() => cartProductsRemove(cartProduct.ID)}>Eliminar</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='summary-box'>
                        <h5>Cart Summary</h5>
                        <br />
                        <div>
                            Numero Total de Productos: <span>{cartProducts.length}</span>
                        </div>
                        <div>
                            Total a pagar: <span>${calculateTotalPrice()}</span>
                        </div>
                        <br />
                        <button className='buttonBuy'>
                            <Link to='/checkout' style={{ textDecoration: 'none', color: 'inherit' }}>
                                BUY IT
                            </Link>
                        </button>
                    </div>
                </div>
            ) : (
                <div className='container-fluid'>No products to show</div>
            )}
        </>
    );
        
}