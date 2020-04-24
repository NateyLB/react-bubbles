
import React, { useState } from 'react';
import axios from 'axios';

import { axiosWithAuth } from '../utils/axiosWithAuth.js'

const Login = (props) => {


    const [login, setLogin] = useState({ username: '', password: '' })
    const [buttonEnable, setButtonEnable] = useState(true)
   
    const handleChange = event => {
        setLogin({ ...login, [event.target.name]: event.target.value })
        if( login.username.length>0 && login.password.length>0 ){
            setButtonEnable(false)}
    };

    

    const submitLogin = event => {
        event.preventDefault();
        axiosWithAuth()
            .post('/api/login', login)
            .then(res => {
                localStorage.setItem('token', JSON.stringify(res.data.payload));
               props.history.push('/protected');
            })
            .catch(err => console.log({ err }));

    }

    return (
        <div>
            <h3>Login</h3>
            <form className='form' onSubmit={submitLogin}>
                <label htmlFor="username">
                    Username:
                <input name='username' type="text" onChange={handleChange} />
                </label>
                <label htmlFor="password">
                    Password:
                <input name='password' type="password" onChange={handleChange} />
                </label>
                <input disabled={buttonEnable} className='submit' name='submit' type='submit' />
            </form>
        </div>
    )
}

export default Login;