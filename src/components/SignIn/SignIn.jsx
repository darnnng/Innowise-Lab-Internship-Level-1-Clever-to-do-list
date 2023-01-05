import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import '../SignIn/signin.scss';
import person from '../../assets/illustration1.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { signIn } = UserAuth();
  const navigate = useNavigate();
  const { isDarkTheme } = useContext(ThemeContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      navigate('/account');
    } catch (error) {
      setError(error.message);
      toast.error(error.message.toString().slice(9));
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="wrapper">
      <div className={isDarkTheme === true ? 'left' : 'left dark'}>
        <p className="imagelabel signinlabel"> Welcome back! </p>
        <img className="imagesignup" src={person} alt="people"></img>
      </div>
      <div className="sign right">
        <div className="textsignin">
          <h1 className={isDarkTheme === true ? 'textsign' : 'textsign dark'}>
            Sign in{' '}
          </h1>
          <p className="plink plinksignup">
            Don't have an account yet?
            <Link to="/signup" className="link">
              {' '}
              Sign up
            </Link>
            .
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="divinput">
            <label className="inputlabel">Email</label>
            <input
              placeholder="Enter email"
              name="email"
              onChange={handleEmailChange}
              className="input"
              type="email"
            />
          </div>
          <div className="divinput">
            <label className="inputlabel">Password</label>
            <input
              placeholder="Enter password"
              name="password"
              onChange={handlePasswordChange}
              className="input"
              type="password"
            />
          </div>
          <button
            type="submit"
            className={isDarkTheme === true ? 'button' : 'button dark'}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export { SignIn };
