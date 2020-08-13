const Exam = require('../models/examModel');
const factory = require('./handlerFactory');

exports.getAllExam = factory.getAll(Exam);
exports.getExam = factory.getOne(Exam, { path: 'questions' });
exports.createExam = factory.createOne(Exam);
exports.updateExam = factory.updateOne(Exam);
exports.deleteExam = factory.deleteOne(Exam);
