import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import FeatureCard from '../components/FeatureCard'
import { FiTarget, FiShield, FiTrendingUp, FiSmile } from 'react-icons/fi'

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const features = [
    {
      icon: <FiTarget size={24} />,
      title: "Precision & Accuracy",
      description: "We deliver precise solutions tailored to your specific needs."
    },
    {
      icon: <FiShield size={24} />,
      title: "Secure & Reliable",
      description: "Your data and infrastructure are protected with industry-leading security."
    },
    {
      icon: <FiTrendingUp size={24} />,
      title: "Scalable Growth",
      description: "Our solutions scale with your business, supporting your growth journey."
    },
    {
      icon: <FiSmile size={24} />,
      title: "Client Satisfaction",
      description: "We prioritize your satisfaction with responsive support and quality service."
    }
  ];

  return (
    <>
      <Head>
        <title>Professional Multi-Page App</title>
      </Head>

      <Hero 
        title="Innovative Solutions for Modern Business"
        subtitle="Transform your digital presence with our cutting-edge technologies and expert services"
        ctaText="Get Started"
        ctaLink="/contact"
      />

      <motion.section 
        className="section container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <motion.div variants={fadeIn} className="text-center mb-12">
          <h2 className="text-light-primary dark:text-dark-primary mb-4">Why Choose Us</h2>
          <p className="max-w-2xl mx-auto">We combine innovation with expertise to deliver exceptional results that drive your business forward.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeIn}>
              <FeatureCard 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        className="section bg-light-primary dark:bg-dark-primary text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container text-center">
          <h2 className="mb-8">Ready to Transform Your Business?</h2>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/contact" 
              className="btn bg-light-secondary text-light-text dark:bg-dark-secondary dark:text-dark-background font-bold"
            >
              Contact Us Today
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}
