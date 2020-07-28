import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';


function SigninScreen(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;

    const dispatch = useDispatch();
    
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
        return () => {
            //
        };
    }, [userInfo]);
    
    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(signin(email, password));
    }

    return <div className="form">
        <form onSubmit={submitHandler} >
            <ul className="form-container">
              <li>
                  <h2>Sign-In</h2>
              </li>
              <li>
                  { loading && <div>Loading...</div> }
                  { error && <div>{ error }</div> }
              </li>
              <li>
                  <label htmlFor="email">
                    Email
                  </label>
                  <input type="email" name="email" id="email" onChange={ (event) => setEmail(event.target.value) }>
                  </input>
              </li>
              <li>
                  <label htmlFor="password"> 
                    Password
                  </label>
                  <input type="password" name="password" id="password" onChange={ (event) => setPassword(event.target.value) }>
                  </input>
              </li>
              <li>
                  <button type="submit" className="button">
                      Signin
                  </button>
              </li>
              <li>
                  New to seedo
              </li>
              <li>
                  <Link to={ redirect === "/" ? "register" : "register?redirect=" + redirect } className="button secondary text-center">
                      Create your seedo account
                  </Link>
              </li>
            </ul>
        </form>
    </div>
}


export default SigninScreen;