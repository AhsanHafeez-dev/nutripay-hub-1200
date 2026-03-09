"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Home,
  DollarSign,
  Tag,
} from "lucide-react"

const navItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: <Package className="w-5 h-5" />,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: <Users className="w-5 h-5" />,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: <Tag className="w-5 h-5" />,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    name: "Payments",
    href: "/admin/payments",
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: <Settings className="w-5 h-5" />,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className={`${isCollapsed ? "w-20" : "w-64"} hidden lg:block bg-white border-r border-gray-200 min-h-[calc(100vh-80px)] transition-all duration-300`}>
      <div className="p-6">
        {/* Store Info */}
        <div className={`${isCollapsed ? "justify-center" : "justify-between"} flex items-center mb-8`}>
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="font-bold text-gray-900">NutriPay Hub</span>
            </div>
          )}
          {isCollapsed && (
            <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center mx-auto">
              <span className="text-white font-bold">N</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-lg hover:bg-gray-100 ${isCollapsed ? "mx-auto" : ""}`}
          >
            <div className="w-4 h-4 border-l-2 border-t-2 border-gray-400 transform rotate-45"></div>
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center ${isCollapsed ? "justify-center px-2" : "px-4"} py-3 rounded-lg transition-colors ${isActive
                    ? "bg-amber-50 text-amber-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <div className={`${isActive ? "text-amber-600" : "text-gray-500"}`}>
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="ml-3 font-medium">{item.name}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Back to Store */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className={`flex items-center ${isCollapsed ? "justify-center" : ""} px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors`}
          >
            <Home className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3 font-medium">Back to Store</span>}
          </Link>
        </div>

        {/* Stats */}
        {!isCollapsed && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">Today's Stats</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Orders</span>
                <span className="font-semibold text-amber-600">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Revenue</span>
                <span className="font-semibold text-green-600">$1,248</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Visitors</span>
                <span className="font-semibold text-blue-600">1.2k</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}