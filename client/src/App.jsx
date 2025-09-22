import React from 'react'
import { Routes, Route } from 'react-router';
import Home from './views/Home'
import Register from './views/Register';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/register' element={<Register />}></Route>
    </Routes>
  )
}

export default App
