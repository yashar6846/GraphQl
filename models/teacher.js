const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model("Teacher", teacherSchema);
