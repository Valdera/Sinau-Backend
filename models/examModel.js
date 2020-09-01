const mongoose = require('mongoose');
const slugify = require('slugify');

const examSchema = new mongoose.Schema(
  {
    examName: {
      type: String,
      required: [true, 'An exam must have a name'],
      trim: true,
      maxlength: [15, 'An exam must have less or equal than 10 characters'],
      minlength: [3, 'An exam must have more or equal than 3 characters']
    },
    sessions: [
      {
        type: String
      }
    ],
    year: {
      type: Number,
      required: [true, 'An exam must have a year']
    },
    examType: {
      type: String,
      required: [true, 'An exam must have a type'],
      enum: ['simak', 'umugm', 'utbk']
    },
    examSession: {
      type: String,
      required: [true, 'An exam must have an exam session name']
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
    createdAt: {
      type: Date,
      default: Date.now()
    },
    major: {
      type: String,
      enum: ['ipa', 'ips'],
      required: [true, 'An exam must have a major']
    },
    questions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Question'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//* VIRTUAL
// examSchema.virtual('questions', {
//   ref: 'Question',
//   foreignField: 'exam',
//   localField: true
// });

//* DOCUMENT MIDDLEWARE
examSchema.pre('save', function(next) {
  this.slug = slugify(this.examName, { lower: true });
  next();
});

//* QUERY MIDDLEWARE
// examSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'questions',
//     select: '-__v'
//   });
//   next();
// });

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
