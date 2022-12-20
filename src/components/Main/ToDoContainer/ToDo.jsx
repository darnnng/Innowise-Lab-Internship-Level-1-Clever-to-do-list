import React from 'react';
import './ToDo.scss';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';
import { useState } from 'react';
import { todosService } from '../../../API/TodosService';

const ToDo = ({ todo }) => {
  const { user } = UserAuth();
  const [checked, setChecked] = useState(todo.isDone);

  const toggleComplete = async (todo) => {
    await todosService.updateIfDone(user.uid, todo);
    setChecked(!checked);
  };

  const handleComplete = () => {
    toggleComplete(todo);
  };

  const deleteTodo = async (id) => {
    await todosService.deleteTask(user.uid, id);
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
