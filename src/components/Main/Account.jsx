import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import '../Main/Account.scss';
import ToDo from './ToDoContainer/ToDo';
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
import Calendar from './Calendar/Calendar';
import { format } from 'date-fns';

const Account = () => {
  const [todos, setTodos] = useState([]);
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(format(new Date(), 'dd.MM.yyyy'));

  const todosRef = collection(db, 'users', `${user.uid}`, 'todos');

  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    setShowDetails(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const q = query(todosRef, where('time', '==', data));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe;
  }, [user.uid, data]);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'users', user.uid, 'todos', todo.id), {
      isDone: !todo.isDone,
    });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'users', user.uid, 'todos', id));
  };

  return (
    <div className="container">
      <button onClick={handleLogout} className="buttonaccount">
        Logout
      </button>

      <Calendar
        showDetailsHandle={showDetailsHandle}
        todos={todos}
        data={data}
      />

      <div className="todoapp">
        <h1 className="welcometext">
          Your plans for <br /> {showDetails} {data}{' '}
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
          <button className="addtaskbtn">
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

export default Account;
