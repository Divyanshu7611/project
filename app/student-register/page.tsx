"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getEvents } from "../actions/events";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { registerStudents } from "@/app/actions/user";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  branch: z
    .string()
    .min(2, { message: "Branch must be at least 2 characters" }),
  year: z.string().min(1, { message: "Year is required" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  eventName: z
    .string()
    .min(2, { message: "Event name must be at least 2 characters" }),
  universityRollNo: z.string().min(2, {
    message: "University roll number must be at least 2 characters",
  }),
  rollNumber: z
    .string()
    .min(3, { message: "Roll number must be at least 3 characters" }),
});

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    const getEventData = async () => {
      const res = await getEvents();
      if (res) {
        setEvents(res);
      }
    };
    getEventData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      rollNumber: "",
      universityRollNo: "",
      eventName: "",
      branch: "",
      year: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      console.log("Form values:", values); // Debugging line
      const result = await registerStudents(values);

      if (result.success) {
        toast({
          title: "Registration successful",
          description: "Your have Successfully Registered.",
        });
        router.push(`/dashboard?userId=${result.userId}`);
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description:
            result.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
          <img src="/RTU logo.png" alt="Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold">Placement Cell</h1>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Create your account to get your QR code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Divyanshu Sharma" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="divyanshu@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="branch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Branch</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
                        >
                          <option value="">Select Branch</option>
                          <option value="CSE">CSE</option>
                          <option value="ECE">ECE</option>
                          <option value="ME">ME</option>
                          <option value="CE">CE</option>
                          <option value="EE">EE</option>
                          <option value="IT">IT</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
                        >
                          <option value="">Select Year</option>
                          <option value="1">1st</option>
                          <option value="2">2nd</option>
                          <option value="3">3rd</option>
                          <option value="4">4th</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="9876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="eventName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Aptitude Test" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="eventName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Name</FormLabel>
                      <FormControl>
                        {events.length > 0 ? (
                          <select
                            {...field}
                            className="w-full border border-input rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="">Select an event</option>
                            {events.map((event:any) => (
                              <option key={event._id} value={event.eventName}>
                                {event.eventName}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <div className="text-muted-foreground text-sm">
                            No events available
                          </div>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="universityRollNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>University Roll Number</FormLabel>
                      <FormControl>
                        <Input placeholder="21056789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rollNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College Roll Number</FormLabel>
                      <FormControl>
                        <Input placeholder="22/285" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already registered?{" "}
              <Link
                href="/student-dashboard"
                className="text-primary underline underline-offset-4"
              >
                Go to Dashboard
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground flex-col flex items-center">
          <span>
            © {new Date().getFullYear()} Placement Cell. All rights reserved.
          </span>
          <span className="text-sm">Developed By Divyanshu Sharma</span>
        </div>
      </footer>
    </div>
  );
}
