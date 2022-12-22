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
  const { isDarkTheme } = useContext(ThemeContext);

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
    <div className={isDarkTheme === true ? 'container' : 'container dark'}>
      <Link className="linktocreate" to="/account">
        <button
          className={
            isDarkTheme === true ? 'buttonaccount' : 'buttonaccount dark'
          }
        >
          BACK
        </button>
      </Link>
      <div className={isDarkTheme === true ? 'createtodo' : 'createtodo dark'}>
        <h1
          className={isDarkTheme === true ? 'welcometext' : 'welcometext dark'}
        >
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
            className={isDarkTheme === true ? 'addtaskbtn' : 'addtaskbtn dark'}
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export { CreateToDo };
