import Navbar from "@/components/navbar"
import HeroSection from "@/components/home/hero-section"
import FeaturedProducts from "@/components/home/featured-products"
import Categories from "@/components/home/categories"
import Benefits from "@/components/home/benefits"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <Categories />
      <Benefits />
      <Footer />
    </div>
  )
}