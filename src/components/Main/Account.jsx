import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserAuth} from '../../context/AuthContext'
import '../Main/Account.css'
import ToDo from './ToDoContainer/ToDo'
import {auth,db} from '../../firebase.js'
import {uid} from "uid"
import { onAuthStateChanged } from 'firebase/auth'
import {AiOutlinePlus} from "react-icons/ai"
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore'
import Calendar from './Calendar/Calendar'


const Account=()=>{

    const [todo, setTodo]=useState("")
    const [todos,setTodos]=useState([])
    const {user,logout}=UserAuth()
    const navigate=useNavigate()

    const [date, setDate]=useState(null);
    const [month, setMonth]=useState(null);
    const [year, setYear]=useState(null);
    const [input,setInput]=useState('')
    const [description,setDescription]=useState('')

    const [modalActive,setModalActive]=useState(false)
    const [modalUpdate,setModalUpdate]=useState(false)

    const [showDetails, setShowDetails] = useState(false);
    const [data, setData] = useState(null);


    useEffect(()=>{
        const myDate = new Date();
        const myMonth = myDate.getMonth()+1;
        const myDay = myDate.getDate();
        const myYear = myDate.getFullYear();

        setMonth(myMonth);
        setDate(myDay);
        setYear(myYear);
    },[])

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

    //create

    const createTodo=async(e)=>{
        e.preventDefault(e)
        if (input ==="") {
            alert('empty string')
            //вывести toast с сообщением Empty input
            return;
        }
        await addDoc(collection(db,'users',user.uid,'todos'),{
            title:input,
            isDone:false,
            description:'read',
            time:new Date().toLocaleString()
        })
        setInput('')
    }
    
    
    //read

    useEffect(()=>{
        const q=query(collection(db,'users',`${user.uid}`,'todos'))
        console.log('qwery',q)
        const unsubscribe=onSnapshot(q,(querySnapshot)=>{
            let todosArr=[];
            querySnapshot.forEach((doc)=>{
                todosArr.push({...doc.data(),id:doc.id})
            })
        setTodos(todosArr)
        console.log(todosArr)
        })
        return ()=> unsubscribe;
    },[user.uid]) //???????? 
    

    //update task done or not

    const toggleComplete= async (todo)=>{
        console.log(todo.isDone)
        await updateDoc(doc(db,'users',user.uid,'todos',todo.id),{
            isDone:!todo.isDone
        }) 
    }

    const updateToDo= async(id)=>{
        debugger;
        setModalUpdate(true)
        await updateDoc(doc(db,'users',`${user.uid}`,'todos',id),{
            description:description,
            title:input
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
           
            <Calendar showDetailsHandle={showDetailsHandle} />
           
            <div className='todoapp'>
                <h1 className='welcometext'>Your plans for <br/> {showDetails} {data} </h1>
                <ul>
                    {todos.map((todo,index)=>(
                        <ToDo  active={modalUpdate}  todo={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
                    ))}
                </ul>
                <Link className='linktocreate' to='/create'><button  className="addtaskbtn"> <AiOutlinePlus /> Add a new task </button></Link>
                {todos.length<1? <p className='tasksleft'>No tasks for today</p>: <p className='tasksleft'>{`You have ${todos.length} tasks left`}</p>}
            
            </div>
            
        </div>
    )
}

export default Account