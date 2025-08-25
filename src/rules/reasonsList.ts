import { type ApprovalDecision } from "./approvalRules"

export interface Reason {
  code: string
  message: string
}

export const reasonsList: Record<ApprovalDecision, Reason[]> = {
  approved: [
    { code: 'income_sufficient', message: 'Applicant income meets requirements.' },
    { code: 'credit_good', message: 'Credit history is satisfactory.' },
    { code: 'dti_acceptable', message: 'Debt-to-Income ratio is within acceptable limits.' },
    { code: 'ltv_acceptable', message: 'Loan-to-Value ratio is within acceptable limits.' },
  ],
  referred: [
    { code: 'additional_info_needed', message: 'Further information required for assessment.' },
    { code: 'manual_review', message: 'Application requires manual review.' },
    { code: 'fico_borderline_criteria', message: 'FICO score is borderline.' },
    { code: 'dti_borderline_criteria', message: 'DTI ratio is borderline.' },
    { code: 'ltv_borderline_criteria', message: 'LTV ratio is borderline.' },
  ],
  declined: [
    { code: 'income_insufficient', message: 'Applicant income does not meet requirements.' },
    { code: 'credit_poor', message: 'Credit history is unsatisfactory.' },
    { code: 'dti_too_high', message: 'Debt-to-Income ratio is too high.' },
    { code: 'ltv_too_high', message: 'Loan-to-Value ratio is too high.' },
  ],
}

export function findReason(decision: ApprovalDecision, code: string): Reason | undefined {
  return reasonsList[decision]?.find(reason => reason.code === code)
}
