"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, ShoppingCart, Eye, Heart } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import toast from "react-hot-toast"

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    category: string
    image: string
    rating: number
    reviewCount: number
    stock: number
    isFeatured: boolean
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const addToCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      })

      if (response.ok) {
        toast.success("Added to cart!")
      } else {
        toast.error("Failed to add to cart")
      }
    } catch (error) {
      toast.error("Failed to add to cart")
    }
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist")
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
        {product.isFeatured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
              Featured
            </span>
          </div>
        )}
        
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={toggleWishlist}
            className={`p-2 rounded-full ${isWishlisted
                ? "bg-red-100 text-red-500"
                : "bg-white/80 text-gray-500 hover:text-red-500"
              } backdrop-blur-sm transition-colors`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">
              {formatCurrency(product.price)}
            </div>
            <div className="text-sm text-gray-600">per 500g</div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="ml-1 text-sm font-medium">{product.rating.toFixed(1)}</span>
                <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-xs text-gray-500 capitalize">{product.category}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-gray-500">Stock:</span>
            <span className={`ml-2 font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </span>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={addToCart}
              disabled={product.stock === 0}
              className={`p-2 rounded-lg ${product.stock > 0
                  ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                } transition-colors`}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <Link
              href={`/products/${product.id}`}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <Eye className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}