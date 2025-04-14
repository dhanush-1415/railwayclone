import Link from 'next/link'
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" }
      ]
    },
    {
      title: "Services",
      links: [
        { label: "Web Development", href: "/services" },
        { label: "Mobile Apps", href: "/services" },
        { label: "UI/UX Design", href: "/services" },
        { label: "Cloud Solutions", href: "/services" },
        { label: "Digital Strategy", href: "/services" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Tutorials", href: "#" },
        { label: "Case Studies", href: "#" },
        { label: "FAQs", href: "#" },
        { label: "Support", href: "#" }
      ]
    }
  ]

  const socialLinks = [
    { icon: <FiFacebook />, href: "#", label: "Facebook" },
    { icon: <FiTwitter />, href: "#", label: "Twitter" },
    { icon: <FiLinkedin />, href: "#", label: "LinkedIn" },
    { icon: <FiInstagram />, href: "#", label: "Instagram" }
  ]

  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link 
              href="/"
              className="text-2xl font-bold text-light-primary dark:text-dark-primary mb-4 inline-block"
            >
              CompanyLogo
            </Link>
            <p className="mb-6">
              We deliver innovative digital solutions that drive business growth and transform customer experiences.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <FiMapPin className="mr-2 text-light-accent dark:text-dark-accent" />
                <span>123 Business Avenue, New York, NY 10001</span>
              </div>
              <div className="flex items-center">
                <FiPhone className="mr-2 text-light-accent dark:text-dark-accent" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <FiMail className="mr-2 text-light-accent dark:text-dark-accent" />
                <span>info@yourcompany.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <Link 
                      href={link.href}
                      className="hover:text-light-primary dark:hover:text-dark-primary transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-gray-200 dark:border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            © {currentYear} Your Company. All rights reserved.
          </div>

          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.href} 
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-light-primary dark:bg-dark-primary flex items-center justify-center text-white hover:opacity-80 transition"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
