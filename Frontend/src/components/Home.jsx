import { useEffect, useState } from 'react'
import Create from './Create'
import { BsCircleFill, BsFillTrashFill , BsFillCheckCircleFill } from 'react-icons/bs'

const Home = () => {

    const [todos, setTodos] = useState([]) ;    

    const TodoTasks = async() => {
        try{
            const response = await fetch(`http://localhost:5000/api/tasks`, {
                method:"GET",
            })

            const data = await response.json() ;

            console.log("Home.jsx response: ", response) ;
            console.log("Home.jsx data: ", data) ;

            if(response.ok) { 
                setTodos(data) ;
            }
            else {
                console.log("Response in Home.jsx is not ok.")
            }
        }
        catch(error){
            console.log(`Error in Home.jsx : ${error}`) ;
        }
    }

    useEffect(() => {
        TodoTasks()
    },[]) ;

    // Update Task
    const handleEdit = async(id) => {
        try{
            const response = await fetch(`http://localhost:5000/api/update/${id}`, {
                method:"PATCH",
            })
            // const data = response.json() ;

            if(response.ok){
                location.reload() ; // Reloads the page
            }
            else {
                console.log("Update response is not OK") 
            }
        }
        catch(error){
            console.log("Update Error : ", error) 
        }
    }

    
    // Delete Task
    const handleRemove = async(id) => {
        try{
            const response = await fetch(`http://localhost:5000/api/delete/${id}`, {
                method:"DELETE" 
            })
            const data = response.json() 
            // alert(data) ;

            if(response.ok){
                setTodos(data) 
                location.reload() 
            }
            else {
                console.log("Delete response is not OK") 
            }
        }
        catch(error){
            console.log(`Delete Error : ${error}`) ;
        }
    } 


  return (
    <div className='container'>
        <div className='total-container'>

            <h1 className='main-heading'>Todo List</h1>
            <Create/>
            <div className="todo-container">

            {
                todos.length === 0 
                ? <div className='no-records'><h2>No Records!!</h2></div>
                : <div className='taskContainer'>{
    
                    todos.map((todo,index) => (
                        <div key={index} className='singleTask'>

                            <div className="checkBox" onClick={() => handleEdit(todo._id)}>
                            {
                                todo.done == true
                                ? <BsCircleFill className='icon checkbox-icon'/>
                                : <BsFillCheckCircleFill className="icon check-icon"/>
                            }
                            </div>

                            {
                                todo.done == true
                                ? <strike className="strike">{todo.task}</strike>
                                : <p className="task">{todo.task}</p>
                            }

                            <div onClick={() => handleRemove(todo._id)} >
                                <span><BsFillTrashFill  className="icon"/></span>
                            </div>
                        
                        </div>
                    ))
                }
                </div>
            }
            </div>
        </div>
    </div>
  )
}

export default Home