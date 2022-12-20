import React from 'react';
import './ToDo.scss';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { UserAuth } from '../../../context/AuthContext';
import { useState } from 'react';

const ToDo = ({ todo }) => {
  const { user } = UserAuth();
  const [checked, setChecked] = useState(todo.isDone);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'users', user.uid, 'todos', todo.id), {
      isDone: !todo.isDone,
    });
    setChecked(!checked);
  };

  const handleComplete = () => {
    toggleComplete(todo);
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'users', user.uid, 'todos', id));
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <li className="todorectangle">
      <div className="row">
        <input
          onChange={handleComplete}
          className="checkbox"
          name="isDone"
          type="checkbox"
          checked={checked}
        />
        <span
          className={todo.isDone ? 'todotext crossed' : 'todotext'}
          onClick={handleComplete}
        >
          {todo.title}
        </span>
      </div>
      <div>
        <Link to={`/update/${todo.id}`}>
          <button className="editbtn">{<FaPencilAlt />}</button>
        </Link>
        <button onClick={handleDelete} className="trashbtn">
          {<FaRegTrashAlt />}
        </button>
      </div>
    </li>
  );
};

export { ToDo };
