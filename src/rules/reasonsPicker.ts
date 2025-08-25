import { type ApprovalDecision } from "./approvalRules"
import { MIN_FICO_APPROVED, MAX_DTI_APPROVED, MAX_LTV_APPROVED, MIN_FICO_REFERRED, MAX_DTI_REFERRED, MAX_LTV_REFERRED } from "../constants/approvalThresholds"

export function getReasonsForDecision(dti: number, ltv: number, fico: number, decision: ApprovalDecision): Array<string> {
  const reasons = []

  if (decision === 'approved') {
    if (fico >= MIN_FICO_APPROVED) reasons.push('credit_good')
    if (dti < MAX_DTI_APPROVED) reasons.push('dti_acceptable')
    if (ltv <= MAX_LTV_APPROVED) reasons.push('ltv_acceptable')
  }

  if (decision === 'referred') {
    if (fico < MIN_FICO_APPROVED && fico >= MIN_FICO_REFERRED) reasons.push('fico_borderline_criteria')
    if (dti >= MAX_DTI_APPROVED && dti < MAX_DTI_REFERRED) reasons.push('dti_borderline_criteria')
    if (ltv > MAX_LTV_APPROVED && ltv <= MAX_LTV_REFERRED) reasons.push('ltv_borderline_criteria')
    reasons.push('manual_review')
    reasons.push('additional_info_needed')
  }

  if (decision === 'declined') {
    if (fico < MIN_FICO_REFERRED) reasons.push('credit_poor')
    if (dti < MAX_DTI_REFERRED) reasons.push('dti_too_high')
    if (ltv < MAX_LTV_REFERRED) reasons.push('ltv_too_high')
  }

  return reasons
}
