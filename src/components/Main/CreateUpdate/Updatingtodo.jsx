import { doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';
import { db } from '../../../firebase';
import './Createpage.scss';
import { useLocation } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ThemeContext } from '../../../context/ThemeContext';
import { useContext } from 'react';

const UpdateToDo = () => {
  const location = useLocation();

  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState('');

  const { user } = UserAuth();
  const theme = useContext(ThemeContext);

  const updateToDoBtn = async (event) => {
    event.preventDefault(event);
    await updateDoc(doc(db, 'users', user.uid, 'todos', location.state.todo), {
      description: description,
      title: input,
      time: format(parseISO(data), 'dd.MM.yyyy'),
    });
    setInput('');
    setDescription('');
    setData('');
  };

  return (
    <div style={{ background: theme.background }} className="container">
      <Link className="linktocreate" to="/account">
        <button style={{ background: theme.logout }} className="buttonaccount">
          BACK
        </button>
      </Link>
      <div
        style={{ background: theme.container }}
        className="todoapp createtodo"
      >
        <h1 style={{ color: theme.maintextcolor }} className="welcometext">
          {' '}
          Updating to do{' '}
        </h1>

        <form className="createform">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="todoinput"
            type="text"
            placeholder="New todo title.."
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            class="tododescription"
            type="text"
            placeholder="New todo description.."
          />
          <p>
            Date:{' '}
            <input
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="datapicker"
              type="date"
            ></input>
          </p>
        </form>

        <button
          style={{ background: theme.addbtn }}
          onClick={updateToDoBtn}
          className="addtaskbtn"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export { UpdateToDo };
