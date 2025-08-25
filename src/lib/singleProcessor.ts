import { DataService } from "@/services/dataService"

const dataService = new DataService()

export async function singleProcessor(data: any): Promise<void> {
  await validateAndProcess(data)
}
export interface ApprovalResult {
  decision: string
  reasons: string[]
  dti: number
  ltv: number
  name: string
  monthlyIncome: number
  monthlyDebts: number
  loanAmount: number
  propertyValue: number
  fico: number
  occupancyType: string
  saveData?: boolean
}

async function validateAndProcess(item: ApprovalResult): Promise<void> {
  if (
    item.decision ||
    item.reasons ||
    Number(item.dti) ||
    Number(item.ltv) ||
    item.name ||
    Number(item.monthlyIncome) > 0 ||
    Number(item.monthlyDebts) ||
    Number(item.loanAmount) > 0 ||
    Number(item.propertyValue) > 0 ||
    Number(item.fico) > 0 ||
    item.occupancyType
  ) {
    const formattedItem = {
      decision: String(item.decision),
      reasons: item.reasons,
      dti: Number(item.dti),
      ltv: Number(item.ltv),
      name: String(item.name),
      monthlyIncome: Number(item.monthlyIncome),
      monthlyDebts: Number(item.monthlyDebts),
      loanAmount: Number(item.loanAmount),
      propertyValue: Number(item.propertyValue),
      fico: Number(item.fico),
      occupancyType: String(item.occupancyType).toLowerCase(),
    }

    dataService.save(formattedItem)
  }

  else {
    console.log(item, 'invalid data structure or missing fields');
  }
}
