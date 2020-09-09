const Tryout = require('../models/tryoutModel');
const factory = require('./handlerFactory');

exports.getAllTryout = factory.getAll(Tryout);
exports.getTryout = factory.getOne(Tryout, 'exam user');
exports.createTryout = factory.createOne(Tryout);
exports.updateTryout = factory.updateOne(Tryout);
exports.deleteTryout = factory.deleteOne(Tryout);
