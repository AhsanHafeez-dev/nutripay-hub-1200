import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.product.deleteMany()
  await prisma.address.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@nutripay.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10)
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'John Doe',
      password: userPassword,
      role: 'CUSTOMER',
      emailVerified: new Date(),
    },
  })

  // Create address for user
  const address = await prisma.address.create({
    data: {
      userId: user.id,
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      isDefault: true,
    },
  })

  // Create dry fruit products
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Premium Almonds',
        description: 'Fresh, crunchy California almonds packed with nutrients and antioxidants.',
        price: 12.99,
        category: 'Nuts',
        image: 'https://images.unsplash.com/photo-1508779018996-601e37fa274e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWxtb25kfGVufDB8fDB8fHww',
        stock: 150,
        isFeatured: true,
        rating: 4.8,
        reviewCount: 125,
      },
      {
        name: 'Organic Walnuts',
        description: 'Rich in omega-3 fatty acids, perfect for brain health and heart wellness.',
        price: 14.99,
        category: 'Nuts',
        image: 'https://plus.unsplash.com/premium_photo-1668246589919-dbf9c742f471?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG51dHxlbnwwfHwwfHx8MA%3D%3D',
        stock: 120,
        isFeatured: true,
        rating: 4.7,
        reviewCount: 89,
      },
      {
        name: 'Golden Cashews',
        description: 'Creamy, buttery cashews from Vietnam, excellent for snacking and cooking.',
        price: 16.99,
        category: 'Nuts',
        image: 'https://images.unsplash.com/photo-1615485925873-7ecbbe90a866?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzaGV3fGVufDB8fDB8fHww',
        stock: 100,
        isFeatured: false,
        rating: 4.6,
        reviewCount: 67,
      },
      {
        name: 'Pistachio Delight',
        description: 'Iranian pistachios, lightly salted for the perfect savory snack.',
        price: 18.99,
        category: 'Nuts',
        image: 'https://images.unsplash.com/photo-1579282769505-39e687bd68c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGlzdGFjaGlvfGVufDB8fDB8fHww',
        stock: 80,
        isFeatured: true,
        rating: 4.9,
        reviewCount: 142,
      },
      {
        name: 'Mixed Dry Fruits',
        description: 'A perfect blend of almonds, walnuts, cashews, raisins, and apricots.',
        price: 22.99,
        category: 'Mixed',
        image: 'https://images.unsplash.com/photo-1607664608695-45aaa6d621fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJ5JTIwZnJ1aXR8ZW58MHx8MHx8fDA%3D',
        stock: 200,
        isFeatured: true,
        rating: 4.8,
        reviewCount: 210,
      },
      {
        name: 'Golden Raisins',
        description: 'Sweet, plump raisins from California, perfect for baking and snacking.',
        price: 8.99,
        category: 'Dried Fruits',
        image: 'https://plus.unsplash.com/premium_photo-1669205434519-a042ba09fbdd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHJ5JTIwZnJ1aXR8ZW58MHx8MHx8fDA%3D',
        stock: 300,
        isFeatured: false,
        rating: 4.5,
        reviewCount: 56,
      },
      {
        name: 'Dried Apricots',
        description: 'Turkish dried apricots, naturally sweet and rich in fiber.',
        price: 10.99,
        category: 'Dried Fruits',
        image: 'https://images.unsplash.com/photo-1670775231064-a27ca2c0178d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRyeSUyMGZydWl0fGVufDB8fDB8fHww',
        stock: 180,
        isFeatured: false,
        rating: 4.4,
        reviewCount: 45,
      },
      {
        name: 'Brazil Nuts',
        description: 'Rich in selenium, these nuts support thyroid function and immunity.',
        price: 15.99,
        category: 'Nuts',
        image: 'https://plus.unsplash.com/premium_photo-1671405403469-b0ba7787b344?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG51dHxlbnwwfHwwfHx8MA%3D%3D',
        stock: 90,
        isFeatured: false,
        rating: 4.3,
        reviewCount: 32,
      },
      {
        name: 'Hazelnuts',
        description: 'European hazelnuts with rich flavor, perfect for desserts and spreads.',
        price: 13.99,
        category: 'Nuts',
        image: 'https://images.unsplash.com/photo-1598110996285-54523b72be93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZHJ5JTIwZnJ1aXR8ZW58MHx8MHx8fDA%3D',
        stock: 110,
        isFeatured: false,
        rating: 4.6,
        reviewCount: 78,
      },
      {
        name: 'Macadamia Nuts',
        description: 'Buttery, rich Hawaiian macadamia nuts, the ultimate luxury snack.',
        price: 24.99,
        category: 'Premium',
        image: 'https://images.unsplash.com/photo-1626196340006-f89d9bedf1c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFsbW9uZHxlbnwwfHwwfHx8MA%3D%3D',
        stock: 60,
        isFeatured: true,
        rating: 4.9,
        reviewCount: 95,
      },
    ],
  })

  // Create some sample orders
  const productList = await prisma.product.findMany()
  
  const order1 = await prisma.order.create({
    data: {
      userId: user.id,
      totalAmount: 45.97,
      status: 'DELIVERED',
      shippingAddressId: address.id,
      paymentId: 'pi_123456789',
      items: {
        create: [
          {
            productId: productList[0].id,
            quantity: 2,
            price: productList[0].price,
          },
          {
            productId: productList[1].id,
            quantity: 1,
            price: productList[1].price,
          },
        ],
      },
    },
  })

  const order2 = await prisma.order.create({
    data: {
      userId: user.id,
      totalAmount: 32.97,
      status: 'PROCESSING',
      shippingAddressId: address.id,
      paymentId: 'pi_987654321',
      items: {
        create: [
          {
            productId: productList[2].id,
            quantity: 1,
            price: productList[2].price,
          },
          {
            productId: productList[3].id,
            quantity: 1,
            price: productList[3].price,
          },
        ],
      },
    },
  })

  // Add some items to cart
  await prisma.cartItem.create({
    data: {
      userId: user.id,
      productId: productList[4].id,
      quantity: 1,
    },
  })

  await prisma.cartItem.create({
    data: {
      userId: user.id,
      productId: productList[5].id,
      quantity: 2,
    },
  })

  console.log(`✅ Seeded database with:
  - 2 users (1 admin, 1 customer)
  - 10 dry fruit products
  - 2 sample orders
  - 2 cart items`)

  console.log('🌱 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })