import React from 'react'
import './ToDo.scss'
import {FaRegTrashAlt} from 'react-icons/fa'
import {FaPencilAlt} from 'react-icons/fa'

const ToDo=({todo,toggleComplete,deleteTodo})=>{
    return (
        <li class='todorectangle'>
            <div className='row'>
                <input onChange={()=>toggleComplete(todo)} className="checkbox" type="checkbox" checked={todo.isDone ? 'checked':''}/>
                <span className="todotext" onClick={()=>toggleComplete(todo)}>{todo.title}</span>
            </div>
            <div>
            <button className='editbtn'>{<FaPencilAlt/>}</button>
            <button onClick={()=>deleteTodo(todo.id)} className='trashbtn'>{<FaRegTrashAlt/>}</button>
            </div>
        </li>
    )
}

export default ToDo