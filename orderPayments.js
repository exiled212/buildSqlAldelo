module.exports =  `
INSERT INTO OrderPayments (
  PaymentDateTime,
  CashierID,
  OrderID,
  PaymentMethod,
  AmountTendered,
  AmountPaid,
  EmployeeComp,
  RowGUID
) VALUES (
  '#{PaymentDateTime}',
  731,
  1,
  2,
  205200,
  205200,
  0,
  '#{RowGUID}'
);
`;