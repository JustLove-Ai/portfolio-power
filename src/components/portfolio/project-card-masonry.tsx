'use client'

import { Project } from '@prisma/client'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface ProjectCardMasonryProps {
  project: Project
  index: number
}

export function ProjectCardMasonry({ project, index }: ProjectCardMasonryProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Vary card heights for masonry effect
  const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-64']
  const heightClass = heights[index % heights.length]

  return (
    <motion.div
      className="break-inside-avoid mb-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/project/${project.slug}`}>
        <motion.div
          className={`relative overflow-hidden bg-zinc-900/50 border border-zinc-800 rounded-2xl ${heightClass} group cursor-pointer backdrop-blur-sm`}
          whileHover={{ scale: 1.02, borderColor: 'rgb(113 113 122)' }}
          transition={{ duration: 0.3 }}
        >
          {/* Background image */}
          <div className="absolute inset-0">
            {project.imageUrl ? (
              <motion.img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.6 }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                <span className="text-9xl font-bold opacity-5">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            {/* Top section */}
            <div className="flex items-start justify-between">
              <Badge className={`${getStatusColor(project.status)} backdrop-blur-md`}>
                {project.status.replace('_', ' ')}
              </Badge>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                transition={{ duration: 0.3 }}
              >
                <Badge variant="secondary" className="backdrop-blur-md">
                  {project.category}
                </Badge>
              </motion.div>
            </div>

            {/* Bottom section */}
            <div>
              <motion.h3
                className="text-2xl font-bold mb-2 text-white"
                animate={{ y: isHovered ? -5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {project.title}
              </motion.h3>

              <motion.p
                className="text-gray-300 text-sm mb-4 line-clamp-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {project.description}
              </motion.p>

              {/* Tech stack */}
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.3 }}
              >
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-md bg-white/10 text-white backdrop-blur-md"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded-md bg-white/10 text-white backdrop-blur-md">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </motion.div>
            </div>
          </div>

          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
            animate={{ translateX: isHovered ? '200%' : '-100%' }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}

function getStatusColor(status: string) {
  switch (status) {
    case 'COMPLETED':
      return 'bg-green-500/90 text-white'
    case 'IN_PROGRESS':
      return 'bg-blue-500/90 text-white'
    case 'PLANNING':
      return 'bg-yellow-500/90 text-black'
    case 'MAINTENANCE':
      return 'bg-purple-500/90 text-white'
    default:
      return 'bg-gray-500/90 text-white'
  }
}
