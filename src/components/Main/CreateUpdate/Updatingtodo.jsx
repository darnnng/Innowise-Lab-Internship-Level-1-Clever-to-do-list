import { doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../../../context/AuthContext'
import { db } from '../../../firebase'
import './Createpage.css'
import { useLocation } from 'react-router-dom'


const UpdateToDo=()=>{

    const location = useLocation()

    const [input,setInput]=useState('')
    const [description,setDescription]=useState('')
    const {user}=UserAuth()

    const updateToDoBtn= async()=>{
        debugger;
        await updateDoc(doc(db,'users',`${user.uid}`,'todos',location.state),{
            description:description,
            title:input
        }) 
        setInput('')
        setDescription('')
    }

    return (
        <div className='container'>
            <Link className='linktocreate' to='/account'><button  className='buttonaccount'>BACK</button></Link>
            <div className='todoapp createtodo'>
            <h1 className='welcometext'> Updating to do </h1>
            
            <form className='createform'>
                <input value={input} onChange={(e)=>setInput(e.target.value)}  className='todoinput' type="text" placeholder="New todo title.." />
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} class='tododescription' type='text' placeholder="New todo description.."/>
                <p>Current date {new Date().toLocaleString()}</p>
            </form>
            
            <button onClick={updateToDoBtn} className="addtaskbtn">Update</button>
            </div>
            
        </div>
    )
}

export default UpdateToDo