const express = require('express');
const router = express.Router();
const { Post } = require('../models')
const upload = require('../middlewares/upload')
const fs = require('fs')

router.post("/upload", upload, async (req, res, next) => {
  console.log(req.file)
  const { title, contents } = req.body
  console.log(title, contents)

  try {
    // blob형태를 base64로 변환
    const imgData = fs
      .readFileSync(`uploads${req.file.path.split("uploads")[1]}`)
      .toString("base64");
    console.log('imgData', imgData)
    // db에 path 저장
    await Post.create({ 
      title: title,
      contents: contents,
      image: imgData 
    });

    res.json({ image: imgData });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: err.message 
    });
  }
});

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, new Date().valueOf() + path.extname(file.originalname));
//     }
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// router.post('/upload', upload.single('upload_image'), async (req, res) => {
//   console.log(req.file)
//   const { title, contents } = req.body
//   console.log(title, contents)
  
//   await Post.create({
//     title: title,
//     contents: contents,
//     image: req.file.filename
//   })

//   res.status(201).json({
//     code: 201,
//     message: '포스트 업로드가 완료되었습니다.',
//   })
// });

module.exports = router;
