import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ThemeToggle from './ThemeToggle'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  // Navigation links
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' }
  ]

  // Handle scroll events to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [router.asPath])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white dark:bg-dark-background shadow-md py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="container flex items-center justify-between">
        <Link 
          href="/"
          className="text-2xl font-bold text-light-primary dark:text-dark-primary"
        >
          CompanyLogo
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link 
              href={link.href} 
              key={link.href}
              className={`transition hover:text-light-primary dark:hover:text-dark-primary ${
                router.pathname === link.href 
                  ? 'text-light-primary dark:text-dark-primary font-medium' 
                  : 'text-light-text dark:text-dark-text'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/contact"
              className="btn btn-primary"
            >
              Get Started
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Navigation Button */}
        <div className="flex items-center md:hidden space-x-4">
          <ThemeToggle />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container py-4 bg-white dark:bg-dark-background">
              <nav className="flex flex-col space-y-4">
                {links.map((link) => (
                  <Link 
                    href={link.href} 
                    key={link.href}
                    className={`py-2 px-4 rounded-md ${
                      router.pathname === link.href 
                        ? 'bg-light-primary/10 dark:bg-dark-primary/20 text-light-primary dark:text-dark-primary font-medium' 
                        : 'text-light-text dark:text-dark-text'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link 
                  href="/contact"
                  className="btn btn-primary w-full text-center mt-2"
                >
                  Get Started
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
