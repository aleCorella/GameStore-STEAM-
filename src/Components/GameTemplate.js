import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../GameTemplate.css';

export const GameComponent = (props) => {
    const images = [
      "../img/mario.jpg",
      "../img/steam_logo.webp",
      "../img/CYBER.jpg"
    ];
  
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    const changeImage = (direction) => {
      let newIndex;
  
      if (direction === 'next') {
        newIndex = (currentImageIndex + 1) % images.length;
      } else if (direction === 'prev') {
        newIndex = (currentImageIndex - 1 + images.length) % images.length;
      }
  
      setCurrentImageIndex(newIndex);
    };
  
    return (
      <div>
        <header>
          <div className="logo">
            <a href="#" className="logo">
              <img src="../img/steam_logo.webp" alt="Steam_Logo" className="logo-img" />
            </a>
          </div>
          <nav>
            <div className="info-General">
              <a href="https://store.steampowered.com/?l=spanish" className="info-Individual">TIENDA</a>
              <a href="https://store.steampowered.com/?l=spanish" className="info-Individual">COMUNIDAD</a>
              <a href="https://store.steampowered.com/?l=spanish" className="nav-link info-Individual">ACERCA DE</a>
              <a href="https://store.steampowered.com/?l=spanish" className="nav-link info-Individual">SOPORTE</a>
            </div>
            <div className="general_action_menu">
              <a className="btn_install install" href="#">Instalar Steam</a>
              <a className="btn_install" href="#">Inicio Sesión</a>
              <a className="btn_install" href="#">Idioma</a>
            </div>
          </nav>
        </header>
  
        <nav className="navbar navbar-inverse">
          {/* Contenido de la segunda barra de navegación */}
        </nav>
  
        <div className="gameTitle">
          <h2>Name of the Game</h2>
        </div>
  
        <div className="flex">
          <div className="espacio">
            <button className="BtnMove prev space1" onClick={() => changeImage('prev')}>
              <img src="../Img/flecha_izquierda.png" alt="flecha-Izq" width="23px" height="35px" />
            </button>
            <div className="box">
              <div className="imgJuegoZone">
                <img id="gameImage" src={images[currentImageIndex]} alt="Game Image" />
              </div>
              <div className="descripcionJuego">
                <div className="imgLogoJuego">
                  <img src="../img/CYBER.jpg" alt="" />
                </div>
                <div className="descripcion">
                  <p>
                    Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.
                    Possimus facilis quisquam <br /> dolorum provident veniam <br /> doloremque
                    molestias <br /> nobis, quo dolor <br /> exercitationem <br /> sint assumenda
                    veritatis <br /> id similique corporis ea <br /> reprehenderit. Laudantium,
                    libero?
                  </p>
                </div>
              </div>
            </div>
            <button className="BtnMove next space2" onClick={() => changeImage('next')}>
              <img src="../Img/flecha_derecha.png" alt="Flecha-Der" width="23px" height="35px" />
            </button>
          </div>
        </div>
  
        <div className="ZonaCompra">
          <div className="GameName">
            <h2>Super Mario</h2>
            <div className="BuyBox">
              <div className="Precio">
                <span>Tu precio:</span><br />
                <span className="PrecioNumero">$25.99</span>
              </div>
              <div className="BtnCompra">
                <span>Añadir al carro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
