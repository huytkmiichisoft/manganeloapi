import {v2 as cloudinary} from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
cloudinary.config({
    cloud_name:"jungle-z",
    api_key:"927555213464771",
    api_secret:"UFm306BTw3wamziVh0AUrRa8DKY"
})
export const storageCloudinary = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"avatar"
    }
})