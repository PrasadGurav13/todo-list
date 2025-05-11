import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddTask from './pages/AddTask'
import EditTask from './pages/EditTask'

function App() {

  return (
    <div className='min-h-screen bg-gray-200'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<AddTask />} />
        <Route path='/edit/:id' element={<EditTask />} />
      </Routes>
    </div>
  )
}

export default App
