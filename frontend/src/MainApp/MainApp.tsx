import React, { useEffect } from 'react'
import axios, { AxiosError } from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { fetchImagesStart, fetchImagesSuccess } from '../store/slices/imageSlices';
import toast, { Toaster } from 'react-hot-toast';
import Placeholder from '../components/Placeholder';
import Appheader from '../components/Appheader';
import ImageList from '../components/ImagesList';
import { Link } from 'react-router-dom';
const MainApp:React.FC = () => {

  const dispatch = useDispatch();
  const {user,token} = useSelector((state:RootState)=> state.auth);
  const {images} = useSelector((state:RootState)=> state.image);

  const fetchImages = async () => {

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
  fetchImages();
}, [])

console.log(images);


  return (
    <div>

<Toaster
  position="top-center"
  reverseOrder={false}
/>

    <Appheader />


    <div
    className='
    mr-10
  ml-10
 md:mr-[20%]
 md:ml-[20%]
 lg:mr-[30%]
 lg:ml-[30%]
    grid
    grid-cols-1
    md:grid-cols-2
    
    gap-1
    '
    >
    <Link to="/app/upload">
        <button
          type="submit"
          className="block 
          
          
                text-white
                rounded-full
                
                mt-5
                p-2
                bg-[#6420AA]
                w-full
              disabled:bg-gray-400
              mb-5
              
                "
        >
          Upload Images
        </button>
      </Link>

      <Link to="/app/search">
        <button
          type="submit"
          className="block 
          
          
                text-white
                rounded-full
                
                mt-5
                p-2
                bg-[#6420AA]
                w-full
              disabled:bg-gray-400
              mb-5
              
                "
        >
          Search Images
        </button>
      </Link>
    </div>

    {
    !(images.length>0)?
      <Placeholder />:
      <div
      className="
      mt-10
      flex
      justify-center
      mr-[10%]
      ml-[10%]

      "
      >
      
      <ImageList Images={ images} />

      </div>
  }

    


    </div>
  )
}

export default MainApp