const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Question = require('../../models/questionModel');
const User = require('../../models/userModel');
const Exam = require('../../models/examModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB Connection succesfully'));

let exams;
let questions;

// const questions = JSON.parse(
//   fs.readFileSync(`${__dirname}/questions.json`, 'utf-8')
// );
// const exams = JSON.parse(fs.readFileSync(`${__dirname}/exams.json`, 'utf-8'));

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

const importDataUsers = async () => {
  try {
    await User.create(users);
    console.log('Data sucessfully loaded!');
  } catch (err) {
    console.log(err);
  }
};

const importDataExams = async () => {
  try {
    await Exam.create(exams);
    console.log('Data sucessfully loaded!');
  } catch (err) {
    console.log(err);
  }
};

const importDataQuestions = async () => {
  try {
    await Question.create(questions);
    console.log('Data sucessfully loaded!');
  } catch (err) {
    console.log(err);
  }
};

const deleteDataUsers = async () => {
  try {
    await User.deleteMany();
    console.log('Data sucessfully deleted!');
  } catch (err) {
    console.log(err);
  }
};

const deleteDataExams = async () => {
  try {
    await Exam.deleteMany();
    console.log('Data sucessfully deleted!');
  } catch (err) {
    console.log(err);
  }
};

const deleteDataQuestions = async () => {
  try {
    await Question.deleteMany();
    console.log('Data sucessfully deleted!');
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--importUsers') {
  importDataUsers();
} else if (process.argv[2] === '--deleteUsers') {
  deleteDataUsers();
} else if (process.argv[2] === '--importExams') {
  importDataExams();
} else if (process.argv[2] === '--deleteExams') {
  deleteDataExams();
} else if (process.argv[2] === '--importQuestions') {
  importDataQuestions();
} else if (process.argv[2] === '--deleteQuestions') {
  deleteDataQuestions();
}
