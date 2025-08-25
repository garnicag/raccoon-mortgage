const ratios = require('../src/rules/ratios');

describe('ratios', () => {
  describe('after receiving all the necessary information', () => {
    it('should calculate the correct debt to income (DTI) ratio', () => {
      const monthlyDebts = 200;
      const monthlyIncome = 1000;

      const expected = 0.2;

      expect(ratios.debtToIncome(monthlyDebts, monthlyIncome)).toEqual(expected);
    });

    it('should calculate the correct loan to value (LTV) ratio', () => {
      const loanAmount = 200000;
      const propertyValue = 250000;

      const expected = 0.8;

      expect(ratios.loanToValue(loanAmount, propertyValue)).toEqual(expected);
    });
  });
});
