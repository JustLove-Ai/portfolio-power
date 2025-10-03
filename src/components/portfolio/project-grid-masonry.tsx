'use client'

import { Project } from '@prisma/client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProjectCardMasonry } from './project-card-masonry'

interface ProjectGridMasonryProps {
  projects: Project[]
}

export function ProjectGridMasonry({ projects }: ProjectGridMasonryProps) {
  const [filter, setFilter] = useState<string>('all')

  const categories = ['all', ...new Set(projects.map((p) => p.category))]
  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section className="py-20 px-4">
      <div className="max-w-[1600px] mx-auto">
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
                  ? 'bg-white text-black'
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

        {/* Masonry grid */}
        {filteredProjects.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredProjects.map((project, index) => (
              <ProjectCardMasonry key={project.id} project={project} index={index} />
            ))}
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
