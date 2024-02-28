

import { Image } from "../store/slices/imageSlices";
type ImageProps ={
    Images: Image[]
}

const ImageList: React.FC<ImageProps> = ({ Images }) => {
  




  return (
    <>
      <div className="flex div-center gap-2 flex-wrap mb-10">
        {Images.map((item) => (
          <div key={item._id} className="max-w-xs bg-white border border-gray-200 rounded-lg shadow min-h-min">
          
              <img className="rounded-t-lg img-height" src={item.image} alt={item.imageName} />
           
            <div className="p-5">
             
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{item.imageName}</h5>
             
            </div>
            
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageList;