const Question = require('../models/questionModel');
const factory = require('./handlerFactory');

exports.setExamId = (req, res, next) => {
  if (!req.body.exam) req.body.exam = req.params.examId;
  next();
};

exports.getAllQuestion = factory.getAll(Question);
exports.getQuestion = factory.getOne(Question);
exports.createQuestion = factory.createOne(Question);
exports.updateQuestion = factory.updateOne(Question);
exports.deleteQuestion = factory.deleteOne(Question);
