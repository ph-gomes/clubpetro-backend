const server = require("http").Server();
const io = require("socket.io")(server);
const mongoose = require("mongoose");

const Cliente = require("./models/cliente");
const Frentista = require("./models/frentista");

const vendas = require("./controllers/vendas");
const validate = require("./controllers/validation");

const port = process.env.PORT || 3030;
const urlMongoDB = process.env.MONGODB || "mongodb://localhost/clubpetro";

io.on("connection", socket => {
  console.log(`New Socket id: ${socket.id}`);

  socket.on("newSale", async msg => {
    const frentista = await Frentista.findOne({ cpf: msg.frentista });
    const cliente = await Cliente.findOne({ cpf: msg.cliente });

    const date = msg.date ? new Date(msg.date) : new Date();
    let result = {};

    if (frentista && cliente && msg.valor) {
      const resultFVM = await vendas.countFrentistaVendasMes(frentista, date);
      const resultFV = await vendas.countFrentistaVendas(frentista);
      const resultVT = await vendas.countVendas();
      const resultAM = await vendas.countAbastecimentoMes(cliente, date);
      const resultFC = await vendas.countFrentistaCliente(cliente, frentista);

      const errors = validate(
        resultFVM,
        resultFV,
        resultVT,
        resultAM,
        resultFC
      );

      const data = {
        valor: parseFloat(msg.valor),
        date,
        status: "",
        cliente: cliente._id,
        frentista: frentista._id
      };

      if (errors.length > 0) {
        result = { success: false, errors };
        data.status = "reprovado";
      } else {
        result = { success: true };
        data.status = "aprovado";
      }

      console.log(cliente._id);

      const venda = await vendas.createVenda(data);
      socket.emit("verifiedSale", {
        ...result,
        venda
      });
    } else {
      socket.emit("verifiedSale", {
        success: false,
        error: "invalid fields",
        dataSend: { ...msg }
      });
    }
  });
});

mongoose
  .connect(urlMongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(port, () => console.log(`Running on ${port}`));
  })
  .catch(e => console.log("Error starting server"));
