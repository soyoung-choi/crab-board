const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/login')

// 로그인
router.post('/token', async (req, res, next) => {
  console.log('req.user', req.user)
  try {
    passport.authenticate('local', (err, user, info) => {
    
      if (err) return next(err)
      if (!user) return res.send(info)
      if (info) {
        return res.status(401).send(info.message);
      }
      
      req.logIn(user, (err) => {
        if (err) return next(err)
        const token = jwt.sign(
          { user_id : user.id },
          'jwt-secret-key',
          { expiresIn: '7d' }
        );
        
        return res.json({ 
          message : "로그인되었습니다.",
          token,
          nickname: user.nickname
        });
      })
    })(req, res, next)
  } catch (error) {
    console.error(error)
  }
})

// 카카오 로그인 시도
router.get('/kakao', passport.authenticate('kakao'))

// 카카오 로그인 성공시 callback 
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/')
})

// 로그아웃
router.get('/logout', async (req, res) => {
  req.logout() // 세션 쿠기가 사라짐

  req.session.destroy((err) => {
    if(err) throw new Error(err)
    return res.status(205).send('로그아웃되었습니다.')
  })
})

module.exports = router;