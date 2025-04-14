import Head from 'next/head'
import { motion } from 'framer-motion'
import { FiUsers, FiAward, FiTrello, FiTarget } from 'react-icons/fi'

export default function About() {
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

  const teamMembers = [
    {
      name: "Alexandra Chen",
      position: "Chief Executive Officer",
      bio: "With over 15 years of industry experience, Alexandra leads our company with vision and strategic insight."
    },
    {
      name: "Marcus Johnson",
      position: "Chief Technology Officer",
      bio: "Marcus brings deep technical expertise and innovation leadership to our technology development."
    },
    {
      name: "Sophia Rodriguez",
      position: "Design Director",
      bio: "Sophia's creative vision shapes our user experience and brand identity across all platforms."
    },
    {
      name: "David Kim",
      position: "Client Success Manager",
      bio: "David ensures our clients receive exceptional service and achieve their business objectives."
    }
  ];

  const values = [
    {
      icon: <FiUsers className="text-light-accent dark:text-dark-accent" size={28} />,
      title: "Client-Centric Approach",
      description: "We put our clients at the center of everything we do, ensuring their needs drive our solutions."
    },
    {
      icon: <FiAward className="text-light-accent dark:text-dark-accent" size={28} />,
      title: "Excellence in Delivery",
      description: "We strive for excellence in every project, delivering quality that exceeds expectations."
    },
    {
      icon: <FiTrello className="text-light-accent dark:text-dark-accent" size={28} />,
      title: "Innovative Thinking",
      description: "We constantly explore new ideas and technologies to bring innovative solutions to complex problems."
    },
    {
      icon: <FiTarget className="text-light-accent dark:text-dark-accent" size={28} />,
      title: "Measurable Results",
      description: "We focus on delivering tangible outcomes that create real business value for our clients."
    }
  ];

  return (
    <>
      <Head>
        <title>About Us | Professional Multi-Page App</title>
      </Head>

      <motion.section 
        className="py-16 bg-light-background dark:bg-dark-background"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="mb-6 text-light-primary dark:text-dark-primary">About Our Company</h1>
          <p className="text-lg mb-8">
            We are a forward-thinking team of experts dedicated to delivering exceptional digital solutions that drive business growth and innovation.
          </p>
          <div className="w-24 h-1 bg-light-secondary dark:bg-dark-secondary mx-auto my-8"></div>
          <p className="mb-8">
            Founded in 2015, our company has grown from a small startup to an industry leader, serving clients across various sectors including finance, healthcare, education, and e-commerce. We combine technical expertise with creative thinking to solve complex business challenges.
          </p>
        </div>
      </motion.section>

      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-light-primary dark:text-dark-primary mb-4">Our Core Values</h2>
            <p className="max-w-2xl mx-auto">The principles that guide our work and define our culture</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="flex p-6 bg-white dark:bg-dark-background rounded-lg shadow-md"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mr-4 mt-1">{value.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-light-primary dark:text-dark-primary mb-4">Our Leadership Team</h2>
            <p className="max-w-2xl mx-auto">Meet the experts driving our vision and success</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="card text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-24 h-24 rounded-full bg-light-primary dark:bg-dark-primary mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-light-accent dark:text-dark-accent mb-3">{member.position}</p>
                <p className="text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
