import { ThemeProvider } from "@/components/theme-provider"
import { RoutesList } from "@/routers/routes"
import TopBar from "@/components/top-bar"
import './App.css'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RoutesList />
      <TopBar />
    </ThemeProvider>
  )
}

export default App
