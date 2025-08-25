import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom"


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is too short.",
  }),
  monthlyIncome: z.number().min(2, {
    message: "Must include a valid monthly income.",
  }),
  monthlyDebts: z.number().min(0, {
    message: "Must include a valid monthly debt.",
  }),
  loanAmount: z.number().min(2, {
    message: "Must include a valid loan amount.",
  }),
  propertyValue: z.number().min(2, {
    message: "Must include a valid property value.",
  }),
  fico: z.number().min(2, {
    message: "Must include a valid FICO score.",
  }),
  occupancyType: z.enum(["primary", "secondary", "investment"], {
    message: "Must include a valid occupancy type.",
  }),
  saveData: z.boolean(),
})

export default function Calculator() {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      monthlyDebts: 0,
      monthlyIncome: 0,
      loanAmount: 0,
      propertyValue: 0,
      fico: 0,
      occupancyType: "primary",
      saveData: true,
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    navigate("/results", { state: values })
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center mt-40">
      <Card className="w-full max-w-md p-6 shadow-lg login relative">
        <div className="logopix relative" />
        <CardTitle className="text-2xl font-bold">Calculate your mortgage eligibility</CardTitle>
        <CardDescription>
          Fill out the form below to get started.
        </CardDescription>
        <CardContent>
          <div className="mb-4 text-left">
            <div className="form-wrapper">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your full name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="monthlyIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Income</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="monthlyDebts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Debts</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="loanAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loan Amount</FormLabel>
                        <FormControl>
                          <Input type="number" {...field}  onChange={e => field.onChange(e.target.valueAsNumber)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="propertyValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Value</FormLabel>
                        <FormControl>
                          <Input type="number" {...field}  onChange={e => field.onChange(e.target.valueAsNumber)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fico"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Credit Score (FICO)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field}  onChange={e => field.onChange(e.target.valueAsNumber)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="occupancyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupancy Type</FormLabel>
                        <FormControl>
                          <Select {...field} value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select occupancy type" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                              <SelectItem value="primary">Primary</SelectItem>
                              <SelectItem value="secondary">Secondary</SelectItem>
                              <SelectItem value="investment">Investment</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="saveData"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Save Data</FormLabel>
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} name={field.name} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className="w-full cursor-pointer" type="submit">Calculate!</Button>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
