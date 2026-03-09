"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import toast from "react-hot-toast"
import Link from "next/link"

interface CartItem {
  id: string
  quantity: number
  product: {
    id: string
    name: string
    description: string
    price: number
    image: string
    stock: number
  }
}

export default function CartPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (status === "authenticated") {
      fetchCart()
    }
  }, [status, router])

  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart")
      if (response.ok) {
        const data = await response.json()
        setCartItems(data)
      }
    } catch (error) {
      console.error("Error fetching cart:", error)
      toast.error("Failed to load cart")
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(cartItemId)
      return
    }

    try {
      const cartItem = cartItems.find(item => item.id === cartItemId)
      if (!cartItem) return

      if (newQuantity > cartItem.product.stock) {
        toast.error(`Only ${cartItem.product.stock} items available`)
        return
      }

      const response = await fetch("/api/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId, quantity: newQuantity }),
      })

      if (response.ok) {
        setCartItems(prev =>
          prev.map(item =>
            item.id === cartItemId ? { ...item, quantity: newQuantity } : item
          )
        )
        toast.success("Cart updated")
      }
    } catch (error) {
      toast.error("Failed to update cart")
    }
  }

  const removeItem = async (cartItemId: string) => {
    try {
      const response = await fetch(`/api/cart?id=${cartItemId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setCartItems(prev => prev.filter(item => item.id !== cartItemId))
        toast.success("Item removed from cart")
      }
    } catch (error) {
      toast.error("Failed to remove item")
    }
  }

  const clearCart = async () => {
    try {
      for (const item of cartItems) {
        await fetch(`/api/cart?id=${item.id}`, { method: "DELETE" })
      }
      setCartItems([])
      toast.success("Cart cleared")
    } catch (error) {
      toast.error("Failed to clear cart")
    }
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="h-6 bg-gray-200 rounded mb-4" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Add some delicious dry fruits to your cart and come back here!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Browse Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-gray-900">
                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in cart
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear cart
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="sm:w-24 sm:h-24 w-full h-48 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xl font-bold text-amber-600">
                            {formatCurrency(item.product.price)}
                          </div>
                          <div className="text-xs text-gray-600">per 500g</div>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {item.product.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              {formatCurrency(item.product.price * item.quantity)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatCurrency(item.product.price)} each
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 text-gray-600 hover:text-gray-900"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 text-gray-900 font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 text-gray-600 hover:text-gray-900"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="text-sm text-gray-500">
                              Stock: {item.product.stock}
                            </div>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "FREE" : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium">{formatCurrency(tax)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-amber-600">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </div>

              {subtotal < 50 && (
                <div className="mb-6 p-4 bg-amber-50 rounded-lg">
                  <div className="text-sm text-amber-800">
                    Add {formatCurrency(50 - subtotal)} more to get free shipping!
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <Link
                  href="/checkout"
                  className="block w-full text-center py-3 px-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/products"
                  className="block w-full text-center py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  <p className="mb-2">We accept:</p>
                  <div className="flex items-center space-x-2">
                    <div className="px-3 py-1 bg-gray-100 rounded text-xs font-medium">
                      Visa
                    </div>
                    <div className="px-3 py-1 bg-gray-100 rounded text-xs font-medium">
                      Mastercard
                    </div>
                    <div className="px-3 py-1 bg-gray-100 rounded text-xs font-medium">
                      Stripe
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}