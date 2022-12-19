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

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const { user } = UserAuth();
  const theme = useContext(ThemeContext);

  const updateToDoBtn = async (event) => {
    event.preventDefault(event);
    await updateDoc(doc(db, 'users', user.uid, 'todos', location.state.todo), {
      description: description,
      title: title,
      time: format(parseISO(date), 'dd.MM.yyyy'),
    });
    setTitle('');
    setDescription('');
    setDate('');
  };

  const handleTitleInput = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionInput = (event) => {
    setDescription(event.target.value);
  };

  const handleDateInput = (event) => {
    setDate(event.target.value);
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

        <form onSubmit={updateToDoBtn} className="createform">
          <input
            value={title}
            name="title"
            onChange={handleTitleInput}
            className="todoinput"
            type="text"
            placeholder="New todo title.."
          />
          <textarea
            value={description}
            name="description"
            onChange={handleDescriptionInput}
            className="tododescription"
            type="text"
            placeholder="New todo description.."
          />
          <p>
            Date:{' '}
            <input
              value={date}
              name="date"
              onChange={handleDateInput}
              className="datapicker"
              type="date"
            ></input>
          </p>

          <button
            style={{ background: theme.addbtn }}
            type="submit"
            className="addtaskbtn"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export { UpdateToDo };
