import { motion } from 'framer-motion'

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="card h-full transition-all hover:shadow-lg">
      <div className="w-12 h-12 rounded-lg bg-light-primary dark:bg-dark-primary text-white flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}
