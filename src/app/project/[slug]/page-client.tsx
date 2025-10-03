'use client'

import { ProjectGallery } from '@/components/portfolio/project-gallery'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Project } from '@prisma/client'

interface ProjectPageClientProps {
  project: Project
}

export function ProjectPageClient({ project }: ProjectPageClientProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.div
        className="border-b border-zinc-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-gray-400 hover:text-white transition">
            ← Back to Portfolio
          </Link>
        </div>
      </motion.div>

      {/* Hero section */}
      <motion.div
        className="relative py-20 px-4 border-b border-zinc-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center gap-3">
            <Badge className={getStatusColor(project.status)}>
              {project.status.replace('_', ' ')}
            </Badge>
            <span className="text-gray-500">{project.category}</span>
          </div>

          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {project.description}
          </motion.p>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main column */}
          <motion.div
            className="lg:col-span-2 space-y-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 ? (
              <ProjectGallery images={project.gallery} />
            ) : project.imageUrl ? (
              <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full aspect-video object-cover"
                />
              </Card>
            ) : null}

            {/* Why section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">Why I Built This</h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {project.why}
              </div>
            </motion.div>

            {/* Features section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  >
                    <Card
                      className="p-4 bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:translate-x-1"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold">✓</span>
                        </div>
                        <p className="text-gray-300">{feature}</p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Tech Stack */}
            <Card className="p-6 bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
              <h3 className="text-xl font-bold mb-4 text-white">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                  >
                    <Badge
                      className="bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Project Info */}
            <Card className="p-6 bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
              <h3 className="text-xl font-bold mb-4 text-white">Project Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-gray-400">Status</span>
                  <span className="font-medium text-white">
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-gray-400">Category</span>
                  <span className="font-medium text-white">{project.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Created</span>
                  <span className="font-medium text-white">
                    {new Date(project.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <Card className="p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/50 hover:border-blue-700/50 transition-colors">
              <h3 className="text-xl font-bold mb-2 text-white">Interested?</h3>
              <p className="text-sm text-gray-300 mb-4">
                Check out the live demo or view the source code on GitHub.
              </p>
              <div className="space-y-2">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-[#D30013] hover:bg-[#B00010] text-white">
                      View Demo
                    </Button>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full border-white/20 hover:bg-white/10">
                      View on GitHub
                    </Button>
                  </a>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
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
