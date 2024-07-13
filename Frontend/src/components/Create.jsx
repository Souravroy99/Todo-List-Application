import { useState } from 'react'

const Create = () => {

  const [todo, setTodo] = useState({
      task:"",
  });

  const handleChange = (e) => {
      const name = e.target.name
      const value = e.target.value 

      setTodo((prev) => ({
          ...prev,
          [name]: value,
      }))
  }
 
  const handleAdd = async() => {
    if(todo.task === "") {
      alert("Add a task") ;
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
              location.reload() ; // Reloads the page

              setTodo({
                  task:"",
              }) ;
              alert('Successfully added') ;
          }
          else {
              alert('Low Connectivity!') ;
              console.log("Response ERROR in Create.jsx ") ;
          }
      }
      catch(error) {
          console.log("ERROR in Create.jsx : ", error) ;
      }
    }

  return (
    <div>

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
  )
}

export default Create





/*
  import {toast} from 'react-toastify'
  import { ToastContainer } from 'react-toastify'

      <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition: Bounce
      bodyClassName="toastBody"
      />

*/