"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { CheckCircle, Shield, Lock } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import toast from "react-hot-toast"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface Order {
  id: string
  totalAmount: number
  items: Array<{
    quantity: number
    price: number
    product: {
      id: string
      name: string
    }
  }>
}

function PaymentForm() {
  const params = useParams()
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const { data: session } = useSession()

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    if (params.orderId) {
      fetchOrder(params.orderId as string)
    }
  }, [params.orderId])

  const fetchOrder = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (response.ok) {
        const data = await response.json()
        setOrder(data)
        createPaymentIntent(data)
      }
    } catch (error) {
      toast.error("Failed to load order")
    }
  }

  const createPaymentIntent = async (orderData: Order) => {
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: orderData.items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.price,
          })),
          shippingAddress: {
            street: "123 Main St", // In real app, get from order
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "USA",
          },
        }),
      })

      const { clientSecret } = await response.json()
      setClientSecret(clientSecret)
    } catch (error) {
      toast.error("Failed to create payment")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements || !clientSecret) return

    setLoading(true)

    try {
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) return

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      })

      if (error) {
        toast.error(error.message || "Payment failed")
        setLoading(false)
        return
      }

      if (paymentIntent.status === "succeeded") {
        toast.success("Payment successful!")
        
        // Update order status
        await fetch(`/api/orders/${params.orderId}/complete`, {
          method: "POST",
        })

        // Redirect to success page
        router.push(`/order-success?orderId=${params.orderId}`)
      }
    } catch (error: any) {
      toast.error(error.message || "Payment failed")
    } finally {
      setLoading(false)
    }
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const shipping = order.totalAmount > 50 ? 0 : 5.99
  const tax = order.totalAmount * 0.08
  const total = order.totalAmount + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
            <p className="text-gray-600">Order #{params.orderId}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-medium text-gray-900">Secure Payment</div>
                  <div className="text-sm text-gray-600">256-bit SSL encryption</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Lock className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">Privacy Protected</div>
                  <div className="text-sm text-gray-600">Your data is safe with us</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Details
                </label>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Total</span>
                  <span className="font-medium">{formatCurrency(order.totalAmount)}</span>
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
                    <span className="font-semibold text-gray-900">Total Amount</span>
                    <span className="text-xl font-bold text-amber-600">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full py-3 px-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : `Pay ${formatCurrency(total)}`}
              </button>
            </form>
          </div>

          <div className="bg-amber-50 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-amber-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Payment Security</h3>
                <p className="text-sm text-gray-600">
                  Your payment is processed securely by Stripe. We never store your card details.
                  All transactions are encrypted and protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  )
}