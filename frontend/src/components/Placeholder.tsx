import React from "react";
import { Link } from "react-router-dom";
const Placeholder: React.FC = () => {
  return (
    <div
      className="text-center
      md:mr-[30%]
      
      md:ml-[30%]
     

    flex 
    flex-col
    "
    >
      <img
        src="/images/camera.jpg"
        className="h-40
        mt-5
    rounded-lg
    object-contain
    
    "
        alt="camera"
      />
      <p>Looks like you don't have Photos</p>
      Go Ahead and Upload!
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
          Upload
        </button>
      </Link>
    </div>
  );
};

export default Placeholder;
