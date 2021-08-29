const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  name: String,
  age: Number,
  teacherId: String,
});

module.exports = mongoose.model("Lesson", lessonSchema);
