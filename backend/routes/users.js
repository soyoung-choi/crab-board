const express = require('express');
const router = express.Router();
const { User } = require('../models')
const bcrypt = require('bcrypt')

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
      res.status(404).json({
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

    res.status(200).json({
      message: '회원가입이 정상적으로 처리되었습니다. 로그인 후 이용해주세요.'
    })

  } catch (error) {
    next(error)  
  }
});

module.exports = router;
