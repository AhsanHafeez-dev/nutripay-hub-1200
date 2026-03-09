"use client"

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

export default function StripeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [stripePromise, setStripePromise] = useState<any>(null)

  useEffect(() => {
    // Only load Stripe on the client side
    if (typeof window !== 'undefined') {
      const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      setStripePromise(promise)
    }
  }, [])

  if (!stripePromise) {
    return <>{children}</>
  }

  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  )
}