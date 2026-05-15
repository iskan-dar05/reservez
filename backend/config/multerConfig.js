const multer = require('multer')



const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/");
    },
    filename: (req, file, cb)=> {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// File validation

const fileFilter = (req, file, cb)=>{
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if(allowedMimeTypes.includes(file.mimetype))
    {
        cb(null, true)
    }else{
        cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WEBP images are allowed.'), false)
    }
}

const fileSizeLimit = 5 * 1024 * 1024; // 5MB


const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: fileSizeLimit
    }
})

module.exports = upload;



