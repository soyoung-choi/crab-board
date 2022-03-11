const multer = require("multer");
const path = require('path')
const fs = require('fs')

// uploads 폴더 없으면 생성
fs.readdir("uploads", (err) => {
  if (err) {
    fs.mkdirSync("uploads");
  }
});

// 이미지 받았을 때 필터링
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("*.jpg, *.jpeg, *.png, *.gif 파일만 업로드가 가능합니다."));
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 서버에 저장될 위치
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // 서버에 저장될 때 파일 이름
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  }
});

const uploadFile = multer({ 
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("upload_image");

module.exports = uploadFile;