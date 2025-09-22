import React from 'react'
import { Routes, Route } from 'react-router';
import Home from './views/Home'
import Register from './views/Register';
import Login from './views/Login';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
    </Routes>
  )
}

export default App
