import { format, parseISO } from 'date-fns'
import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../../../context/AuthContext'
import { db } from '../../../firebase'
import './Createpage.scss'
import { ToastContainer, toast } from 'react-toastify';

const CreateToDo=()=>{

    const [input,setInput]=useState('')
    const [description,setDescription]=useState('')
    const [data, setData] = useState('');
    const {user}=UserAuth()
   
    const createTodo=async(e)=>{
        e.preventDefault(e)
        if (input ==="" || description==="" || data==="") {
            toast.error("Empty input. Please fill in all the fields")
            return;
        }
        await addDoc(collection(db,'users',user.uid,'todos'),{
            title:input,
            isDone:false,
            description:description,
            time: format(parseISO(data), 'dd.MM.yyyy')
        })
        setInput('')
        setDescription('')
        setData('')
       
    }

    return (
        <div className='container'>
            <Link className='linktocreate' to='/account'><button  className='buttonaccount'>BACK</button></Link>
            <div  className='createtodo'>
            <h1 className='welcometext'>Creating task </h1>

            <ToastContainer position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light" />
            
            <form className='createform'>
                <input value={input} onChange={(e)=>setInput(e.target.value)}  className='todoinput' type="text" placeholder="Add todo.." />
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className='tododescription' type='text' placeholder="Add todo description.."/>
                <p>Date: <input value={data} onChange={(e)=>setData(e.target.value)}  className='datapicker' type="date"></input></p>
            </form>
            
            <button onClick={createTodo} className="addtaskbtn">Save</button>
            </div>
            
        </div>
    )
}

export default CreateToDo