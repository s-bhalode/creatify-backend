const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary'); 



// Multer config 
// const designerStorage = multer({
//     storage : multer.diskStorage({}),
//     fileFilter : (req, file, cb) => {
//         let ext = path.extname(file.originalname);
//         if(ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png'){
//             cb(new Error('Unsupported file type !'), false );
//             return;
//         }
//         cb(null, true);
//     },
//     params : {
//         folder : 'designerMedia',
//         allowedFormates : ['png', 'jpg', 'jpeg']
//     }
// });

const designerStorage = new CloudinaryStorage({
    cloudinary : cloudinary,
    // params : async(req, file) => {
        // console.log(req.params);
        // return{
            // designerStorage.folder = 'designerMedia';
            // designerStorage.allowedFormates = ['png', 'jpg', 'jpeg'];
            // designerStorage.public_id = file.originalname + '-' + Date.now();
            // console.log(designerStorage.folder);
            // console.log(designerStorage.allowedFormates);
            // console.log(designerStorage.public_id);
        // }
    // }
        folder : 'designerMedia',
        allowedFormats : ['jpg', 'png'],
        filename : async (req, file, cb) => {
            console.log(file);
            cb(undefined, file.fieldname + '-' + Date.now());
        },
        
});


const recruiterStorage = multer({
    storage : multer.diskStorage({}),
    fileFilter : (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if(ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png'){
            cb(new Error('Unsupported file type !'), false);
            return;
        }
        cb(null, true);
    },
    params : {
        folder : 'recruiterMedia',
        allowedFormates : ['png', 'jpg', 'jpeg']
    }
});

var designerUpload = multer({storage : designerStorage});
var recruiterUpload = multer({storage : recruiterStorage});


module.exports = {
    designerUpload,
    recruiterUpload
}