const multer = require("multer");
const path = require('path')

// 이미지 받았을 때 필터링
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"));
  }
  cb(null, true);
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 서버에 저장될 위치
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // 서버에 저장될 때 파일 이름
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  }
});

var uploadFile = multer({ 
  storage: storage,
  fileFilter: imageFilter
}).single("upload_image");

module.exports = uploadFile;