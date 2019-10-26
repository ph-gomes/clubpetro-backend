const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const ObjectId = mongoose.Schema.Types.ObjectId;

const FrentistaSchema = mongoose.Schema({
  _id: ObjectId,
  cpf: {
    type: String,
    required: true
  }
});

FrentistaSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Frentista", FrentistaSchema);
