const express = require('express');
const router = express.Router();
const { User } = require('../models')
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/loginCheck');
const crypto = require('crypto')
const smtpTransport = require('../config/nodemailer')

// 회원가입
router.post('/signup', isNotLoggedIn, async (req, res, next) => {
  const { email, nickname, password, confirm_password } = req.body

  try {
    if(password !== confirm_password) {
      res.json({
        message: '비밀번호가 서로 일치하지 않습니다.'
      })
      return
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email }, { nickname }],
      },
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
      password: hash,
      provider: 'local'
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
  const { id } = req.user

  try {
    const user = await User.findOne({
      where: { id }
    })

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


// 비밀번호 인증코드 보내기
router.post('/forget-password', isLoggedIn, async (req, res, next) => {
  const { email } = req.body

   try {
    const user = await User.findOne({
      where: { email },
    })

    if (user) {
      // token 생성(인증코드)
      const token = crypto.randomBytes(20).toString('hex')
      
      const mail_options = {
        from: 'CRAB BOARD',
        to: email,
        subject: '[CRAB BOARD] 인증 관련 이메일입니다.',
        html:
        `<p>비밀번호 초기화를 위해서는 아래의 URL을 클릭하여 주세요.</p>` +
        token 
      }

      smtpTransport.sendMail(mail_options, (error, info) => {
        if (error) {
          console.log('nodemailer error', error)
        } else {
          console.log(info.response)
        }
      })

      res.json({
        message: '이메일로 인증코드가 발송되었습니다.',
      })
      
    } 
  } catch (error) {
    next(error)
  }
});

// 비밀번호 재설정하기
router.post('/reset-password', isLoggedIn, async (req, res, next) => {
  const { id } = req.user
  const { token, password } = req.body

  try {
    if(token && password) {
      const hashed_password = await bcrypt.hash(password, 10);

      await User.update({
        password: hashed_password,
      },{
        where: { id }
      })

      res.json({
        message: '비밀번호가 재설정되었습니다. 변경된 비밀번호로 로그인해주세요.',
      })
    }
    
  } catch (error) {
    next(error)
  }
  
});

// 해당 회원 불러오기
router.get('/:id', isLoggedIn, async (req, res, next) => {
  const { id } = req.params
  
  try {
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
  } catch (error) {
    next(error)
  }
})

module.exports = router;
