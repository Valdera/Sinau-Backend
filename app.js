const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const AppError = require('./utils/appError');

const userRouter = require('./routes/userRoutes');
const examRouter = require('./routes/examRoutes');
const questionRouter = require('./routes/questionRoutes');
const tryoutRouter = require('./routes/tryoutRoutes');

const globalErrorHandler = require('./controller/errorController');

const app = express();

// Security HTTP Headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit Request from same IP
const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour'
});

app.use('/api', limiter);

// Body parser, reading data from the body into req.body
app.use(
  express.json({
    limit: '10kb'
  })
);

// Data sanitation againts NoSQL Injection
app.use(mongoSanitize());

// Data sanitation againts XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: []
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Request Time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//* ROUTES
app.use('/api/users', userRouter);
app.use('/api/questions', questionRouter);
app.use('/api/exams', examRouter);
app.use('/api/tryouts', tryoutRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
