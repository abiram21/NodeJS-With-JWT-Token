const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  sex: { type: String, required: true },
  dob: { type: String, required: true },
  degree: {type: mongoose.Schema.Types.ObjectId, ref:'Degree'},
  studentImage: { type: String },
});

module.exports = mongoose.model("Student", studentSchema);
