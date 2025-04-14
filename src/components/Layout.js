import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  const [mounted, setMounted] = useState(false)
  
  // Theme effect to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <header>
          <div className="h-16 md:h-20"></div>
        </header>
        <main className="flex-grow">
          {/* Placeholder for content */}
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </main>
        <footer>
          <div className="h-64 bg-gray-100 dark:bg-gray-800"></div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
