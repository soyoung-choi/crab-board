const passport = require('passport')
const local = require('./localStrategy')
const kakao = require('./kakaoStrategy')
const { User } = require('../models')

module.exports = () => {
  // 로그인 성공을 하면 세션을 저장하는 코드
  passport.serializeUser((user, done) => {
    console.log('유저정보', user)
    done(null, user.id)
  })

  // 세션이 있을때 세션정보를 꺼내주는 코드
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } })
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  })
  
  local()
  kakao()
}
