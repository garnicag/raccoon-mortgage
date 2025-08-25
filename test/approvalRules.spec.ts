const approvalRules = require('../src/rules/approvalRules');

describe('approvalRules', () => {
  describe('after receiving all the necessary information', () => {
    it('should return "approve" if the applicant is eligible', () => {
      const applicant = {
        name: "John Doe",
        monthlyIncome: 5000,
        monthlyDebts: 1000,
        loanAmount: 300000,
        propertyValue: 400000,
        fico: 720,
        occupancyType: "primary",
        saveData: false
      };

      const expected = {
        decision: "approved",
        dti: 0.2,
        ltv: 0.75,
        reasons: ["credit_good", "dti_acceptable", "ltv_acceptable"]
      };

      expect(approvalRules.getApprovalDecision(applicant)).toEqual(expected);
    });

    it('should return "referred" if the applicant is eligible but needs further review', () => {
      const applicant = {
        name: "John Doe",
        monthlyIncome: 7200,
        monthlyDebts: 1100,
        loanAmount: 340000,
        propertyValue: 410000,
        fico: 752,
        occupancyType: "primary",
        saveData: false
      };

      const expected = {
        "decision": "referred",
        "dti": 0.1527777777777778,
        "ltv": 0.8292682926829268,
        "reasons": ["ltv_borderline_criteria", "manual_review", "additional_info_needed"]
      };

      expect(approvalRules.getApprovalDecision(applicant)).toEqual(expected);
    });

    it('should return "declined" if the applicant is not eligible', () => {
      const applicant = {
        name: "John Doe",
        monthlyIncome: 7200,
        monthlyDebts: 1100,
        loanAmount: 340000,
        propertyValue: 410000,
        fico: 622,
        occupancyType: "primary",
        saveData: false
      };

      const expected = {
        "decision": "declined",
        "dti": 0.1527777777777778,
        "ltv": 0.8292682926829268,
        "reasons": ["credit_poor", "dti_too_high", "ltv_too_high"]
      };

      expect(approvalRules.getApprovalDecision(applicant)).toEqual(expected);
    });
  });
});
