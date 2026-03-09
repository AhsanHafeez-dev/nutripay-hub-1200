import { Truck, Shield, RefreshCw, Heart } from "lucide-react"

const benefits = [
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Free Shipping",
    description: "Free delivery on orders over $50",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Quality Guarantee",
    description: "100% organic and premium quality",
  },
  {
    icon: <RefreshCw className="w-8 h-8" />,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Healthy Living",
    description: "Nutritionist approved products",
  },
]

export default function Benefits() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}