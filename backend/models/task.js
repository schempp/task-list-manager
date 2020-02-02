const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: {type: String, required: true},
  isDone: {type: Boolean, default: false}
});

module.exports = mongoose.model("Task", taskSchema);
