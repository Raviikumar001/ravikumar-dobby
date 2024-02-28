import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';
const Appheader:React.FC = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  
  function Logout(){
    dispatch(logout())
    navigate("/");
  }

  return (
    <div className=''>
        <div className='flex justify-around p-3 '>
            <div className='flex gap-1 items-center'>
              <Link to="/app">              
            <h2 className='font-bold text-xl'>PhotoUp
            </h2>
              </Link>
            <img src='/images/camera.jpg' className='h-8 inline-block' alt='camera'/>
            </div>


            <button 
            onClick={Logout}
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