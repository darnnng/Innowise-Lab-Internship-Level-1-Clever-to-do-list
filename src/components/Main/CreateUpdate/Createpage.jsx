import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';
import './Createpage.scss';
import { ToastContainer, toast } from 'react-toastify';
import { ThemeContext } from '../../../context/ThemeContext';
import { useContext } from 'react';
import { todosService } from '../../../API/TodosService';

const CreateToDo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const { user } = UserAuth();
  const theme = useContext(ThemeContext);

  const createTodo = async (event) => {
    event.preventDefault(event);
    if (title === '' || description === '' || date === '') {
      toast.error('Empty input. Please fill in all the fields');
      return;
    }
    await todosService.createTask(user.uid, description, title, date);
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
      <div style={{ background: theme.container }} className="createtodo">
        <h1 style={{ color: theme.maintextcolor }} className="welcometext">
          Creating task{' '}
        </h1>

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

        <form onSubmit={createTodo} className="createform">
          <input
            value={title}
            onChange={handleTitleInput}
            className="todoinput"
            name="title"
            type="text"
            placeholder="Add todo.."
          />
          <textarea
            value={description}
            onChange={handleDescriptionInput}
            className="tododescription"
            name="description"
            type="text"
            placeholder="Add todo description.."
          />
          <p>
            Date:{' '}
            <input
              value={date}
              onChange={handleDateInput}
              className="datapicker"
              name="date"
              type="date"
            ></input>
          </p>

          <button
            style={{ background: theme.addbtn }}
            type="submit"
            className="addtaskbtn"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export { CreateToDo };
