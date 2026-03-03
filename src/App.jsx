import Header from './components/Header'
import FeaturedCarousel from './components/FeaturedCarousel'
import SupportSection from './components/SupportSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <FeaturedCarousel />
        <SupportSection />
      </main>
      <Footer />
    </>
  )
}
