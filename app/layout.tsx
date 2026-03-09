import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/session-provider";
import StripeProvider from "@/components/providers/stripe-provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NutriPay Hub - Premium Dry Fruits Store",
  description: "Modern dry fruit store with admin panel and secure payments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <AuthProvider>
          <StripeProvider>
            {children}
            <Toaster position="top-right" />
          </StripeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
