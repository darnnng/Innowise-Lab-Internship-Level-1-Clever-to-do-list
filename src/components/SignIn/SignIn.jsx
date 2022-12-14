import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserAuth} from '../../context/AuthContext'
import '../SignIn/signin.scss'
import person from "../../assets/illustration1.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignIn=()=>{
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const {signIn}=UserAuth();
    const navigate=useNavigate()

    const handleSubmit= async(e)=>{
        e.preventDefault()
        setError('')
        try {
            await signIn(email,password)
            navigate('/account')
        } catch (e) {
            setError(e.message)
            toast.error((e.message).toString().slice(9))
        }
    }

    return (
        <div class='wrapper'>
            <div class='left'>
                <p className='imagelabel signinlabel'> Welcome back! </p>
                <img className='imagesignup' src={person} alt="people"></img>
            </div>
            <div className='sign right'>
                <div>
                    <h1 className='textsign'>Sign in </h1>
                    <p className='plink plinksignup'>
                        Don't have an account yet?<Link to='/signup' className='link'> Sign up</Link>.
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                <ToastContainer position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light" />
                    <div className='divinput'>
                        <label className='inputlabel' >Email</label>
                        <input placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)} className='input' type='email'/>
                    </div>
                    <div className='divinput'>
                        <label className='inputlabel'>Password</label>
                        <input  placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)} className='input' type='password'/>
                    </div>
                    <button className='button'>Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default SignIn