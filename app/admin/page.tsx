"use client"

import { useState, useEffect } from "react"
import {
  TrendingUp,
  Users,
  Package,
  DollarSign,
  ShoppingCart,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalCustomers: number
  revenueChange: number
  ordersChange: number
}

interface RecentOrder {
  id: string
  customerName: string
  total: number
  status: string
  date: string
}

interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    revenueChange: 0,
    ordersChange: 0,
  })
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // In a real app, you would fetch from your API
      // For now, we'll use mock data
      setStats({
        totalRevenue: 12480.50,
        totalOrders: 156,
        totalProducts: 45,
        totalCustomers: 89,
        revenueChange: 12.5,
        ordersChange: 8.2,
      })

      setRecentOrders([
        { id: "ORD-001", customerName: "John Doe", total: 45.99, status: "Delivered", date: "2024-01-15" },
        { id: "ORD-002", customerName: "Jane Smith", total: 89.50, status: "Processing", date: "2024-01-15" },
        { id: "ORD-003", customerName: "Bob Johnson", total: 32.99, status: "Pending", date: "2024-01-14" },
        { id: "ORD-004", customerName: "Alice Brown", total: 67.25, status: "Delivered", date: "2024-01-14" },
        { id: "ORD-005", customerName: "Charlie Wilson", total: 124.75, status: "Shipped", date: "2024-01-13" },
      ])

      setTopProducts([
        { id: "1", name: "Premium Almonds", sales: 156, revenue: 2028.00 },
        { id: "2", name: "Organic Walnuts", sales: 124, revenue: 1859.76 },
        { id: "3", name: "Golden Cashews", sales: 98, revenue: 1665.02 },
        { id: "4", name: "Pistachio Delight", sales: 87, revenue: 1653.13 },
        { id: "5", name: "Mixed Dry Fruits", sales: 76, revenue: 1747.24 },
      ])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: <DollarSign className="w-6 h-6" />,
      change: stats.revenueChange,
      color: "bg-green-50 text-green-600",
      changeColor: stats.revenueChange >= 0 ? "text-green-600" : "text-red-600",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toString(),
      icon: <ShoppingCart className="w-6 h-6" />,
      change: stats.ordersChange,
      color: "bg-blue-50 text-blue-600",
      changeColor: stats.ordersChange >= 0 ? "text-green-600" : "text-red-600",
    },
    {
      title: "Total Products",
      value: stats.totalProducts.toString(),
      icon: <Package className="w-6 h-6" />,
      change: 5.2,
      color: "bg-purple-50 text-purple-600",
      changeColor: "text-green-600",
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers.toString(),
      icon: <Users className="w-6 h-6" />,
      change: 15.8,
      color: "bg-amber-50 text-amber-600",
      changeColor: "text-green-600",
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your admin dashboard. Here's what's happening with your store today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.color}`}>
                {card.icon}
              </div>
              <div className={`flex items-center ${card.changeColor}`}>
                {card.change >= 0 ? (
                  <ArrowUp className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 mr-1" />
                )}
                <span className="text-sm font-medium">
                  {Math.abs(card.change)}%
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{card.value}</div>
            <div className="text-sm text-gray-600">{card.title}</div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-900">Recent Orders</h2>
            <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b border-gray-100">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-4">
                      <div className="font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-500">{order.date}</div>
                    </td>
                    <td className="py-4">
                      <div className="font-medium text-gray-900">{order.customerName}</div>
                    </td>
                    <td className="py-4 font-medium">{formatCurrency(order.total)}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Shipped"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-gray-100 text-gray-800"
                        }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-900">Top Products</h2>
            <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-600">{product.sales} sales</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{formatCurrency(product.revenue)}</div>
                  <div className="text-sm text-green-600">+12.5%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8" />
            <span className="text-2xl font-bold">24</span>
          </div>
          <div className="font-medium">Orders Today</div>
          <div className="text-sm opacity-90">+18% from yesterday</div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8" />
            <span className="text-2xl font-bold">89</span>
          </div>
          <div className="font-medium">Active Customers</div>
          <div className="text-sm opacity-90">+8 new this week</div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8" />
            <span className="text-2xl font-bold">$1,248</span>
          </div>
          <div className="font-medium">Today's Revenue</div>
          <div className="text-sm opacity-90">+12.5% from yesterday</div>
        </div>
      </div>
    </div>
  )
}