import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { CanvasProvider } from '../context/CanvasContext'

function MyApp({ Component, pageProps, router }) {
  const [mounted, setMounted] = useState(false)

  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <CanvasProvider>
      <AnimatePresence mode="wait" initial={false}>
        {mounted && <Component {...pageProps} key={router.pathname} />}
      </AnimatePresence>
    </CanvasProvider>
  )
}

export default MyApp
