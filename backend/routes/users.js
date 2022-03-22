const express = require('express');
const router = express.Router();
const { User } = require('../models')
const bcrypt = require('bcrypt')
const { isLoggedIn } = require('../middlewares/loginCheck');

// 회원가입
router.post('/signup', async (req, res, next) => {
  const { email, nickname, password, confirm_password } = req.body
  try {
    
    if(password !== confirm_password) {
      res.send({
        message: '비밀번호가 서로 일치하지 않습니다.'
      })
      return
    }
    const user = await User.findOne({
      where: { email }
    })

    if(user) {
      res.json({
        message: '이미 존재하는 회원입니다.'
      })
      return
    }
    
    // 12의 숫자가 더 높을 수록 복잡화, 소요시간은 오래걸림
    const hash = await bcrypt.hash(password, 12) 

    await User.create({
      email,
      nickname,
      password: hash
    })

    res.json({
      message: '회원가입이 정상적으로 처리되었습니다. 로그인 후 이용해주세요.'
    })

    return res.redirect('/auth/token');

  } catch (error) {
    next(error)
  }
});


// 해당 유저의 프로필 보기
router.get('/profile', isLoggedIn, async (req, res, next) => {

  const user = await User.findOne({
    where: { id: req.user.id }
  })

  try {
    res.json({
      profile: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        provider: user.provider,
        created_at: user.createdAt
      },
    })
  } catch (error) {
    next(error)
  }
})

// 해당 회원 불러오기
router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const user = await User.findOne({ where: { id } })

  if(user) {
    res.json({
      id: user.id,
      nickname: user.nickname,
      email: user.email
    })
  } else {
    res.json({
      message: '해당 유저를 찾을 수 없습니다.'
    })
  }
})

module.exports = router;
