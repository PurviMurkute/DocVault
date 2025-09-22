import React from 'react'
import logo from '../assets/pages.png'
import Button from './Button'
import { Link, useNavigate } from 'react-router'

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <div className='bg-gray-900 w-[95%] md:w-[75%] lg:w-[55%] px-5 py-2 m-1 rounded-full z-10 sticky top-0 mx-auto'>
        <div className='flex justify-between items-center'>
      <Link to="/" className='text-white flex items-center gap-2 '>
        <img src={logo} alt='logo' className='w-[30px]' />
        <p className='text-2xl font-medium font-serif'>DocVault</p>
      </Link>
      <Button btnText="Login" icon="login" variant="red" btnSize="medium" onclick={() => navigate('/login')} />
      </div>
    </div>
  )
}

export default Header
