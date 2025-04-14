import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from './Button'
import { FiSend } from 'react-icons/fi'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  })
  
  const [errors, setErrors] = useState({})
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }
  
  const validateForm = () => {
    let formErrors = {}
    let isValid = true
    
    // Name validation
    if (!formData.name.trim()) {
      formErrors.name = 'Name is required'
      isValid = false
    }
    
    // Email validation
    if (!formData.email.trim()) {
      formErrors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid'
      isValid = false
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      formErrors.subject = 'Subject is required'
      isValid = false
    }
    
    // Message validation
    if (!formData.message.trim()) {
      formErrors.message = 'Message is required'
      isValid = false
    } else if (formData.message.trim().length < 10) {
      formErrors.message = 'Message should be at least 10 characters'
      isValid = false
    }
    
    setErrors(formErrors)
    return isValid
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // For demonstration, we'll simulate a successful form submission
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      })
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      
      // In a real application, you would send the form data to a server
      // fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // .then(response => response.json())
      // .then(data => {
      //   setFormStatus({
      //     submitted: true,
      //     success: true,
      //     message: data.message
      //   })
      // })
      // .catch(error => {
      //   setFormStatus({
      //     submitted: true,
      //     success: false,
      //     message: 'There was an error sending your message. Please try again.'
      //   })
      // })
    }
  }
  
  return (
    <>
      {formStatus.submitted && formStatus.success ? (
        <motion.div 
          className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
          <p>{formStatus.message}</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-light-primary dark:focus:ring-dark-primary'
                }`}
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-light-primary dark:focus:ring-dark-primary'
                }`}
                placeholder="Your email"
              />
              {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block mb-2 font-medium">Phone (Optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-light-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-dark-primary"
                placeholder="Your phone number"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 ${
                  errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-light-primary dark:focus:ring-dark-primary'
                }`}
                placeholder="Message subject"
              />
              {errors.subject && <p className="mt-1 text-red-500 text-sm">{errors.subject}</p>}
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block mb-2 font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 ${
                errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-light-primary dark:focus:ring-dark-primary'
              }`}
              placeholder="Write your message here..."
            ></textarea>
            {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              type="submit" 
              variant="primary"
              fullWidth
              icon={<FiSend />}
            >
              Send Message
            </Button>
          </motion.div>
        </form>
      )}
    </>
  )
}
