const multer = require("multer");
const path = require("path");
const ALLOWED_FILE_EXTENSION =["jpg", "png", "jpeg"];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/product')
    },
    filename: function (req, file, cb) {
     const extensionName = path.extname(file.originalname);
     cb(null, Date.now() + "-" + file.originalname.replace(extensionName,"") + extensionName)
    }
  })

  const fileFilter = (req, file, cb) => {
  const extensionName = path.extname(file.originalname);
  if (!ALLOWED_FILE_EXTENSION.includes(extensionName.substring(1))) {
    return cb(new Error("File Type Not Allowed"), false);
  }
  cb(null, true);
};
  const upload = multer({ storage: storage ,fileFilter})

  module.exports = upload