'use client'

import { Project } from '@prisma/client'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'

interface StatsCardsProps {
  projects: Project[]
}

export function StatsCards({ projects }: StatsCardsProps) {
  const stats = {
    total: projects.length,
    public: projects.filter((p) => p.isPublic).length,
    private: projects.filter((p) => !p.isPublic).length,
    completed: projects.filter((p) => p.status === 'COMPLETED').length,
    inProgress: projects.filter((p) => p.status === 'IN_PROGRESS').length,
    planning: projects.filter((p) => p.status === 'PLANNING').length,
  }

  const cards = [
    {
      label: 'Total Projects',
      value: stats.total,
      gradient: 'from-blue-500 to-blue-600',
      icon: '📊',
    },
    {
      label: 'Public',
      value: stats.public,
      gradient: 'from-green-500 to-green-600',
      icon: '🌐',
    },
    {
      label: 'Private',
      value: stats.private,
      gradient: 'from-red-500 to-red-600',
      icon: '🔒',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className="relative overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all duration-300 group">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
            />
            <div className="relative p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{card.icon}</span>
                <motion.div
                  className={`text-3xl font-black bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.2, type: 'spring' }}
                >
                  {card.value}
                </motion.div>
              </div>
              <p className="text-sm text-gray-400 font-medium">{card.label}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
