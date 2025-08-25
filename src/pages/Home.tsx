import React, { useRef } from "react"
import { csvToObjects } from "@/lib/CsvProcessor"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router"
import { bulkProcessor } from "@/lib/bulkProcessor"

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const text = await file.text()
    const data = csvToObjects(text)
    await bulkProcessor(data).then(() => navigate("/table"))
  }

  let navigate = useNavigate()
 
  return (
    <div className="flex min-h-svh flex-col items-center justify-center mt-20">
      <div className="home text-center">
        <h1 className="font-bold text-2xl">Welcome to Raccoon Mortgage</h1>
        <p className="text-md">We sniff out your mortgage eligibility. So you don't have to.</p>
      </div>
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <CardTitle className="text-xl font-bold">
            Single Applicant
          </CardTitle>
          <CardDescription className="block mb-2 text-sm font-medium">
            Use our calculator to check your mortgage eligibility.<br /><br />
          </CardDescription>
          <CardContent>
            <Button
              onClick={() => navigate("/calculator")}
              className="block w-full cursor-pointer focus:outline-none"
            >
              Let's go!
            </Button>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardTitle className="text-xl font-bold">
            Bulk Upload
          </CardTitle>
          <CardDescription className="block mb-2 text-sm font-medium">
            Upload your mortgage data file (CSV) to check eligibility for multiple applicants.
          </CardDescription>
          <CardContent>
            <Input
              type="file"
              accept=".csv"
              ref={inputRef}
              onChange={handleFileChange}
              className="cursor-pointer focus:outline-none"
            />
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardTitle className="text-xl font-bold">
            Previous Saved Results
          </CardTitle>
          <CardDescription className="block mb-2 text-sm font-medium">
            View your previously saved mortgage results.<br /><br />
          </CardDescription>
          <CardContent>
             <Button
              onClick={() => navigate("/table")}
              className="block w-full cursor-pointer focus:outline-none"
            >
              Show all results!
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
