const multer = require('multer');
const Question = require('../models/questionModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/questions');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(
      null,
      `question-${file.originalname.split('.')[0]}-${Date.now()}.${ext}`
    );
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.setExamId = (req, res, next) => {
  if (!req.body.exam) req.body.exam = req.params.examId;
  next();
};

exports.uploadQuestionImage = upload.single('image');
exports.getAllQuestion = factory.getAll(Question);
exports.getQuestion = factory.getOne(Question);
exports.createQuestion = factory.createOne(Question);
exports.updateQuestion = factory.updateOne(Question);
exports.deleteQuestion = factory.deleteOne(Question);
