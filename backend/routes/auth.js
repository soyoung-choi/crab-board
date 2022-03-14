const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/auth')

// 로그인
router.post('/token', isNotLoggedIn, async (req, res, next) => {
  try {
    passport.authenticate('local', (err, user, info) => {
      // 서버에 에러가 있는 경우
      if (err) return next(err);
      
      if (info) {
        // 로직 상 에러가 있는 경우
        return res.status(401).json({
          message: info.message
        })
      }

      return req.login(user, (err) => {
        if (err) return next(err)
        
        const token = jwt.sign(
          { user_id : user.id },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );
        
        res.json({ 
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
  req.session.destroy();

  return res.json({
    message: '로그아웃되었습니다.'
  })

})

module.exports = router;