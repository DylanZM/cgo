import Hero from '../components/landing/Hero'
import Manifesto from '../components/landing/Manifesto'
import Languages from '../components/landing/Languages'
import Features from '../components/landing/Features'
import WhyCgo from '../components/landing/WhyCgo'
import OpenSource from '../components/landing/OpenSource'
import FinalCTA from '../components/landing/FinalCTA'
import Footer from '../components/landing/Footer'
import Header from '../components/layout/Header'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'languages', label: 'Languages' },
  { id: 'why', label: 'Why cgo' },
]

export default function Landing() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header sections={sections} />

      <main className="flex-1">
        <Hero />
        <Manifesto />
        <Languages />
        <Features />
        <WhyCgo />
        <OpenSource />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
