import { useEffect, useState } from 'react'
import { BsCircleFill, BsFillTrashFill , BsFillCheckCircleFill } from 'react-icons/bs'
import { toast } from 'react-toastify';

const Home = () => {
    
    const [allTodos, setAllTodos] = useState([]) 
    const [todo, setTodo] = useState({task:"",})
    // const [loading, setLoading] = useState(true) 
  
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value 
  
        setTodo((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

   

    //----------------------------Add Task----------------------------//
    const handleAdd = async() => {
      if(todo.task === "") {
        toast.warning("Please Add a task") ;
        return ;
      }
  
        try{
            const response = await fetch(`http://localhost:5000/api`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(todo),
            })
  
            if(response.ok) 
              {
                setTodo({
                  task:"",
                }) ;
                FetchAllTodoTasks()
                toast.success('Successfully added') ;
            }
            else {
                toast.error('Some unknown error occur!\n Try again!')
                console.log("Response ERROR in Create.jsx ") ;
            }
        }
        catch(error) {
            console.log("ERROR in Create.jsx : ", error) 
            toast.error("Internal server error") ;
        }
    }


    //-------------------------------Get all the tasks-------------------------------//
    const FetchAllTodoTasks = async() => {
        try{
            const response = await fetch(`http://localhost:5000/api/tasks`, {
                method:"GET",
            })

            const data = await response.json() ;

            console.log("Home.jsx response: ", response) ;
            console.log("Home.jsx data: ", data) ;

            if(response.ok) { 
                setAllTodos(data) ;
            }
            else {
                console.log("Response in Home.jsx is not ok.")
            }
        }
        catch(error){
            console.log(`Error in Home.jsx : ${error}`) ;
            toast.error("Fetching Error")
        }
    }


    //-------------------------------Update Task-------------------------------//
    const handleEdit = async(id) => {
        try{
            const response = await fetch(`http://localhost:5000/api/update/${id}`, {
                method:"PATCH",
            })

            if(response.ok){
                toast.success("Task status updated")
                FetchAllTodoTasks()
                // location.reload() ; // Reloads the page, Generally we should not use
            }
            else {
                console.log("Update response is not OK") 
                toast.error("Response error") ;
            }
        }
        catch(error){
            console.log("Update Error : ", error) 
            toast.error("Internal server error") ;
        }
    }

    
    //-------------------------------Delete Task-------------------------------//
    const handleRemove = async(id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/delete/${id}`, {
                method:"DELETE" 
            })

            const data = await response.json() ;

            if(response.ok){
                setAllTodos(data)
                await FetchAllTodoTasks()
                toast.success('Task is successfully deleted')
            }
            else {
                toast.error('Some unknown error occur!\n Try again!')
                console.log("Delete response is not OK") 
            }
        }
        catch(error){
            console.log(`Delete Error : ${error}`) ;
            toast.error("Internal server error") ;
        }
    }


    useEffect(() => {
        FetchAllTodoTasks()
    },[]) ;



  return (
    <div className='container'>

            {/*------------------------------Create------------------------------*/}
            <div className='input-part'>

                <h1 className='main-heading'>Todo List</h1>
                <input 
                    className='input-field'
                    type="text" 
                    name="task"
                    value={todo.task}
                    placeholder='Enter Task' 
                    required 
                    autoComplete='off' 
                    onChange={handleChange} 
                />

                <button 
                    className='btn' 
                    type="button"
                    onClick={handleAdd}
                >Add</button>

            </div>
            
            
            <div className="todo-container">

            {
                allTodos.length === 0 
                ? <div className='no-records'><h2>No Records!!</h2></div>
                : <div className='taskContainer'>{
    
                    allTodos.map((TODO,index) => (
                        <div key={index} className='singleTask'>

                            <div className="checkBox" onClick={() => handleEdit(TODO._id)}>
                            {
                                TODO.done == false
                                ? <BsCircleFill className='icon checkbox-icon'/>
                                : <BsFillCheckCircleFill className="icon check-icon"/>
                            }
                            </div>

                            {
                                TODO.done == true
                                ? <strike className="strike">{TODO.task}</strike>
                                : <p className="task">{TODO.task}</p>
                            }

                            <div onClick={() => handleRemove(TODO._id)} >
                                <span><BsFillTrashFill  className="icon"/></span>
                            </div>
                        
                        </div>
                    ))
                }
                </div>
            }
            </div>
        </div>
  )
}

export default Home