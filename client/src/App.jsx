import React from 'react'
import { Routes, Route } from 'react-router';
import Home from './views/Home'
import Register from './views/Register';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import GoogleLogin from './components/GoogleLogin';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/google-success' element={<GoogleLogin />}></Route>
      <Route path='dashboard/images' element={<Dashboard />}></Route>
      <Route path="dashboard/pdf's" element={<Dashboard />}></Route>
      <Route path='dashboard/trash' element={<Dashboard />}></Route>
      <Route path="dashboard/imp's" element={<Dashboard />}></Route>
    </Routes>
  )
}

export default App
