import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import '../SignIn/signin.scss';
import people from '../../assets/image111.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { format, parseISO } from 'date-fns';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isDarkTheme } = useContext(ThemeContext);

  const { createUser } = UserAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await createUser(email, password);
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
        <p className="imagelabel">
          {' '}
          Make your life more organized. Sign up for free.
        </p>
        <img className="imagesignup" src={people} alt="people"></img>
      </div>
      <div className="sign right">
        <div>
          <h1 className={isDarkTheme === true ? 'textsign' : 'textsign dark'}>
            Create new account
          </h1>
          <p className="plink  plinksignin">
            Already have an account?
            <Link to="/" className="link">
              {' '}
              Sign in
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
              onChange={handleEmailChange}
              placeholder="Enter email"
              className="input"
              type="email"
            />
          </div>
          <div className="divinput">
            <label className="inputlabel">Password</label>
            <input
              onChange={handlePasswordChange}
              placeholder="Enter password"
              className="input"
              type="password"
            />
          </div>
          <button
            type="submit"
            className={isDarkTheme === true ? 'button' : 'button dark'}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export { SignUp };
