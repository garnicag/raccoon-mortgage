import { useLocation } from "react-router-dom"
import { getApprovalDecision } from "@/rules/approvalRules"
import { findReason } from "@/rules/reasonsList"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"
import { singleProcessor } from "@/lib/singleProcessor"

export interface CalculatorFormValues {
  name: string
  monthlyIncome: number
  monthlyDebts: number
  loanAmount: number
  propertyValue: number
  fico: number
  occupancyType: string
  saveData: boolean
}

export default function Results() {
  const location = useLocation()
  const state = (location.state as CalculatorFormValues) || {}
  let navigate = useNavigate()

  
  const results = getApprovalDecision(state)
  
  const reasonMessages: string[] = []
  results.reasons.forEach((reasonCode: string) => {
    const reason = findReason(results.decision, reasonCode)
    if (reason?.message) reasonMessages.push(reason.message)
  })

  if (state.saveData) {
    const data = { ...results, ...state }
    singleProcessor(data)
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Card className="p-4">
        <CardTitle className="text-xl font-bold">
          Here are your results, {state.name}
        </CardTitle>
        <CardContent>
          <h3 className="text-lg font-regular">
            After reviewing your information, we have determined your application has been <span className="font-bold underline">{results.decision}</span> for a loan of <span className="font-bold">${state.loanAmount}</span>
          </h3>
        </CardContent>
        <CardContent>
          <div className="text-left">
            <CardTitle className="text-lg font-semibold mb-4">Reasons for decision:</CardTitle>
            <ul className="list-disc list-inside">
              {reasonMessages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardContent>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <Button
                onClick={() => navigate("/calculator")}
                className="block cursor-pointer focus:outline-none"
              >
                Try again
            </Button>
            <Button
                onClick={() => navigate("/")}
                className="block cursor-pointer focus:outline-none"
                variant="secondary"
              >
                Go back to home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

