import { AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTransition from '../components/ui/PageTransition'

export default function MarketingLayout() {
  const location = useLocation()

  return (
    <div className="app">
      <Navbar />
      <main className="main-content relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname} layoutId="route-shell" className="min-h-full">
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
