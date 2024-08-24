import React, { useState } from 'react'
import './LoginSignup.css'
import user_icon from '../../assets/images/person.png'
import password_icon from '../../assets/images/password.png'
import email_icon from '../../assets/images/email.png'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import base_url from '../../../src/api/Coder911Api.js'

const LoginSignup = ({ loginSuccess, setLoginSuccess, email, setEmail }) => {

  const [action, setAction] = useState("Login");
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSignUp(action) {
    if (action === "Login") {
      setAction("Sign Up")
      clearData()
      return;
    }
    if (name === "") {
      toast.error('Name is required!');
      return;
    }
    if (email === "") {
      toast.error('Email is required!');
      return;
    }
    if (password === "") {
      toast.error('Password is required!');
      return;
    }

    createCoder()
  }

  function handleLogin(action) {
    if (action === "Sign Up") {
      setAction("Login")
      return;
    }
    if (email === "") {
      toast.error('Email is required!');
      return;
    }
    if (password === "") {
      toast.error('Password is required!');
      return;
    }
    verifyLogin()
  }

  async function verifyLogin() {
    await axios.get(`${base_url.coder_url}/user/login/${encodeURIComponent(email)}/${encodeURIComponent(password)}`)
      .then((response) => {
        console.log('Data received:', response.data);
        setLoginSuccess(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message);
      });

    if (loginSuccess) {
      navigate('/home');
    } else {
      toast.error('Email or Password is incorrect!');
    }
  }

  async function createCoder() {
    const signUpData = {
        userName: name,
        email: email,
        password: password
    };

    try {
        const response = await axios.post(`${base_url.coder_url}/user/signUp`, signUpData);
        const userData = response.data; 
        setAction("Login"); 
        toast.success('Sign up successful');
        if (userData.email !== null && userData.email === email) {
          clearData()
        }
        
    } catch (error) {
        console.error('Error fetching data:', error.message);
        setAction("Sign Up"); 
        toast.error('Something went wrong'); 
    }
}

function clearData() {
      setName('')
      setEmail('')
      setPassword('')
}

  return (
    <div className='container-login'>
      <div className='header-login'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action === "Login" ? <div></div> :
          <div className='input'>
            <img src={user_icon} alt="" />
            <input type='text' placeholder='Enter name' name='name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>}
        <div className='input'>
          <img src={email_icon} alt="" />
          <input type='email' placeholder='Enter email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='input'>
          <img src={password_icon} alt="" />
          <input type='password' placeholder='Enter password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='submit-container'>
          <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => handleLogin(action)}>Login</div>
          <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => handleSignUp(action)}>Sign Up</div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default LoginSignup
