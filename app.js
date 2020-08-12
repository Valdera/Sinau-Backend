const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

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

module.exports = app;
