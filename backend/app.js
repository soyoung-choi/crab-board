const dotenv = require('dotenv')
dotenv.config()

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors')
const passport = require('passport')
const passportConfig = require('./passport')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const helmet = require('helmet')
const hpp = require('hpp')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts')
const authRouter = require('./routes/auth')

const { sequelize } = require('./models')

const app = express();
app.use(cors({
  origin: true,
  credentials: true,
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공')
  })
  .catch((error) => {
    console.error(error)
  })


if(process.env.NODE_ENV === "production") {
  // 버그해결을 위해 사용자정보를 로그에 남김
  app.use(morgan('combined')) 
  app.use(helmet({
    contentSecurityPolicy: false
  }))
  app.use(hpp())
} else {
  app.use(morgan('dev'))
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));


passportConfig()

// req.session
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET, // 서명에 필요한 값
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      secure: false, // https일 때 적용
    },
    store: new FileStore()
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) =>{
  next(createError(404));
});

// error handler
app.use((err, req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
