import type { CalculatorFormValues } from "@/pages/Results"
import { getApprovalDecision } from "@/rules/approvalRules"
import { DataService } from "@/services/dataService"

const dataService = new DataService()

export async function bulkProcessor(data: any[]): Promise<void> {
  dataService.clear()
  await Promise.all(data.map(async (item) => validateAndProcess(item)))
}

export interface MortgageData {
  fico: number
  loanAmount: number
  monthlyDebts: number
  monthlyIncome: number
  occupancyType: string
  propertyValue: number
  solicitorName: string
}

async function validateAndProcess(item: MortgageData): Promise<void> {
  if (
    item.solicitorName ||
    item.occupancyType ||
    Number(item.fico) > 0 ||
    Number(item.loanAmount) > 0 ||
    Number(item.monthlyDebts) >= 0 ||
    Number(item.monthlyIncome) > 0 ||
    Number(item.propertyValue) > 0
  ) {
    const validItem: CalculatorFormValues = {
      name: String(item.solicitorName),
      monthlyIncome: Number(item.monthlyIncome),
      monthlyDebts: Number(item.monthlyDebts),
      loanAmount: Number(item.loanAmount),
      propertyValue: Number(item.propertyValue),
      fico: Number(item.fico),
      occupancyType: String(item.occupancyType).toLowerCase(),
      saveData: true,
    }

    const decision = getApprovalDecision(validItem)
    dataService.save({ ...validItem, ...decision })
  }

  else {
    console.log(item, 'invalid data structure or missing fields');
  }
}
