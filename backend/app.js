const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Task = require("./models/task");

const app = express();

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/task-list", {useNewUrlParser: true})
  .then(() => {
    console.log("Connected to db!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/tasks", (req, res, next) => {
  const task = new Task({
    title: req.body.title,
    isDone: req.body.isDone
  });
  task.save().then(createdTask => {
    res.status(201).json({
      message: "Task created successfully",
      taskId: createdTask._id
    });
  }).catch(error => {
    res.status(500).json({
      message: "Task creation failed!"
    });
  });
});

app.put("/api/tasks/:id", (req, res, next) => {
  const task = new Task({
    _id: req.body.id,
    title: req.body.title,
    isDone: req.body.isDone
  });
  Task.updateOne({_id: req.params.id}, task).then(result => {
    res.status(200).json({message: 'Update successful'})
  })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update task!"
      });
    });
});

app.get("/api/tasks", (req, res, next) => {
  Task.find().select('-__v')
    .then(documents => {
      res.status(200).json(documents);
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching tasks failed!"
      });
    });
});

app.get("/api/tasks/:id", (req, res, next) => {
  Task.findById(req.params.id).select('-__v')
    .then(documents => {
      res.status(200).json(documents);
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching task failed!"
      });
    });
});

app.delete("/api/tasks/:id", (req, res, next) => {
  Task.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({message: "Task deleted!"});
  })
    .catch(error => {
      res.status(500).json({
        message: "Deleting task failed!"
      });
    });
});

module.exports = app;
