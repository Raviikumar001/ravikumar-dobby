import React, { useEffect } from 'react'
import axios, { AxiosError } from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { fetchImagesStart, fetchImagesSuccess } from '../store/slices/imageSlices';
import toast, { Toaster } from 'react-hot-toast';
import Placeholder from '../components/Placeholder';
import Appheader from '../components/Appheader';

const MainApp:React.FC = () => {

  const dispatch = useDispatch();
  const {user,token} = useSelector((state:RootState)=> state.auth);
  const {images} = useSelector((state:RootState)=> state.image);
  const fetchTasks = async () => {

    dispatch(fetchImagesStart());
    const stringToken = token ? token?.replace(/"/g, "") : "";
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/v1/api/get-images?id=${user?._id}`,
      { headers: {  Authorization: `Bearer ${stringToken}` } }
      
      );
      console.log(response)
      if(response)
      {  toast.success("Images fetched") ;
          dispatch(fetchImagesSuccess(response.data?.userImages));
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;

      if (err) {
       toast.error(err.response?.data?.error as string)
      }
    }
  };

useEffect(()=> {
  fetchTasks();
}, [])

console.log(images);


  return (
    <div>

<Toaster
  position="top-center"
  reverseOrder={false}
/>

    <Appheader />


    {/* {
    !(images.length>0)?
      <Placeholder />
  } */}

    </div>
  )
}

export default MainApp