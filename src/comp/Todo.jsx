import react ,{useState}from "react"
import Todocss from "./todo.module.css"
import { toast } from 'react-hot-toast'

const todoData=[
    {todoTask:"Buy Bike",completed:false},
    {todoTask:"Buy Car",completed:false}

  ]
function Todo(){
  const[task,setTask]=useState("")
  const [alltodo,setAllTodo]=useState(todoData);
  const[complete,setComplete]=useState()
  const[remaining,setRemaining]=useState()

  function handleForm(e){
    e.preventDefault()
    if(!task){
      toast.error("Please Add task ☹️")
    }else{
      let isVerified=alltodo.some((value,index)=>{
        return value.todoTask.toLowerCase()===task.toLowerCase()
      })
      if(isVerified){
        toast.error("Task already added")
        setTask("")
      }else{
        setAllTodo([...alltodo,{todoTask:task,completed:false}]);
        toast.success("Task added successfully")
        setTask("")
       }

      }

      
    
  }
  function handleChange(e){
    setTask(e.target.value)
    console.log(`${task}`)

  }
  function handleCheckbox(id){
    const copyofAllTodos = [...alltodo];
    copyofAllTodos[id].completed = !copyofAllTodos[id].completed;
    setAllTodo(copyofAllTodos);
   
}

  function handleDelete(id){
    console.log(id);
    const deletedValue=alltodo.filter((value,index)=>
       { return index!==id

       })
    console.log(deletedValue)
    setAllTodo(deletedValue)
    

  }
  function handleUpdate(id){
    const copyofAllTodos=[...alltodo]
    let oldTask=copyofAllTodos[id].todoTask
    console.log(oldTask)
    let newTask=prompt(`Update Task:-${oldTask}`,oldTask)
    const newOdj={todoTask:newTask,completed:false}
   copyofAllTodos.splice(id,1,newOdj)
    setAllTodo(copyofAllTodos)

  }
  function handleClearAll(){
    setAllTodo([])

  }


  return(
   <div>
     <div className={Todocss.main}>
      <div className={Todocss.todo}>
        <h1>Todo Application</h1>
        <form onSubmit={handleForm}>
          <input type="text" className={Todocss.input_box} value={task} onChange={handleChange}/>
          <input type="submit" value="Add Task"className={Todocss.btn} />
          <ul>
            {alltodo.length===0?<h5>No Task Added 😕</h5>:alltodo.map((items,index) => (
              <li key={index}>
                <input type="checkbox" checked={items.completed} onChange={() => handleCheckbox(index)}/>
                <span style={{ textDecoration: items.completed ? "line-through" : "none" }}>{items.todoTask}</span>
                <i className="bi bi-trash3 text-danger float-end"onClick={()=>handleDelete(index)}></i>
                <i className="bi bi-pencil-square text-success float-end me-2" onClick={()=>handleUpdate(index)}></i>
           </li>
              ))}

          </ul>
          
            
        </form>
        <button className={Todocss.btn_clear} onClick={handleClearAll}>Clear All Task</button>
      </div>
 
    </div>
   </div>

  )
}
export default Todo