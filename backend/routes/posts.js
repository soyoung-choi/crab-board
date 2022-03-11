const express = require('express');
const router = express.Router();
const { Post } = require('../models')
const upload = require('../middlewares/upload')
const fs = require('fs')

// 포스트 목록
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      order: [['created_at', 'DESC']]
    })
    res.json({
      posts: posts
    })
    
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// 포스트 업로드
router.post("/upload", upload, async (req, res, next) => {
  const { title, contents } = req.body
  console.log(req.file.path)

  try {
    // blob형태를 base64로 변환
    const img_data = fs
      .readFileSync(`uploads${req.file.path.split("uploads")[1]}`)
      .toString("base64");

    await Post.create({ 
      title: title,
      contents: contents,
      image: img_data 
    });

    res.json({ 
      image: img_data,
      code: 201,
      message: '포스트 업로드가 완료되었습니다.',
    });

  } catch (error) {
    res.status(400).json({ 
      code: 400,
      message: error.message 
    });
  }
});

module.exports = router;
