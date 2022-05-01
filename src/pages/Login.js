import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { API_URL } from '../utils/constants';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import '../App.css';

//----------------------------------------------------------------------------------------------------------------------

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        // Update the document title using the browser API
        console.log(localStorage.getItem('accessToken'))

        let akses = localStorage.getItem('accessToken')

        if (akses !== null) {
            window.location.href = "/"
        }

    });

    //----------------------------------------------------------------------------------------------------------------------

    const handleEmail = (e) => {
        const val = e.target.value
        setEmail(val)
    }

    //----------------------------------------------------------------------------------------------------------------------

    const handlePassword = (e) => {
        const val = e.target.value
        setPassword(val)
    }

    //----------------------------------------------------------------------------------------------------------------------

    const handleLogin = (e) => {

        e.preventDefault();

        console.log('email', email)
        console.log('password', password)

        const user = {
            email: email,
            password: password
        }

        axios.post(API_URL + "auth/login", user)
            .then(res => {
                console.log(res.data.access_token)

                if (res?.data?.access_token) {

                    const accessToken = `Bearer ${res.data.access_token}`

                    localStorage.setItem('accessToken', accessToken)

                    window.location.href = "/"
                };
            })
            .catch(err => {
                localStorage.removeItem("accessToken");
            })
    }

    //----------------------------------------------------------------------------------------------------------------------

    return (

        <div className='login-container'>

            <form onSubmit={handleLogin}>

                <label>
                    E-mail:
                    <input
                        value={email}
                        onChange={handleEmail}
                        type="text"
                        placeholder='email'
                        style={{ marginLeft: '60px' }}></input>
                </label>

                <label>
                    Password:
                    <input
                        value={password}
                        onChange={handlePassword}
                        type="password"
                        placeholder='password'
                        style={{ marginLeft: '39px' }}></input>
                </label>

                <Button
                    className='login-button'
                    variant="primary"
                    type="submit"
                    onClick={handleLogin}>
                    Login
                </Button>

                <Button variant="success" as={Link} to="/">
                    Kembali
                </Button>

                <div>
                    Belum punya akun ?
                    <a href="/akun" style={{ color: 'blue' }} className="m-4" variant="none">Buat Akun</a>
                </div>

            </form>
        </div>
    )
}

export default Login