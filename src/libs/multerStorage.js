const multer = require("multer");

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (_, file, cb) {
    const checkImage = checkImageType(file);
    if (checkImage) {
      cb(null, "uploads");
    } else {
      cb("jpeg or png onliy");
    }
  },
  filename: function (req, file, cb) {
    cb(null, imageName(file));
  },
});

const checkImageType = (file) => {
  const filetypes = /jpeg|jpg|png/;
  // const extname = filetypes.test(Path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  return mimetype;
};

const imageName = (file) => {
  return file.fieldname + "-" + Date.now();
};

const upload = multer({ storage: storage });
module.exports = { upload, checkImageType };
