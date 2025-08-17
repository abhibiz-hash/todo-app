import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleCheckbox = (e)=>{
     let id = e.target.name
     let index = todos.findIndex(item=>{
       return item.id ===id
     })
     console.log(`index : ${index}`)
     let newTodos = [...todos]
     newTodos[index].isCompleted = !newTodos[index].isCompleted
     setTodos(newTodos)
     console.log(newTodos)
  }
  const handleEdit = () => {

  }
  const handleDelete = () => {

  }
  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 p-4 rounded-xl bg-emerald-100 min-h-[80vh]">
        <div className='addTodo my-5'>
          <h2 className='text-lg font-bold '>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='bg-white rounded-md w-md' />
          <button onClick={handleAdd} className='bg-emerald-600 hover:bg-emerald-800 cursor-pointer text-sm font-bold  text-white px-3 py-1 rounded-md mx-6'>Add</button>
        </div>
        <h1 className='text-2xl font-bold'>Your Todos</h1>
        <div className="todos">
          {todos.map(item => {
            return <div key={item.id} className="todo flex w-md my-3 justify-between">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="buttons">
                <button onClick={handleEdit} className='bg-emerald-600 hover:bg-emerald-800 cursor-pointer text-sm font-bold  text-white px-3 py-1 rounded-md mx-1'>Edit</button>
                <button onClick={handleDelete} className='bg-emerald-600 hover:bg-emerald-800 cursor-pointer text-sm font-bold  text-white px-3 py-1 rounded-md mx-1'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>

    </>
  )
}

export default App
