import Head from 'next/head'
import { motion } from 'framer-motion'
import ContactForm from '../components/ContactForm'
import { FiMap, FiPhone, FiMail, FiClock } from 'react-icons/fi'

export default function Contact() {
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

  const contactInfo = [
    {
      icon: <FiMap size={24} className="text-light-accent dark:text-dark-accent" />,
      title: "Address",
      details: "123 Business Avenue, Suite 500, New York, NY 10001"
    },
    {
      icon: <FiPhone size={24} className="text-light-accent dark:text-dark-accent" />,
      title: "Phone",
      details: "+1 (555) 123-4567"
    },
    {
      icon: <FiMail size={24} className="text-light-accent dark:text-dark-accent" />,
      title: "Email",
      details: "info@yourcompany.com"
    },
    {
      icon: <FiClock size={24} className="text-light-accent dark:text-dark-accent" />,
      title: "Business Hours",
      details: "Monday - Friday: 9AM - 5PM EST"
    }
  ];

  return (
    <>
      <Head>
        <title>Contact Us | Professional Multi-Page App</title>
      </Head>

      <motion.section 
        className="py-16 bg-light-background dark:bg-dark-background"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="mb-6 text-light-primary dark:text-dark-primary">Contact Us</h1>
          <p className="text-lg mb-8">
            We'd love to hear from you. Get in touch with our team for any inquiries or to discuss your project.
          </p>
        </div>
      </motion.section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div 
              className="lg:col-span-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-2xl font-bold mb-6 text-light-primary dark:text-dark-primary">Get In Touch</h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="mt-1 mr-4">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p>{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-3">Connect With Us</h3>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'linkedin', 'instagram'].map((social, index) => (
                    <a 
                      key={index}
                      href={`https://${social}.com/yourcompany`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-light-primary dark:bg-dark-primary flex items-center justify-center text-white hover:opacity-80 transition"
                    >
                      <span className="sr-only">{social}</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white dark:bg-dark-background shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-light-primary dark:text-dark-primary">Send Us a Message</h2>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold mb-6 text-light-primary dark:text-dark-primary">Frequently Asked Questions</h2>
            
            <div className="space-y-6 text-left">
              {[
                {
                  question: "What services do you offer?",
                  answer: "We offer a comprehensive range of digital services including web development, mobile app development, UX/UI design, cloud solutions, e-commerce development, and digital strategy consulting."
                },
                {
                  question: "How long does a typical project take?",
                  answer: "Project timelines vary depending on scope and complexity. A simple website might take 4-6 weeks, while a complex application could take 3-6 months. We'll provide a detailed timeline during our proposal phase."
                },
                {
                  question: "Do you offer maintenance and support?",
                  answer: "Yes, we offer ongoing maintenance and support packages to ensure your digital products remain secure, up-to-date, and optimized for performance."
                },
                {
                  question: "How do we get started?",
                  answer: "Getting started is easy. Simply contact us through this form, and we'll schedule an initial consultation to discuss your needs and objectives."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white dark:bg-dark-background p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
