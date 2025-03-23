import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(dataUri) {
  // Upload an image
  const result = await cloudinary.uploader
    .upload(dataUri, {
      folder: "uploads",
    })
    .catch((error) => {
      console.log(error);
    });

  return result;
}

export const upload = multer({ storage: multer.memoryStorage() });


// const removeImage = async(publicId) =>{
//     try{
//         const res = await cloudinary.v2.uploader.destroy(publicId)
//     } catch(error){
//         console.log(error)
//     }
// }