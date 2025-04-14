import { motion } from 'framer-motion'

export default function ServiceCard({ icon, title, description, features = [] }) {
  return (
    <div className="card h-full hover:shadow-lg transition-shadow group">
      <div className="flex flex-col h-full">
        <div className="mb-5 text-light-primary dark:text-dark-primary">
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
          {title}
        </h3>
        
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          {description}
        </p>
        
        {features.length > 0 && (
          <div className="mt-auto">
            <div className="w-16 h-1 bg-light-secondary dark:bg-dark-secondary mb-4"></div>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-light-accent dark:text-dark-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
