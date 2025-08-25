import { openDB } from 'idb'
import type { DBSchema } from 'idb'

export interface MortgageData {
  decision: string
  dti: number
  fico: number
  loanAmount: number
  ltv: number
  monthlyDebts?: number
  monthlyIncome: number
  name: string
  occupancyType: string
  propertyValue: number
  reasons: string[]
  saveData?: boolean
}


interface MortgageDB extends DBSchema {
  mortgage: {
    key: number
    value: MortgageData
  }
}

export class DataService {
  private dbPromise = openDB<MortgageDB>('mortgage-db', 1, {
    upgrade(db) {
      db.createObjectStore('mortgage', { keyPath: 'id', autoIncrement: true })
    },
  })

  async save(item: any): Promise<MortgageData> {
    const data: MortgageData = {
      decision: String(item.decision),
      dti: Number(item.dti),
      fico: Number(item.fico),
      loanAmount: Number(item.loanAmount),
      ltv: Number(item.ltv),
      monthlyDebts: Number(item.monthlyDebts),
      monthlyIncome: Number(item.monthlyIncome),
      name: String(item.name),
      occupancyType: String(item.occupancyType).toLowerCase(),
      propertyValue: Number(item.propertyValue),
      reasons: item.reasons,
    }
    const db = await this.dbPromise
    await db.add('mortgage', data)
    return data
  }

  async getAll(): Promise<MortgageData[]> {
    const db = await this.dbPromise
    return await db.getAll('mortgage')
  }

  async clear(): Promise<void> {
    const db = await this.dbPromise
    await db.clear('mortgage')
  }  
}
