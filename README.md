# NutriPay Hub - Modern Dry Fruit Store

A modern, full-featured dry fruit e-commerce store with admin panel and Stripe payment integration built with Next.js 14.

## Features

### 🛍️ Store Features
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Product Catalog**: Browse and filter dry fruits by category, price, and rating
- **Shopping Cart**: Add, update, and remove items from cart
- **User Authentication**: Secure login/signup with NextAuth.js
- **Checkout Process**: Multi-step checkout with address management
- **Stripe Payments**: Secure payment processing with Stripe integration
- **Order Tracking**: View order history and status

### 👨‍💼 Admin Panel
- **Dashboard**: Overview of sales, orders, and customer metrics
- **Product Management**: Add, edit, and manage products
- **Order Management**: View and update order status
- **Customer Management**: View customer details and order history
- **Analytics**: Sales and revenue analytics

### 🛠️ Technical Features
- **Next.js 14**: App Router with TypeScript
- **Prisma ORM**: Database management with SQLite
- **NextAuth.js**: Authentication and authorization
- **Stripe**: Payment processing
- **Tailwind CSS**: Modern styling
- **React Hot Toast**: Notifications
- **Lucide React**: Icons

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Stripe account for payments

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nutripay-hub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

5. Set up the database:
```bash
npm run db:setup
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

The project uses Prisma with SQLite. To set up the database:

1. Push the schema to the database:
```bash
npm run db:push
```

2. Seed the database with sample data:
```bash
npm run db:seed
```

3. Access Prisma Studio (optional):
```bash
npm run prisma:studio
```

## Default Accounts

### Admin Account
- Email: `admin@nutripay.com`
- Password: `admin123`

### Customer Account
- Email: `user@example.com`
- Password: `user123`

## Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Add them to your `.env` file:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## Project Structure

```
nutripay-hub/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout page
│   ├── products/          # Products page
│   └── ...                # Other pages
├── components/            # React components
│   ├── admin/             # Admin components
│   ├── home/              # Home page components
│   ├── products/          # Product components
│   └── ...                # Other components
├── lib/                   # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   ├── stripe.ts         # Stripe configuration
│   └── utils.ts          # Utility functions
├── prisma/               # Database schema
│   ├── schema.prisma     # Prisma schema
│   └── seed.ts          # Database seed script
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema
- `npm run db:seed` - Seed database with sample data
- `npm run db:setup` - Setup database (push + seed)
- `npm run prisma:studio` - Open Prisma Studio

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository on Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production
Make sure to set these environment variables in your production environment:

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="strong-secret-key"
NEXTAUTH_URL="https://your-domain.com"
STRIPE_SECRET_KEY="your-stripe-secret-key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
```

## License

MIT License - see LICENSE file for details.

## Support

For support, email support@nutripayhub.com or create an issue in the repository.