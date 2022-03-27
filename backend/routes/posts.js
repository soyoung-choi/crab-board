const express = require('express');
const router = express.Router();
const { Post, User } = require('../models')
const upload = require('../middlewares/upload')
const fs = require('fs')
const { isLoggedIn } = require('../middlewares/loginCheck');

// 포스트 목록
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      // 게시글의 작성자
      include: [{
        model: User,
        attributes: ['id', 'nickname', 'email'],
      }],
      order: [['created_at', 'DESC']],
    })
    
    res.json({
      posts: posts,
    })
    
  } catch (error) {
    next(error)
  }
})

// 포스트 업로드
router.post("/upload", isLoggedIn, upload, async (req, res, next) => {
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
      image: img_data,
      user_id: req.user.id
    });

    res.json({ 
      image: img_data,
      message: '포스트 업로드가 완료되었습니다.',
    });

  } catch (error) {
    next(error)
  }
});

// 포스트 삭제
router.delete('/:id', isLoggedIn, async (req, res, next) => {
  const { id } = req.params;

  try {
    await Post.destroy({ where: { id } })
  
    res.json({
      message: '해당 포스트가 삭제되었습니다.'
    });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
