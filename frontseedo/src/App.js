import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

function App() {


  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () =>{
    document.querySelector(".sidebar").classList.remove("open");
  }
  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="header">
        <div className="brand">
            <button onClick={openMenu}>
                &#9776;
            </button>
            <Link to="/" >Seedolabs</Link>
        </div>
        <div className="header-links">
            <a href="cart.html">Cart</a>
            {
                userInfo ? <Link to="/profile">&nbsp; &nbsp; &nbsp;{ userInfo.name }</Link> 
                :
                <Link to="/signin">Sign In</Link>
            }
        </div>
    </header>
    <aside className="sidebar">
        <h3>Appliances Categories</h3>
        <button className="sidebar-close-button" onClick={closeMenu}>x</button>
        <ul>
            <li>
                <a href="index.html">Hobs & Cooktops</a>
            </li>
            <li>
                <a href="index.html">Hoods & Chimneys</a>
            </li>
            <li>
                <a href="index.html">Ovens & Microwaves</a>
            </li>
        </ul>
    </aside>
    <main className="main">
        <div className="content">
        <Route path="/signin" component={ SigninScreen } />
        <Route path="/register" component={ RegisterScreen } />
        <Route path="/product/:id" component={ ProductScreen } />
        <Route path="/products" component={ ProductsScreen } />
        <Route path="/" exact={true} component={ HomeScreen } />
        <Route path="/cart/:id?" component={ CartScreen } />
        <Route path="/shipping" component={ ShippingScreen }/>
        <Route path="/payment" component={ PaymentScreen }/>
        <Route path="/placeorder" component={ PlaceOrderScreen }/>
        </div>
    </main>
    <footer className="footer">
        All rights reserved.
    </footer>
</div>
</BrowserRouter>
  );
}

export default App;
