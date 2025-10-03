'use client'

import { Project } from '@prisma/client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MasonryProjectCard } from './masonry-project-card'
import { AccentBlock } from './accent-block'

interface MasonryGridProps {
  projects: Project[]
}

export function MasonryGrid({ projects }: MasonryGridProps) {
  const [filter, setFilter] = useState<string>('all')

  const categories = ['all', ...new Set(projects.map((p) => p.category))]
  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  // Accent blocks to intersperse between projects
  const accentBlocks = [
    { type: 'keyword', text: 'AI', gradient: 'from-blue-600 to-purple-600' },
    { type: 'keyword', text: 'Automation', gradient: 'from-purple-600 to-pink-600' },
    { type: 'keyword', text: 'Innovation', gradient: 'from-pink-600 to-red-600' },
    { type: 'keyword', text: 'Agents', gradient: 'from-cyan-600 to-blue-600' },
    { type: 'stats', text: '10+', subtitle: 'Projects Built', gradient: 'from-green-600 to-emerald-600' },
  ]

  // Create mixed content array with projects and accent blocks
  const createMixedContent = () => {
    const mixed: Array<{ type: 'project' | 'accent'; data: any; index: number }> = []

    filteredProjects.forEach((project, index) => {
      mixed.push({ type: 'project', data: project, index })

      // Add accent block after every 2-3 projects
      if ((index + 1) % 3 === 0 && accentBlocks[Math.floor(index / 3) % accentBlocks.length]) {
        mixed.push({
          type: 'accent',
          data: accentBlocks[Math.floor(index / 3) % accentBlocks.length],
          index: index + 0.5,
        })
      }
    })

    return mixed
  }

  const mixedContent = createMixedContent()

  return (
    <section className="py-20 px-4">
      <div className="max-w-[1800px] mx-auto">
        {/* Filter buttons */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-[#D30013] text-white'
                  : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800 hover:text-white'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Pinterest-style Masonry Grid */}
        {mixedContent.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {mixedContent.map((item, idx) =>
              item.type === 'project' ? (
                <MasonryProjectCard
                  key={`project-${item.data.id}`}
                  project={item.data}
                  index={idx}
                />
              ) : (
                <AccentBlock
                  key={`accent-${idx}`}
                  {...item.data}
                  index={idx}
                />
              )
            )}
          </div>
        ) : (
          <motion.div
            className="text-center py-20 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No projects in this category yet.
          </motion.div>
        )}
      </div>
    </section>
  )
}
