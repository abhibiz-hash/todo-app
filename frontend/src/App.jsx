import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])


  const handleEdit = () => {

  }
  const handleDelete = () => {

  }
  const handleAdd = () => {
    setTodos([...todos, { todo, isCompleted: false }])
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
            return <div key={todo} className="todo flex w-md my-3 justify-between">
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
