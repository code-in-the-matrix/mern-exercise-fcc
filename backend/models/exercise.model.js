const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    userName: { type: String, required: true },
    description: {type : String},
    date : {type:Date,required :true},
    duration : {type: Number}
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model('Exercise',exerciseSchema)

module.exports = Exercise;