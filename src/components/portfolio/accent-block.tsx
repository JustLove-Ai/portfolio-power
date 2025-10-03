'use client'

import { motion } from 'framer-motion'

interface AccentBlockProps {
  type: 'keyword' | 'stats'
  text: string
  subtitle?: string
  gradient: string
  index: number
}

export function AccentBlock({ type, text, subtitle, gradient, index }: AccentBlockProps) {
  return (
    <motion.div
      className="break-inside-avoid mb-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {type === 'keyword' ? (
        // Large keyword block
        <motion.div
          className={`relative overflow-hidden rounded-2xl p-8 min-h-[200px] flex items-center justify-center bg-gradient-to-br ${gradient}`}
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/5 blur-xl" />

          <motion.h2
            className="relative text-5xl md:text-6xl font-black text-white text-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {text}
          </motion.h2>
        </motion.div>
      ) : (
        // Stats block
        <motion.div
          className={`relative overflow-hidden rounded-2xl p-8 min-h-[180px] flex flex-col items-center justify-center bg-gradient-to-br ${gradient} border-2 border-white/20`}
          whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.4)' }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/10" />

          <motion.div
            className="relative text-6xl font-black text-white mb-2"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            {text}
          </motion.div>

          {subtitle && (
            <p className="relative text-sm font-medium text-white/90 uppercase tracking-wider">
              {subtitle}
            </p>
          )}

          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full" />
        </motion.div>
      )}
    </motion.div>
  )
}
