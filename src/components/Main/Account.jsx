import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import '../Main/Account.scss';
import { ToDo } from './ToDoContainer/ToDo';
import { AiOutlinePlus } from 'react-icons/ai';
import { onSnapshot } from 'firebase/firestore';
import { Calendar } from './Calendar/Calendar';
import { format } from 'date-fns';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { todosService } from '../../API/TodosService';

const Account = () => {
  const [todos, setTodos] = useState([]);
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const { isDarkTheme } = useContext(ThemeContext);

  const [showDetails, setShowDetails] = useState(false);
  const [date, setDate] = useState(format(new Date(), 'dd.MM.yyyy'));

  const showDetailsHandle = (dayStr) => {
    setDate(dayStr);
    setShowDetails(true);
  };

  const handleLogout = () => {
    logout()
      .then(() => navigate('/'))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      todosService.getTodos(user.uid, date),
      (querySnapshot) => {
        setTodos(todosService.setTodosList(querySnapshot));
      }
    );
    return () => unsubscribe();
  }, [user.uid, date]);

  return (
    <div className={isDarkTheme === true ? 'container' : 'container dark'}>
      <button
        onClick={handleLogout}
        className={
          isDarkTheme === true ? 'buttonaccount' : 'buttonaccount dark'
        }
      >
        Logout
      </button>

      <Calendar
        showDetailsHandle={showDetailsHandle}
        todos={todos}
        date={date}
      />

      <div className={isDarkTheme === true ? 'todoapp' : 'todoapp dark'}>
        <h1
          className={isDarkTheme === true ? 'welcometext' : 'welcometext dark'}
        >
          Your plans for <br /> {showDetails} {date}{' '}
        </h1>
        <ul>
          {todos.map((todo, id) => (
            <ToDo todo={todo} key={id} />
          ))}
        </ul>
        <Link className="linktocreate" to="/create">
          <button
            className={isDarkTheme === true ? 'addtaskbtn' : 'addtaskbtn dark'}
          >
            {' '}
            <AiOutlinePlus /> Add a new task{' '}
          </button>
        </Link>
        {todos.length < 1 ? (
          <p className="tasksleft">No tasks for the day</p>
        ) : (
          <p className="tasksleft">
            {todos.length > 1
              ? `You have ${todos.length} tasks left`
              : `You have ${todos.length} task left`}
          </p>
        )}
      </div>
    </div>
  );
};

export { Account };
