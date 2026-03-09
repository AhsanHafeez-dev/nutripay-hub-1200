import Link from "next/link"
import { Nut, Apple, Grape, Cherry } from "lucide-react"

const categories = [
  {
    name: "Nuts",
    description: "Almonds, Walnuts, Cashews & more",
    icon: <Nut className="w-8 h-8" />,
    color: "bg-amber-100 text-amber-600",
    count: 15,
  },
  {
    name: "Dried Fruits",
    description: "Raisins, Apricots, Dates & more",
    icon: <Apple className="w-8 h-8" />,
    color: "bg-red-100 text-red-600",
    count: 12,
  },
  {
    name: "Seeds",
    description: "Pumpkin, Sunflower, Chia & more",
    icon: <Grape className="w-8 h-8" />,
    color: "bg-green-100 text-green-600",
    count: 8,
  },
  {
    name: "Premium Mix",
    description: "Special blends & gift packs",
    icon: <Cherry className="w-8 h-8" />,
    color: "bg-purple-100 text-purple-600",
    count: 10,
  },
]

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of healthy dry fruits and nuts categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${category.name.toLowerCase()}`}
              className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${category.color}`}>
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-gray-500">
                  {category.count} items
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>

              <div className="flex items-center text-sm font-medium text-amber-600 group-hover:text-amber-700">
                Browse category
                <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}