// App.js
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './Components/Home';

import { Login } from './Components/Login';
import { Cart } from './Components/Cart';
import { NotFound } from './Components/NotFound';
import { AddProducts } from './Components/AddProducts';
import { checkout } from './Components/Checkout';
import { GameComponent } from './Components/GameTemplate';
import './index.css';

export const App = () => {
  

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path="/signup" component={Login} />
        <Route path="/login" component={Login} />

        <Route path="/add-products" component={AddProducts} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={checkout} />

        <Route path="/game" render={() => <GameComponent/>} />
       
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
