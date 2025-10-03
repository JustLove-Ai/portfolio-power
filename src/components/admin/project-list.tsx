'use client'

import { Project } from '@prisma/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { deleteProject } from '@/app/actions/projects'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setDeletingId(id)
      await deleteProject(id)
      setDeletingId(null)
    }
  }

  const getStatusColor = (status: string) => {
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

  return (
    <div className="grid gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className="p-6 bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all duration-300 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Project Image Thumbnail */}
              {project.imageUrl && (
                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Project Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-white flex-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.replace('_', ' ')}
                    </Badge>
                    {!project.isPublic && (
                      <Badge variant="outline" className="border-red-500/50 text-red-400">
                        Private
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-gray-300 mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex gap-2 flex-wrap mb-3">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-zinc-800 text-gray-300 border-zinc-700"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 5 && (
                    <Badge variant="secondary" className="bg-zinc-800 text-gray-300">
                      +{project.techStack.length - 5} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Category: <span className="text-gray-400 font-medium">{project.category}</span>
                  </p>

                  <div className="flex gap-2">
                    <Link href={`/admin/edit/${project.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-zinc-700 hover:bg-zinc-800"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                      disabled={deletingId === project.id}
                      className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/50"
                    >
                      {deletingId === project.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}

      {projects.length === 0 && (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="inline-block p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <p className="text-gray-400 text-lg mb-4">No projects yet</p>
            <Link href="/admin/new">
              <Button className="bg-[#D30013] hover:bg-[#B00010] text-white">
                Create your first project
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}
