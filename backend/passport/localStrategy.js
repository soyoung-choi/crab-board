const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const { User } = require('../models')

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passowrdField: 'password',
    session: true,
    passReqToCallback : true, // 콜백 함수에 req 객체를 넘길지 여부
  },  async (req, email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } })

      if(user) {
        const result = await bcrypt.compare(password, user.password)
        
        if(result) {
          done(null, user)
        } else {
          return done(null, false, {
            message: '비밀번호가 일치하지 않습니다.'
          })
        } 
      } else {
        return done(null, false, {
          message: '존재하지 않은 회원입니다.'
        })
      }
    } catch (error) {
      return done(error)
    }
  }))
}