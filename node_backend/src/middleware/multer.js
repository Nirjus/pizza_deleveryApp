const multer = require("multer");
const path = require("path");
const { userImageUploadDerectory, allowedFileType, maxFileSize } = require("../config/uoploadConfig");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, userImageUploadDerectory);
  },
  filename: function (req, file, cb) {

   const extensionName = path.extname(file.originalname);

    const uniqueSuffix = Date.now() + "-" ;
    cb(null, uniqueSuffix + file.originalname.replace(extensionName, "") + extensionName);
  },
});


const fileFilter =  (req, file, cb) => {

  const extensionName = path.extname(file.originalname);
  if(!allowedFileType.includes(extensionName.substring(1))){
  
    return  cb(new Error("File type not support"), false)
  }
  // To accept the file pass `true`, like so:
  cb(null, true)

}

const upload = multer({ storage: storage, limits: {fileSize: maxFileSize}, fileFilter });

module.exports = upload;
