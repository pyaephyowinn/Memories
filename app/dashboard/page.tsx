"use client"

import type React from "react"
import Link from "next/link"
import { Home, PlusCircle, Calendar, DollarSign, BarChart3, Eye, CheckCircle, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <Home className="h-6 w-6" />
          <span>Acme Real Estate</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/properties">Properties</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/appointments">Appointments</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/transactions">Transactions</Link>
          </Button>
        </nav>
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </header>
      <main className="flex-1 p-6 md:p-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Manage your properties, appointments, and transactions</p>
            </div>
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/properties/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Property
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              title="Total Properties"
              value="12"
              description="4 active listings"
              icon={Home}
              trend="+2 this month"
              trendUp={true}
            />
            <DashboardCard
              title="Appointments"
              value="8"
              description="3 pending requests"
              icon={Calendar}
              trend="+5 this week"
              trendUp={true}
            />
            <DashboardCard
              title="Total Revenue"
              value="$24,500"
              description="From 3 transactions"
              icon={DollarSign}
              trend="+12% from last month"
              trendUp={true}
            />
            <DashboardCard
              title="Property Views"
              value="1,024"
              description="Across all listings"
              icon={Eye}
              trend="+256 this week"
              trendUp={true}
            />
          </div>

          <Tabs defaultValue="properties" className="space-y-4">
            <TabsList>
              <TabsTrigger value="properties">
                <Home className="mr-2 h-4 w-4" />
                Properties
              </TabsTrigger>
              <TabsTrigger value="appointments">
                <Calendar className="mr-2 h-4 w-4" />
                Appointments
              </TabsTrigger>
              <TabsTrigger value="transactions">
                <DollarSign className="mr-2 h-4 w-4" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Properties</CardTitle>
                  <CardDescription>Manage and monitor your property listings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Inquiries</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "1",
                          title: "Modern Apartment in Downtown",
                          status: "available",
                          price: "$350,000",
                          views: 245,
                          inquiries: 12,
                        },
                        {
                          id: "2",
                          title: "Spacious Family Home",
                          status: "available",
                          price: "$550,000",
                          views: 189,
                          inquiries: 8,
                        },
                        {
                          id: "3",
                          title: "Cozy Studio Near Park",
                          status: "rented",
                          price: "$1,500/month",
                          views: 320,
                          inquiries: 15,
                        },
                        {
                          id: "4",
                          title: "Luxury Penthouse with View",
                          status: "sold",
                          price: "$1,200,000",
                          views: 270,
                          inquiries: 10,
                        },
                      ].map((property) => (
                        <TableRow key={property.id}>
                          <TableCell className="font-medium">{property.title}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                property.status === "available"
                                  ? "default"
                                  : property.status === "sold"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{property.price}</TableCell>
                          <TableCell>{property.views}</TableCell>
                          <TableCell>{property.inquiries}</TableCell>
                          <TableCell className="text-right">
                            <Button asChild variant="ghost" size="sm">
                              <Link href={`/properties/${property.id}/edit`}>Edit</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/properties">View All Properties</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Manage your property viewing appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Property</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "1",
                          client: "John Smith",
                          property: "Modern Apartment in Downtown",
                          dateTime: "Mar 18, 2024 10:00 AM",
                          status: "confirmed",
                        },
                        {
                          id: "2",
                          client: "Sarah Johnson",
                          property: "Spacious Family Home",
                          dateTime: "Mar 19, 2024 2:30 PM",
                          status: "pending",
                        },
                        {
                          id: "3",
                          client: "Michael Brown",
                          property: "Luxury Penthouse with View",
                          dateTime: "Mar 20, 2024 11:15 AM",
                          status: "confirmed",
                        },
                      ].map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">{appointment.client}</TableCell>
                          <TableCell>{appointment.property}</TableCell>
                          <TableCell>{appointment.dateTime}</TableCell>
                          <TableCell>
                            <Badge variant={appointment.status === "confirmed" ? "default" : "outline"}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {appointment.status === "pending" && (
                                <>
                                  <Button size="icon" variant="outline" className="h-8 w-8">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="sr-only">Confirm</span>
                                  </Button>
                                  <Button size="icon" variant="outline" className="h-8 w-8">
                                    <XCircle className="h-4 w-4 text-red-500" />
                                    <span className="sr-only">Decline</span>
                                  </Button>
                                </>
                              )}
                              <Button asChild variant="ghost" size="sm">
                                <Link href={`/appointments/${appointment.id}`}>View</Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/appointments">View All Appointments</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Track your property sales, rentals, and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "1",
                          property: "Luxury Penthouse with View",
                          type: "sale",
                          client: "Robert Wilson",
                          amount: "$1,200,000",
                          date: "Feb 28, 2024",
                        },
                        {
                          id: "2",
                          property: "Cozy Studio Near Park",
                          type: "rental",
                          client: "Emma Davis",
                          amount: "$1,500",
                          date: "Mar 1, 2024",
                        },
                        {
                          id: "3",
                          property: "Modern Apartment in Downtown",
                          type: "installment",
                          client: "James Taylor",
                          amount: "$5,000",
                          date: "Mar 5, 2024",
                        },
                      ].map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.property}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                transaction.type === "sale"
                                  ? "default"
                                  : transaction.type === "rental"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{transaction.client}</TableCell>
                          <TableCell>{transaction.amount}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell className="text-right">
                            <Button asChild variant="ghost" size="sm">
                              <Link href={`/transactions/${transaction.id}`}>Details</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/transactions">View All Transactions</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Property Analytics</CardTitle>
                  <CardDescription>Track performance metrics for your properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Analytics charts would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

interface DashboardCardProps {
  title: string
  value: string
  description: string
  icon: React.ElementType
  trend: string
  trendUp: boolean
}

function DashboardCard({ title, value, description, icon: Icon, trend, trendUp }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className={`mt-2 flex items-center text-xs ${trendUp ? "text-green-500" : "text-red-500"}`}>
          {trendUp ? "↑" : "↓"} {trend}
        </div>
      </CardContent>
    </Card>
  )
}

