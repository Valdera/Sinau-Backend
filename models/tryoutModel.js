const mongoose = require('mongoose');
const Exam = require('./examModel');
const User = require('./userModel');

const tryoutSchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.ObjectId,
      ref: 'Exam',
      required: [true, 'Tryout must belong to an exam']
    },
    score: {
      type: Number,
      default: 0
    },
    answer: [
      {
        type: String
      }
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Tryout must belong to an user']
    },
    timeExpired: {
      type: Date
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tryoutSchema.pre('save', async function(next) {
  await this.constructor.updateTryouts(this._id, this.user);
  if (this.isNew) {
    const exam = await Exam.findById(this.exam);
    const { duration } = exam;
    this.timeExpired = Date.now() + duration * 60 * 1000;
  }
  if (this.timeExpired < Date.now()) {
    this.isActive = false;
  }
  next();
});

tryoutSchema.statics.updateTryouts = async function(tryoutId, userId) {
  if (tryoutId && userId) {
    const user = await User.findById(userId);
    const { tryouts } = user;
    if (!tryouts.includes(tryoutId)) {
      tryouts.push(tryoutId);
      await User.findByIdAndUpdate(userId, {
        tryouts
      });
    }
  }
};

const Tryout = mongoose.model('Tryout', tryoutSchema);

module.exports = Tryout;
