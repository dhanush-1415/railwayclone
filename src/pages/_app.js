import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { CanvasProvider } from '../context/CanvasContext'
import { ThemeProvider } from '../context/ThemeContext'

function MyApp({ Component, pageProps, router }) {
  const [mounted, setMounted] = useState(false)

  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ThemeProvider>
      <CanvasProvider>
        <AnimatePresence mode="wait" initial={false}>
          {mounted && <Component {...pageProps} key={router.pathname} />}
        </AnimatePresence>
      </CanvasProvider>
    </ThemeProvider>
  )
}

export default MyApp
