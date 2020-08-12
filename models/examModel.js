const mongoose = require('mongoose');
const slugify = require('slugify');

const examSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An exam must have a name'],
      trim: true,
      maxlength: [15, 'An exam must have less or equal than 10 characters'],
      minlength: [3, 'An exam must have more or equal than 3 characters']
    },
    slug: {
      type: String
    },
    duration: {
      type: Number,
      required: [true, 'An exam must have a duration']
    },
    price: {
      type: Number,
      required: [true, 'An exam must have a price']
    },
    totalQuestions: {
      type: Number
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    major: {
      type: String,
      enum: ['ipa', 'ips'],
      required: [true, 'An exam must have a major']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//* VIRTUAL
examSchema.virtual('questions', {
  ref: 'Question',
  foreignField: 'exam',
  localField: true
});

//* DOCUMENT MIDDLEWARE
examSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//* QUERY MIDDLEWARE
examSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'questions',
    select: '-__v'
  });
  next();
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
