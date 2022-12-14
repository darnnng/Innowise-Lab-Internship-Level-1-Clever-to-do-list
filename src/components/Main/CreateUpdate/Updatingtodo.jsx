import { doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../../../context/AuthContext'
import { db } from '../../../firebase'
import './Createpage.scss'
import { useLocation } from 'react-router-dom'
import { format, parseISO } from 'date-fns'



const UpdateToDo=()=>{

    const location = useLocation()
    console.log(location.state.todo)

    const [input,setInput]=useState('')
    const [description,setDescription]=useState('')
    const [data, setData] = useState('');
    const {user}=UserAuth()

    const updateToDoBtn= async(e)=>{
        e.preventDefault(e);
        await updateDoc(doc(db,'users',user.uid,'todos',location.state.todo),{
            description:description,
            title:input,
            time: format(parseISO(data), 'dd.MM.yyyy')
        }) 
        setInput('')
        setDescription('')
        setData('')
    }

    return (
        <div className='container'>
            <Link className='linktocreate' to='/account'><button  className='buttonaccount'>BACK</button></Link>
            <div className='todoapp createtodo'>
            <h1 className='welcometext'> Updating to do </h1>
            
            <form className='createform'>
                <input value={input} onChange={(e)=>setInput(e.target.value)}  className='todoinput' type="text" placeholder="New todo title.." />
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} class='tododescription' type='text' placeholder="New todo description.."/>
                <p>Date: <input value={data} onChange={(e)=>setData(e.target.value)}  className='datapicker' type="date"></input></p>
            </form>
            
            <button onClick={updateToDoBtn} className="addtaskbtn">Update</button>
            </div>
            
        </div>
    )
}

export default UpdateToDo