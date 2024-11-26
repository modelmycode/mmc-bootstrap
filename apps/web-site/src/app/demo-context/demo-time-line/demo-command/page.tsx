"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@mmc-bootstrap"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mmc-bootstrap"
import { Input } from "@mmc-bootstrap"
import { Button } from "@mmc-bootstrap"
import React from 'react';

const formSchema = z.object({
  "phone-number": z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
})

export default function OnBoardingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "phone-number": "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // This is where you would call your submitCommandRequest action
    console.log(values)
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Close the dialog after submission
    setOpen(false)
  }

  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registration Request</DialogTitle>
          <DialogDescription>
            Enter your phone number to request registration for on-boarding.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="phone-number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter your phone number including country code.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
