import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Calculator from "@/pages/Calculator"
import Home from "@/pages/Home"
import Results from "@/pages/Results"
import AllResultsTable from "@/pages/AllResultsTable"

export function RoutesList() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/results" element={<Results />} />
        <Route path="/table" element={<AllResultsTable />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
