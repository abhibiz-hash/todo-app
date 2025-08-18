import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })

    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
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
          {todos.length === 0 && <div className='mx-[44%] my-30'> No Todos to display</div>}
          {todos.map(item => {
            return <div key={item.id} className="todo flex w-md my-3 justify-between">
              <div className='flex gap-5 max-w-[60%]'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons">
                <button onClick={(e)=>handleEdit(e,item.id)} className='bg-emerald-600 hover:bg-emerald-800 cursor-pointer text-sm font-bold  text-white px-3 py-1 rounded-md mx-1'>Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-emerald-600 hover:bg-emerald-800 cursor-pointer text-sm font-bold  text-white px-3 py-1 rounded-md mx-1'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>

    </>
  )
}

export default App
