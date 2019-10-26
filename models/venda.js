const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const VendaSchema = mongoose.Schema({
  valor: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["aprovado", "reprovado"]
  },
  frentista: { type: ObjectId, ref: "Frentista", required: true },
  cliente: { type: ObjectId, ref: "Cliente", required: true }
});
module.exports = mongoose.model("Venda", VendaSchema);
