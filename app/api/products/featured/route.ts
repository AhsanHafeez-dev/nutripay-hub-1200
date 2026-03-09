import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isFeatured: true,
        stock: {
          gt: 0
        }
      },
      take: 8,
      orderBy: {
        rating: 'desc'
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}