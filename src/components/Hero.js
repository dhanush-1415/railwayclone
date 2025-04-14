import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero({ title, subtitle, ctaText, ctaLink }) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-light-background dark:bg-dark-background">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-light-primary dark:bg-dark-primary"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-light-accent dark:bg-dark-accent"></div>
        <div className="absolute -bottom-16 left-1/4 w-40 h-40 rounded-full bg-light-secondary dark:bg-dark-secondary"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="mb-6 text-light-primary dark:text-dark-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h1>
          
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div 
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href={ctaLink}
                className="btn btn-primary"
              >
                {ctaText}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
