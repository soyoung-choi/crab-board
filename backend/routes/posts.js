const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require('multer')
const { Post } = require('../models')

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/upload_image', upload.single('upload_image'), async (req, res) => {
  console.log(req.file)
  const { title } = req.body
  console.log('title', title)
  
  await Post.create({
    title: title,
    image: req.file.filename
  })

  res.status(201).json({
    code: 201,
    message: '포스트 업로드가 완료되었습니다.',
  })
});

module.exports = router;
