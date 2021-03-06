import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';


function ShippingScreen(props){

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();
        
    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(saveShipping({ address, city, postalCode, country }));
        props.history.push('payment');
    }

    return <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="form">
        <form onSubmit={submitHandler} >
            <ul className="form-container">
              <li>
                  <h2>Shipping</h2>
              </li>
              <li>
                  <label htmlFor="address">
                    Address
                  </label>
                  <input type="text" name="address" id="address" onChange={ (event) => setAddress(event.target.value) }>
                  </input>
              </li>
              <li>
                  <label htmlFor="city">
                    City
                  </label>
                  <input type="text" name="city" id="city" onChange={ (event) => setCity(event.target.value) }>
                  </input>
              </li>
              <li>
                  <label htmlFor="postalCode">
                    Postal Code
                  </label>
                  <input type="text" name="postalCode" id="postalCode" onChange={ (event) => setPostalCode(event.target.value) }>
                  </input>
              </li>
              <li>
                  <label htmlFor="country">
                    Country
                  </label>
                  <input type="text" name="country" id="country" onChange={ (event) => setCountry(event.target.value) }>
                  </input>
              </li>
              <li>
                  <button type="submit" className="button">
                      Continue
                  </button>
              </li>
            </ul>
        </form>
    </div>
    </div>
}


export default ShippingScreen;