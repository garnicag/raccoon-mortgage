export function debtToIncome(monthlyDebts: number, monthlyIncome: number): number {
  return monthlyDebts / monthlyIncome;
}

export function loanToValue(loanAmount: number, propertyValue: number): number {
  return loanAmount / propertyValue;
}
