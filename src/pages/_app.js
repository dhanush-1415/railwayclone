import { ThemeProvider } from 'next-themes'
import { AnimatePresence } from 'framer-motion'
import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps, router }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.pathname} />
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
