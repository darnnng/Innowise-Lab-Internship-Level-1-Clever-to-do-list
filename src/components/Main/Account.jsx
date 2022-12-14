import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserAuth} from '../../context/AuthContext'
import '../Main/Account.css'
import ToDo from './ToDoContainer/ToDo'
import {db} from '../../firebase.js'
import {AiOutlinePlus} from "react-icons/ai"
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import Calendar from './Calendar/Calendar'
import { format, parseISO } from 'date-fns'


const Account=()=>{

    const [todos,setTodos]=useState([])
    const {user,logout}=UserAuth()
    const navigate=useNavigate()

    const [showDetails, setShowDetails] = useState(false);
    const [data, setData] = useState(null);
    const [undone,setUndone]=useState([])


    const showDetailsHandle = (dayStr) => {
        setData(dayStr);
        setShowDetails(true);
      };

    const handleLogout=async()=>{
        try {
            await logout()
            navigate('/')
        } catch (e) {
            console.log(e.message)
        }
    }
    
    //read

    useEffect(()=>{
        const q=query(collection(db,'users',`${user.uid}`,'todos'), where ('time','==',data))
        console.log('qwery',q)
        const unsubscribe=onSnapshot(q,(querySnapshot)=>{
            let todosArr=[];
            querySnapshot.forEach((doc)=>{
                todosArr.push({...doc.data(),id:doc.id})
            })
        setTodos(todosArr)
        })
        return ()=> unsubscribe;
    },[user.uid,data]) 

    // array of uncompleted tasks

    

    //update task done or not

    const toggleComplete= async (todo)=>{
        await updateDoc(doc(db,'users',user.uid,'todos',todo.id),{
            isDone:!todo.isDone
        }) 
    }
    
    //delete

    const deleteTodo=async(id)=>{
        debugger
        await deleteDoc(doc(db,'users',user.uid,'todos',id))
    }


    return (
        
        <div className='container'>
            <button onClick={handleLogout} className='buttonaccount'>Logout</button>
           
            <Calendar showDetailsHandle={showDetailsHandle} todos={todos}/>
           
            <div className='todoapp'>
                <h1 className='welcometext'>Your plans for <br/> {showDetails} {data} </h1>
                <ul>
                    {todos.map((todo,index)=>(
                        <ToDo  todo={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
                    ))}
                </ul>
                <Link className='linktocreate' to='/create'><button  className="addtaskbtn"> <AiOutlinePlus /> Add a new task </button></Link>
                {todos.length<1? <p className='tasksleft'>No tasks for the day</p>: <p className='tasksleft'>{`You have ${todos.length} tasks left`}</p>}
            
            </div>
            
        </div>
    )
}

export default Account