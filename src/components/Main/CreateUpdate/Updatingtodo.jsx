import React from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';
import './Createpage.scss';
import { ThemeContext } from '../../../context/ThemeContext';
import { useContext } from 'react';
import { todosService } from '../../../API/TodosService';

const UpdateToDo = () => {
  const { taskId } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState();

  const { user } = UserAuth();
  const { isDarkTheme } = useContext(ThemeContext);

  const updateTask = async (event) => {
    event.preventDefault(event);
    await todosService.updateTask(
      user.uid,
      taskId,
      description,
      title,
      date,
      time
    );
    setTitle('');
    setDescription('');
    setDate('');
    setTime();
  };

  const handleTitleInput = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionInput = (event) => {
    setDescription(event.target.value);
  };

  const handleDateInput = (event) => {
    setDate(event.target.value);
    setTime(new Date(event.target.value).getTime());
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
          {' '}
          Updating to do{' '}
        </h1>

        <form onSubmit={updateTask} className="createform">
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
            className={isDarkTheme === true ? 'addtaskbtn' : 'addtaskbtn dark'}
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export { UpdateToDo };
