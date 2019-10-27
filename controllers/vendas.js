const Venda = require("../models/venda");

const transformDate = date => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const lday = new Date(y, m, 0).getDate();

  const yyyymm = `${y}-${("0" + m).slice(-2)}`;

  firstDate = `${yyyymm}-01T00:00:00.000`;
  lastDate = `${yyyymm}-${lday}T23:59:59.999`;

  return { firstDate, lastDate };
};

const countFrentistaVendas = async frentista => {
  return await Venda.countDocuments({
    frentista: frentista._id,
    status: "aprovado"
  });
};

const countFrentistaVendasMes = async (frentista, date) => {
  const { firstDate, lastDate } = transformDate(date);

  return await Venda.countDocuments({
    frentista: frentista._id,
    date: {
      $gte: firstDate,
      $lte: lastDate
    },
    status: "aprovado"
  });
};

const countVendas = async _ =>
  await Venda.countDocuments({ status: "aprovado" });

const countAbastecimentoMes = async (cliente, date) => {
  const { firstDate, lastDate } = transformDate(date);

  return await Venda.countDocuments({
    cliente: cliente._id,
    status: "aprovado",
    date: {
      $gte: firstDate,
      $lte: lastDate
    }
  });
};

const countFrentistaCliente = async (cliente, frentista) => {
  return await Venda.countDocuments({
    status: "aprovado",
    frentista: frentista._id,
    cliente: cliente._id
  });
};

const createVenda = async data => {
  const venda = await Venda.create(data);
  await venda.save();
  return venda;
};

module.exports = {
  countAbastecimentoMes,
  countFrentistaCliente,
  countFrentistaVendas,
  countFrentistaVendasMes,
  countVendas,
  createVenda
};
