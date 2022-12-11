import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserAuth} from '../../context/AuthContext'
import '../Main/Account.scss'
import ToDo from './ToDoContainer/ToDo'
import {auth,db} from '../../firebase.js'
import {set,ref,onValue} from 'firebase/database'
import {uid} from "uid"
import { onAuthStateChanged } from 'firebase/auth'
import {AiOutlinePlus} from "react-icons/ai"
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore'


const Account=()=>{

    const [todo, setTodo]=useState("")
    const [todos,setTodos]=useState([])
    const {user,logout}=UserAuth()
    const navigate=useNavigate()
    //const todosRef=db.collection(`users/${auth.currentUser.uid}/todos`)

    // useEffect(() => {
    //     auth.onAuthStateChanged((user) => {
    //         if(user) {
    //         onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
    //           setTodos([]);
    //           const data = snapshot.val();
    //           if (data !== null) {
    //             Object.values(data).map((todo) => {
    //               setTodos((oldArray) => [...oldArray, todo]);
    //             });
    //           }
    //         });
    //     }
    //     });
    //   }, []);

    const [date, setDate]=useState(null);
    const [month, setMonth]=useState(null);
    const [year, setYear]=useState(null);
    const [input,setInput]=useState('')


    useEffect(()=>{
        const myDate = new Date();
        const myMonth = myDate.getMonth()+1;
        const myDay = myDate.getDate();
        const myYear = myDate.getFullYear();

        setMonth(myMonth);
        setDate(myDay);
        setYear(myYear);
    },[])

      
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

    //delete

    const deleteTodo=async(id)=>{
        await deleteDoc(doc(db,'users',user.uid,'todos',id))
    }


    return (
        <div className='container'>
    
            <div className='todoapp'>
            <h1 className='welcometext'>Your plans for <span className='date-section'>{date}/{month}/{year}</span></h1>
            <button onClick={handleLogout} className='buttonaccount'>Logout</button>
            

            <form onSubmit={createTodo} className='todoform'>
                <input value={input} onChange={(e)=>setInput(e.target.value)} className='todoinput' type="text" placeholder="Add todo.." />
                <button  type="submit" className='btn'><AiOutlinePlus/></button>
            </form>
            <ul>
                {todos.map((todo,index)=>(
                    <ToDo todo={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
                ))}
            </ul>
            <button className="addtaskbtn"><Link className='linktocreate' to='/create'> <AiOutlinePlus /> Add a new task</Link></button>
            {todos.length<1? <p className='tasksleft'>No tasks for today</p>: <p className='tasksleft'>{`You have ${todos.length} tasks left today`}</p>}
            
            </div>
            
        </div>
    )
}

export default Account