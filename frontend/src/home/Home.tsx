import React from "react";
import { Link } from "react-router-dom";


const Home: React.FC = () => {
  return (
    <div>
      <div className="grid justify-center h-screen">
        <div
          className="
       relative
        grid place-content-center
        border
        rounded-lg
        shadow-lg
        mt-[20%]
        p-10
        border-gray-300
        h-[80%]
        "
        >
          <img
            src="/images/home2.jpg"
            alt="forests"
            className="
            z-10
           object-cover h-48 w-80
           rounded-xl
           shadow-xl

           "
          />
          <img
            src="/images/home3.jpg"
            alt="forests"
            className="
            absolute
            top-40
            left-10
            z-1
            rotate-[10deg]
           object-cover h-48 w-80
           rounded-xl
           shadow-xl

           "
          />

          <h2
            className="mt-5 text-center
          text-xl font-semibold
          "
          >
            Modern way to upload Images
          </h2>

          <button
            className="bg-[#6420AA]
          mt-3
          text-white
          border
          border-white
          p-3
          rounded-full

          "
          >
            <Link
            to="/accounts"
            >
            Get Started
            
            </Link>

          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
