//para crear un componente nuevo solo le ponen rafc y despues enter
import React, { useState, useEffect } from 'react';
import '../homeStyle.css';
import { auth, fs } from '../Config/Config'
import { Navbar } from './Navbar'
import { Products } from './Products'
import { IndividualFilteredProduct } from './IndividualFilteredProduct'


export const Home = (props) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  //esto es para aggarar el UID de firebase
  function GetUserUid(){
    const[uid, setUid]=useState(null);
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
          setUid(user.uid);
        }
      })
    },[])
    return uid;
  }
  const [showPopup, setShowPopup] = useState(false);

  const uid = GetUserUid();

  const [cart, setCart] = useState([]);

  //esto es para saber cual es el user actual
  function GetCurrentUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection('users').doc(user.uid).get().then(snapshot => {
                    const userData = snapshot.data();
                    if (userData) {
                        setUser(userData.FullName);
                    } else {
                        // Handle the case where the user data is not found
                        console.log('User data not found');
                    }
                });
            } else {
                setUser(null);
            }
        });
    }, []);

    return user;
}
  

  const user = GetCurrentUser();
  console.log(user);

  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);


  //funcion para get productos
  const getProducts = async()=>{
    const products = await fs.collection('Products').get(); // este get trae todos los productros que esten en la BD
    const productsArray=[];
    for(var snap of products.docs){
      var data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data
      })
      if(productsArray.length === products.docs.length){
        setProducts(productsArray);
      }
    }
  }

useEffect(()=>{
  getProducts();
},[])

let Product; // aqui creamos la variable global de productos 

//aqui estamos preguntando, si el user esta logado
//esto lo sabemos porque en la funcion de arriba le asignamos la variable uid al user 
    const addToCart = (product) => {
        if (uid !== null) {
            console.log(product);
            setCart(currentCart => [...currentCart, product]);
            Product=product;
            Product['qty']=1;
            //Product['totalProductPrice']=Product.qty*Product.price; 
           // Product['TotalProductPrice']=Product.price //ahora esto se esta calculando en Individual cart Product porque no pude encontrar como hacer que funcionara aqui jjajaj

            /* let productToAdd = {
              ...product,
              qty: 1,
              TotalProductPrice: product.price */ //estas son pruebas porque no se esta mostrando el TotalProducrPrce
            fs.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=>{
              console.log('el producto se anhadio bien - 200')
            })
        } else {
            // Redirect to login if not logged in
            props.history.push('/login');
        }
    };


    // esot renderiza las categorias usnando en tag de span, cuando ya tengamos que categoprias queremos tener las agregamos aqui 
    const [spans]=useState([
      {id: 'Deportes', text: 'Deportes'},
      {id: 'Estrategia', text: 'Estrategia'},
      {id: 'Accion', text: 'Accion'},
      {id: 'Arcade', text: 'Arcade'},
      {id: 'Aventura', text: 'Aventura'},
      {id: 'Horror', text: 'Horror'},
      {id: 'RPG', text: `RPG`},
      {id: 'Simulación', text: `Simulacion`},
      {id: 'Carreras', text: 'Carreras'},             
  ])

  // active class state
  const [active, setActive]=useState('');

  // category state
  const [category, setCategory]=useState('');

  // handle change ... it will set category and active states
  const handleChange=(individualSpan)=>{
      setActive(individualSpan.id);
      setCategory(individualSpan.text);
      filterFunction(individualSpan.text);
  }
  const handleAddToCartButtonClick = () => {
    addToCart(products[currentProductIndex]);
    window.alert('¡Producto añadido al carro!');
  };
  // filtered products state
  const [filteredProducts, setFilteredProducts]=useState([]);

  // filter function
  const filterFunction = (text)=>{
      if(products.length>1){
          const filter=products.filter((product)=>product.categoria===text);
          setFilteredProducts(filter);
      }
      else{
          console.log('no products to filter')
      } 
  }

  // return to all products
  const returntoAllProducts=()=>{
      setActive('');
      setCategory('');
      setFilteredProducts([]);
  }

  
  const changeProduct = (direction) => {
    if (direction === 'next') {
      setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length);
    } else if (direction === 'prev') {
      setCurrentProductIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    }
  };
  
  return (
    <>
    <Navbar user={user} />
    <br />
    <div className='container-fluid filter-products-main-box'>
      <div className='filter-box filtros'>
        <h6>Filter by category</h6>
        {spans.map((individualSpan, index) => (
          <span
            key={index}
            id={individualSpan.id}
            onClick={() => handleChange(individualSpan)}
            className={individualSpan.id === active ? active : 'deactive'}
          >
            {individualSpan.text}
          </span>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className='flex-container'>
          <div className='content-container'>
            <div className="gameTitle">
              <h2>{products[currentProductIndex]?.nombre}</h2>
            </div>
            <div className='flex'>
          <button className="BtnMove prev space1" onClick={() => changeProduct('prev')}>
            <img src="https://firebasestorage.googleapis.com/v0/b/projectofinalapps.appspot.com/o/product-images%2Fflecha_izquierda.png?alt=media&token=9796a230-1ab6-46b3-9da0-7830ca3cc5ef" alt="flecha-Izq" width="23px" height="35px" />
          </button> 
          <div className="box">
            <div className="imgJuegoZone">
              <img id="gameImage" src={products[currentProductIndex]?.url} alt="Game Image" />
            </div>
            <div className="descripcionJuego">
              <div className="imgLogoJuego">
                <img src={products[currentProductIndex]?.url2} alt="" />
              </div>
              <div className="descripcion">
                <p>{products[currentProductIndex]?.descripcion}</p>
              </div>
            </div>
          </div>
          <button className="BtnMove next space2" onClick={() => changeProduct('next')}>
            <img src="https://firebasestorage.googleapis.com/v0/b/projectofinalapps.appspot.com/o/product-images%2Fflecha_derecha.png?alt=media&token=a4aec213-a018-462b-84f9-60ccce68dac6" alt="Flecha-Der" width="23px" height="35px" />
          </button>
        </div>
        <div className="ZonaCompra">
          <div className="GameName">
            <h2>{products[currentProductIndex]?.nombre}</h2>
            <div className="BuyBox">
              <div className="Precio">
                <span>Tu precio:</span>
                <br />
                <span className="PrecioNumero">${products[currentProductIndex]?.precio}</span>
              </div>
              <div className="BtnCompra">
                <button className="btncom" onClick={handleAddToCartButtonClick}>Añadir al carro</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      )}

      {filteredProducts.length > 0 && (
        <div className='my-products'>
          <h1 className='text-center'>{category}</h1>
          <a href="javascript:void(0)" onClick={returntoAllProducts}>
            Return to All Products
          </a>
          <div className='products-box'>
            {filteredProducts.map((individualFilteredProduct) => (
              <div key={individualFilteredProduct.ID} className="filtered-product-box">
                <IndividualFilteredProduct
                  individualFilteredProduct={individualFilteredProduct}
                  addToCart={addToCart}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </>
);
         
};