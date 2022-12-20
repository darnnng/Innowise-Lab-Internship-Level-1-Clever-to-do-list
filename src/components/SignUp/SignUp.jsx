import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import '../SignIn/signin.scss';
import people from '../../assets/image111.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  const { createUser } = UserAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      await addDoc(collection(db, 'users'), {
        email: email,
      });
      navigate('/account');
    } catch (error) {
      setError(error.message);
      toast.error(error.message.toString().slice(9));
    }
  };

  return (
    <div className="wrapper">
      <div style={{ background: theme.backgroundleft }} className="left">
        <p className="imagelabel">
          {' '}
          Make your life more organized. Sign up for free.
        </p>
        <img className="imagesignup" src={people} alt="people"></img>
      </div>
      <div className="sign right">
        <div>
          <h1 style={{ color: theme.textsign }} className="textsign">
            Create new account
          </h1>
          <p className="plink">
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="input"
              type="email"
            />
          </div>
          <div className="divinput">
            <label className="inputlabel">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="input"
              type="password"
            />
          </div>
          <button
            type="submit"
            style={{ background: theme.signbtn }}
            className="button"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export { SignUp };
