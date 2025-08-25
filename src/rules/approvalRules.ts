import { debtToIncome, loanToValue } from "./ratios"
import { getReasonsForDecision } from "./reasonsPicker"
import { MIN_FICO_APPROVED, MAX_DTI_APPROVED, MAX_LTV_APPROVED, MIN_FICO_REFERRED, MAX_DTI_REFERRED, MAX_LTV_REFERRED } from "../constants/approvalThresholds"

export type ApprovalDecision = 'approved' | 'referred' | 'declined'

export interface ApplicantData {
  name: string
  monthlyIncome: number
  monthlyDebts: number
  loanAmount: number
  propertyValue: number
  fico: number
  occupancyType: string
  saveData: boolean
}

export interface ApprovalResult {
  decision: ApprovalDecision,
  reasons: string[],
  dti: number,
  ltv: number
}

export function getApprovalDecision(applicant: ApplicantData): ApprovalResult {
  const dti = debtToIncome(applicant.monthlyDebts, applicant.monthlyIncome)
  const ltv = loanToValue(applicant.loanAmount, applicant.propertyValue)
  const decision = decisionMaker(dti, ltv, applicant)
  const reasons = getReasonsForDecision(dti, ltv, applicant.fico, decision)
  return { decision, reasons, dti, ltv }
}

function decisionMaker(dti: number, ltv: number, applicant: ApplicantData): ApprovalDecision {
  if (
    applicant.fico >= MIN_FICO_APPROVED &&
    dti < MAX_DTI_APPROVED &&
    ltv <= MAX_LTV_APPROVED
  ) return 'approved'

  if (
    applicant.fico >= MIN_FICO_REFERRED &&
    dti < MAX_DTI_REFERRED &&
    ltv <= MAX_LTV_REFERRED
  ) return 'referred'

  return 'declined'
}
