import React from 'react'

const Appheader:React.FC = () => {
  return (
    <div className=''>
        <div className='flex justify-around p-3 '>
            <div className='flex gap-1 items-center'>
            <h2 className='font-bold text-xl'>PhotoUp
            </h2>
            <img src='/images/camera.jpg' className='h-8 inline-block' alt='camera'/>
            </div>


            <button 
            className='
            p-3
            border
            text-white
            rounded-full  
                bg-[#6420AA]
            '
            >Logout</button>
        </div>
    </div>
  )
}

export default Appheader