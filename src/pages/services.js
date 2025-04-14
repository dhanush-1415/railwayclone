import Head from 'next/head'
import { motion } from 'framer-motion'
import ServiceCard from '../components/ServiceCard'
import { FiCode, FiLayout, FiServer, FiShoppingCart, FiBarChart, FiSmartphone } from 'react-icons/fi'

export default function Services() {
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

  const services = [
    {
      icon: <FiLayout size={36} />,
      title: "UI/UX Design",
      description: "Create intuitive, engaging user experiences that delight your customers and strengthen your brand.",
      features: ["User Research", "Interface Design", "Wireframing & Prototyping", "Usability Testing"]
    },
    {
      icon: <FiCode size={36} />,
      title: "Web Development",
      description: "Build responsive, high-performance websites and web applications that drive results.",
      features: ["Frontend Development", "Backend Systems", "CMS Integration", "Performance Optimization"]
    },
    {
      icon: <FiSmartphone size={36} />,
      title: "Mobile Applications",
      description: "Develop native and cross-platform mobile apps that engage users and extend your digital reach.",
      features: ["iOS & Android Development", "Cross-Platform Solutions", "App Store Optimization", "Maintenance & Updates"]
    },
    {
      icon: <FiServer size={36} />,
      title: "Cloud Solutions",
      description: "Leverage cloud technology for scalable, secure, and cost-effective infrastructure.",
      features: ["Cloud Migration", "Infrastructure Setup", "DevOps & CI/CD", "24/7 Monitoring"]
    },
    {
      icon: <FiShoppingCart size={36} />,
      title: "E-Commerce",
      description: "Build powerful online stores that convert visitors into customers and grow your business.",
      features: ["Custom Store Development", "Payment Integration", "Inventory Management", "Shopping Experience Optimization"]
    },
    {
      icon: <FiBarChart size={36} />,
      title: "Digital Strategy",
      description: "Develop comprehensive digital strategies aligned with your business goals and market opportunities.",
      features: ["Digital Transformation", "Technology Roadmapping", "Product Strategy", "Innovation Consulting"]
    }
  ];

  return (
    <>
      <Head>
        <title>Our Services | Professional Multi-Page App</title>
      </Head>

      <motion.section 
        className="py-16 bg-light-background dark:bg-dark-background"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="mb-6 text-light-primary dark:text-dark-primary">Our Services</h1>
          <p className="text-lg mb-8">
            We offer a comprehensive range of digital services to help businesses thrive in the digital landscape.
          </p>
        </div>
      </motion.section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard 
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.section 
        className="section bg-light-primary dark:bg-dark-primary text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">Our Approach</h2>
            <p className="mb-8 text-lg">
              We follow a proven methodology to ensure successful outcomes for every project. Our collaborative approach combines strategic thinking with technical excellence.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <div className="w-12 h-12 rounded-full bg-white text-light-primary dark:text-dark-primary flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-xl">1</span>
                </div>
                <h4 className="font-bold mb-2">Discovery</h4>
                <p className="text-sm">Understanding your needs and objectives</p>
              </div>
              
              <div className="p-4">
                <div className="w-12 h-12 rounded-full bg-white text-light-primary dark:text-dark-primary flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-xl">2</span>
                </div>
                <h4 className="font-bold mb-2">Strategy</h4>
                <p className="text-sm">Developing a tailored solution approach</p>
              </div>
              
              <div className="p-4">
                <div className="w-12 h-12 rounded-full bg-white text-light-primary dark:text-dark-primary flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-xl">3</span>
                </div>
                <h4 className="font-bold mb-2">Execution</h4>
                <p className="text-sm">Implementing with expertise and precision</p>
              </div>
              
              <div className="p-4">
                <div className="w-12 h-12 rounded-full bg-white text-light-primary dark:text-dark-primary flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-xl">4</span>
                </div>
                <h4 className="font-bold mb-2">Optimization</h4>
                <p className="text-sm">Continuous improvement and refinement</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="section">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-light-primary dark:text-dark-primary mb-4">Ready to Get Started?</h2>
            <p className="mb-8">
              Whether you have a specific project in mind or need guidance on your digital strategy, we're here to help.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="/contact" className="btn btn-primary">Schedule a Consultation</a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
