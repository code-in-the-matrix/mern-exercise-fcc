const express = require("express");
const router = express.Router();
const Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json(err));
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.json(err));
});

router.route("/add").post((req, res) => {
  const userName = req.body.userName;
  const duration = Number(req.body.duration);
  const description = req.body.description;
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({ userName, description, date, duration });
  newExercise
    .save()
    .then(() => res.json("Exercise added"))
    .catch((err) => res.status(400).json(err));
});
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted"))
    .catch((err) => res.status(404).json(err));
});
router.route("/:id").patch((req, res) => {
  Exercise.findByIdAndUpdate(req.params.id,req.body)
    .then(() => res.json("Exercise deleted"))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
