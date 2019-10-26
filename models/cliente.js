const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const ObjectId = mongoose.Schema.Types.ObjectId;

const ClienteSchema = mongoose.Schema({
  _id: ObjectId,
  cpf: {
    type: String,
    unique: true,
    required: true
  }
});

ClienteSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Cliente", ClienteSchema);
