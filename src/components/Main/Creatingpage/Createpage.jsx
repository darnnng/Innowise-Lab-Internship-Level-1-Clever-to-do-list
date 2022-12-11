import React from 'react'
import './Createpage.scss'


const CreateToDo=()=>{
    return (
        <div className='container'>
    
            <div className='todoapp'>
            <h1 className='welcometext'>Creating task </h1>
            

            <form className='createform'>
                <input  className='todoinput' type="text" placeholder="Add todo.." />
                <textarea class='tododescription' type='text' placeholder="Add todo description.."/>
            </form>
            
            <button className="addtaskbtn">Create to do</button>
            
            
            </div>
            
        </div>
    )
}

export default CreateToDo