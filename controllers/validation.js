module.exports = validate = (
  resultFVM,
  resultFV,
  resultVT,
  resultAM,
  resultFC
) => {
  const errors = [];

  if (resultFVM >= 20)
    errors.push({
      error: 101,
      msg: "Máximo de vendas por mes excedido"
    });
  if (resultFV >= resultVT * 0.2)
    errors.push({
      error: 102,
      msg: "Máximo de vendas excedido"
    });
  if (resultAM >= 7)
    errors.push({
      error: 103,
      msg: "Máximo de abastecimentos por mes excedido"
    });
  if (resultFC >= 3)
    errors.push({
      error: 104,
      msg: "Máximo de vendas do frentista para o cliente excedido"
    });

  return errors;
};
