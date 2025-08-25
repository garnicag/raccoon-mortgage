import { DataService } from "@/services/dataService"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const dataService = new DataService()


export default function AllResultsTable() {
  const [allData, setAllData] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const data = await dataService.getAll()
      setAllData(data)
    }
    fetchData()
  }, [])

  return (
    <div className="mt-20">
    <h2 className="text-2xl font-bold text-center">All Saved Results</h2>
    <Table className="max-w-4xl mx-auto mt-10">
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold text-xl">Solicitor</TableHead>
          <TableHead className="font-bold text-xl">Loan Amount</TableHead>
          <TableHead className="font-bold text-xl">Decision</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allData.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3}>No data available</TableCell>
          </TableRow>
        ) : (
          allData.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell className="text-left">{row.name}</TableCell>
              <TableCell className="text-left">${row.loanAmount}</TableCell>
              <TableCell className="text-left">{row.decision}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
    </div>
  )
}
