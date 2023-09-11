const fs = require("fs");

const deleteImg = async (imgPath) => {
      try {
        fs.access(imgPath, (err) => {
          if(err) {
             console.error("User Image does not exists", err);
             return;
          }
          fs.unlink(imgPath, (err) => {
             if(err) {
                console.error("Error in deleting image", err);
                return;
             }
             console.log("Image deleted successfully");
          });
        });
      } catch (error) {
  console.error("Error occured while deleting image", error);
      }
}

module.exports = {deleteImg}