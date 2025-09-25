import React from 'react'

const FeatureCard = ({ title, description, icon}) => {
  return (
    <div className='flex justify-evenly items-center w-[310px] md:w-[400px] border-1 border-blue-200 rounded-md px-3 md:px-7 py-5 shadow my-2 mx-4 hover:bg-blue-100 transition-transform duration-150'>
        <div className='w-[50px]'>
            <p className='text-2xl'>{icon}</p>
        </div>
        <div className='flex flex-col gap-1'>
            <h4 className='font-medium text-md'>{title}</h4>
            <p className='text-gray-500 text-sm'>{description}</p>
        </div>
    </div>
  )
}

export default FeatureCard;
