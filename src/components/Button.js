import { motion } from 'framer-motion'

export default function Button({ 
  children, 
  variant = 'primary', 
  type = 'button',
  className = '',
  onClick,
  disabled = false,
  fullWidth = false,
  icon = null
}) {
  // Define base classes
  const baseClasses = "inline-flex items-center justify-center px-5 py-3 font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  // Define variant specific classes
  const variantClasses = {
    primary: "text-white bg-light-primary hover:bg-opacity-90 focus:ring-light-primary dark:bg-dark-primary dark:focus:ring-dark-primary",
    secondary: "text-light-text bg-light-secondary hover:bg-opacity-90 focus:ring-light-secondary dark:text-dark-background dark:bg-dark-secondary dark:focus:ring-dark-secondary",
    outline: "border border-light-primary text-light-primary hover:bg-light-primary hover:bg-opacity-10 focus:ring-light-primary dark:border-dark-primary dark:text-dark-primary dark:hover:bg-dark-primary dark:hover:bg-opacity-10 dark:focus:ring-dark-primary",
    ghost: "text-light-primary hover:bg-light-primary hover:bg-opacity-10 focus:ring-light-primary dark:text-dark-primary dark:hover:bg-dark-primary dark:hover:bg-opacity-10 dark:focus:ring-dark-primary"
  }
  
  // Combine classes
  const classes = `${baseClasses} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`
  
  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  )
}
