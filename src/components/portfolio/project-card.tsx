'use client'

import { Project } from '@prisma/client'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group animate-in fade-in slide-in-from-bottom-4 duration-700"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/project/${project.slug}`}>
        <Card className="relative overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 transition-all duration-500 h-full backdrop-blur-sm">
          {/* Image section */}
          <div className="relative h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isHovered ? 'scale-110' : 'scale-100'
                }`}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold opacity-10">
                  {project.title.charAt(0)}
                </div>
              </div>
            )}

            {/* Overlay gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Status badge */}
            <div className="absolute top-4 right-4">
              <Badge
                className={`${getStatusColor(project.status)} backdrop-blur-sm`}
              >
                {project.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>

          {/* Content section */}
          <div className="p-6">
            <div className="mb-3">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2">
                {project.description}
              </p>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.slice(0, 3).map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-xs bg-zinc-800 hover:bg-zinc-700"
                >
                  {tech}
                </Badge>
              ))}
              {project.techStack.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-zinc-800">
                  +{project.techStack.length - 3}
                </Badge>
              )}
            </div>

            {/* Action buttons */}
            <div
              className={`flex gap-2 transition-all duration-500 ${
                isHovered
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-2'
              }`}
            >
              {project.demoUrl && (
                <Button
                  size="sm"
                  className="flex-1 bg-white text-black hover:bg-gray-200"
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(project.demoUrl!, '_blank')
                  }}
                >
                  View Demo
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(project.githubUrl!, '_blank')
                  }}
                >
                  GitHub
                </Button>
              )}
            </div>
          </div>

          {/* Shine effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full transition-transform duration-1000 ${
              isHovered ? 'translate-x-full' : ''
            }`}
          />
        </Card>
      </Link>
    </div>
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
