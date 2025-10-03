'use client'

import { Project } from '@prisma/client'
import { ProjectCard } from './project-card'
import { useState } from 'react'

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [filter, setFilter] = useState<string>('all')

  const categories = ['all', ...new Set(projects.map((p) => p.category))]
  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-white text-black'
                  : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Project grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  )
}
