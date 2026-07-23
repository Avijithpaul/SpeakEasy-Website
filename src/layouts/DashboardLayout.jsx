import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Sidebar from '../components/dashboard/Sidebar'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import PageTransition from '../components/ui/PageTransition'
import AmbientBackground from '../components/motion/AmbientBackground'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="app min-h-screen flex flex-col bg-[var(--bg-primary)] relative overflow-hidden">
      <AmbientBackground intensity="subtle" />
      <Navbar />

      <div className="flex flex-1 min-h-0 relative z-10">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-y-auto">
            <AnimatePresence mode="wait" initial={false}>
              <PageTransition key={location.pathname} className="min-h-full">
                <Outlet />
              </PageTransition>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}
