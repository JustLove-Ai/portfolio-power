'use client'

import { Project } from '@prisma/client'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface MasonryProjectCardProps {
  project: Project
  index: number
  variant?: string
}

export function MasonryProjectCard({ project, index }: MasonryProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="break-inside-avoid mb-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image-first card with minimal text */}
      <Link href={`/project/${project.slug}`}>
        <motion.div
          className="relative overflow-hidden bg-zinc-900/50 border border-zinc-800 rounded-3xl group cursor-pointer"
          whileHover={{ scale: 1.02, borderColor: 'rgb(161 161 170)' }}
          transition={{ duration: 0.3 }}
        >
          {/* Main Image - Full prominence */}
          <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
            {project.imageUrl ? (
              <motion.img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.6 }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                <span className="text-9xl font-bold opacity-10 text-white">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}

            {/* Very subtle gradient overlay only at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />

            {/* Status badge - top corner, small and subtle */}
            <div className="absolute top-4 right-4 opacity-90">
              <Badge className={`${getStatusColor(project.status)} backdrop-blur-md text-xs`}>
                {project.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>

          {/* Text content - Below image, clean and minimal */}
          <div className="p-5 bg-zinc-900/80 backdrop-blur-sm">
            <motion.h3
              className="text-xl font-bold mb-2 text-white line-clamp-1"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>

            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
              {project.description}
            </p>

            {/* Tech stack - only show on hover */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                height: isHovered ? 'auto' : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-gray-300"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-gray-300">
                  +{project.techStack.length - 3}
                </span>
              )}
            </motion.div>
          </div>

          {/* Hover shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full pointer-events-none"
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
