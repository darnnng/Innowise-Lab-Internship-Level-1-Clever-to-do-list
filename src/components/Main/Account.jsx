import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import '../Main/Account.scss';
import { ToDo } from './ToDoContainer/ToDo';
import { db } from '../../firebase.js';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Calendar } from './Calendar/Calendar';
import { format } from 'date-fns';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Account = () => {
  const [todos, setTodos] = useState([]);
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  const [showDetails, setShowDetails] = useState(false);
  const [date, setDate] = useState(format(new Date(), 'dd.MM.yyyy'));

  const todosCollection = collection(db, 'users', `${user.uid}`, 'todos');

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
    const tasksQuery = query(todosCollection, where('time', '==', date));
    const unsubscribe = onSnapshot(tasksQuery, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, [user.uid, date]);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'users', user.uid, 'todos', todo.id), {
      isDone: !todo.isDone,
    });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'users', user.uid, 'todos', id));
  };

  return (
    <div style={{ background: theme.background }} className="container">
      <button
        style={{ background: theme.logout }}
        onClick={handleLogout}
        className="buttonaccount"
      >
        Logout
      </button>

      <Calendar
        showDetailsHandle={showDetailsHandle}
        todos={todos}
        date={date}
      />

      <div style={{ background: theme.container }} className="todoapp">
        <h1 style={{ color: theme.maintextcolor }} className="welcometext">
          Your plans for <br /> {showDetails} {date}{' '}
        </h1>
        <ul>
          {todos.map((todo, index) => (
            <ToDo
              todo={todo}
              key={index}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        <Link className="linktocreate" to="/create">
          <button style={{ background: theme.addbtn }} className="addtaskbtn">
            {' '}
            <AiOutlinePlus /> Add a new task{' '}
          </button>
        </Link>
        {todos.length < 1 ? (
          <p className="tasksleft">No tasks for the day</p>
        ) : (
          <p className="tasksleft">{`You have ${todos.length} tasks left`}</p>
        )}
      </div>
    </div>
  );
};

export { Account };
