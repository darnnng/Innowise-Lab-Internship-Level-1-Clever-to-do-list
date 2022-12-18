import React from 'react';
import './ToDo.scss';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ToDo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li className="todorectangle">
      <div className="row">
        <input
          onChange={() => toggleComplete(todo)}
          className="checkbox"
          type="checkbox"
          checked={todo.isDone ? 'checked' : ''}
        />
        <span
          className={todo.isDone ? 'todotext crossed' : 'todotext'}
          onClick={() => toggleComplete(todo)}
        >
          {todo.title}
        </span>
      </div>
      <div>
        <Link to="/update" state={{ todo: todo.id }}>
          <button className="editbtn">{<FaPencilAlt />}</button>
        </Link>
        <button onClick={() => deleteTodo(todo.id)} className="trashbtn">
          {<FaRegTrashAlt />}
        </button>
      </div>
    </li>
  );
};

export { ToDo };
