const express = require('express');
const router = express.Router();
const { Post, User } = require('../models')
const upload = require('../middlewares/upload')
const fs = require('fs')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/login')

// 포스트 목록
router.get('/', async (req, res, next) => {
  console.log('session', req.session)
  console.log(req.user)
  console.log(req.isAuthenticated())
  
  try {
    const posts = await Post.findAll({
      // 게시글의 작성자
      // include: {
      //   model: User,
      //   attributes: ['id', 'nickname']
      // },
      order: [['created_at', 'DESC']]
    })
    res.status(200).json({
      posts: posts,
      user: req.user,
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
  console.log(req.user)
  console.log(req.session)

  try {
    // blob형태를 base64로 변환
    const img_data = fs
      .readFileSync(`uploads${req.file.path.split("uploads")[1]}`)
      .toString("base64");

    await Post.create({ 
      title: title,
      contents: contents,
      image: img_data,
      // user_id: req.user.id
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
