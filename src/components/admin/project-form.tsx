'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Project, ProjectStatus } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createProject, updateProject } from '@/app/actions/projects'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ProjectFormProps {
  project?: Project
}

type Section = 'basic' | 'content' | 'links' | 'settings'

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeSection, setActiveSection] = useState<Section>('basic')
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    slug: project?.slug || '',
    status: project?.status || 'IN_PROGRESS',
    techStack: project?.techStack.join(', ') || '',
    why: project?.why || '',
    features: project?.features.join('\n') || '',
    imageUrl: project?.imageUrl || '',
    demoUrl: project?.demoUrl || '',
    githubUrl: project?.githubUrl || '',
    category: project?.category || '',
    isPublic: project?.isPublic ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const data = {
        title: formData.title,
        description: formData.description,
        slug: formData.slug,
        status: formData.status as ProjectStatus,
        techStack: formData.techStack.split(',').map((s) => s.trim()),
        why: formData.why,
        features: formData.features.split('\n').filter((f) => f.trim()),
        imageUrl: formData.imageUrl || undefined,
        demoUrl: formData.demoUrl || undefined,
        githubUrl: formData.githubUrl || undefined,
        category: formData.category,
        isPublic: formData.isPublic,
      }

      if (project) {
        await updateProject(project.id, data)
      } else {
        await createProject(data)
      }

      router.push('/admin')
      router.refresh()
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Error saving project')
    } finally {
      setIsSubmitting(false)
    }
  }

  const sections = [
    { id: 'basic' as Section, label: 'Basic Info', icon: '📝' },
    { id: 'content' as Section, label: 'Content', icon: '✍️' },
    { id: 'links' as Section, label: 'Links', icon: '🔗' },
    { id: 'settings' as Section, label: 'Settings', icon: '⚙️' },
  ]

  return (
    <form onSubmit={handleSubmit} className="flex gap-8 min-h-[calc(100vh-12rem)]">
      {/* Sidebar Navigation */}
      <div className="w-64 flex-shrink-0">
        <div className="sticky top-8 space-y-2">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">
              Project Sections
            </h3>
          </div>

          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeSection === section.id
                  ? 'bg-white text-black font-medium'
                  : 'bg-zinc-900/50 text-gray-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}

          <div className="pt-6 space-y-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D30013] hover:bg-[#B00010] text-white"
            >
              {isSubmitting
                ? 'Saving...'
                : project
                ? 'Update Project'
                : 'Create Project'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin')}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="flex-1">
        <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8">
          {/* Basic Info Section */}
          {activeSection === 'basic' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
                <p className="text-gray-400 text-sm">
                  Essential details about your project
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    placeholder="AI Content Generator"
                    className="bg-black/20 border-zinc-700 h-12 focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    required
                    placeholder="ai-content-generator"
                    className="bg-black/20 border-zinc-700 h-12 focus:border-white transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be used in the URL: /project/{formData.slug || 'your-slug'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    rows={4}
                    placeholder="A brief description of what your project does..."
                    className="bg-black/20 border-zinc-700 focus:border-white transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData({ ...formData, status: value as ProjectStatus })
                      }
                    >
                      <SelectTrigger className="bg-black/20 border-zinc-700 h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PLANNING">🎯 Planning</SelectItem>
                        <SelectItem value="IN_PROGRESS">🚧 In Progress</SelectItem>
                        <SelectItem value="COMPLETED">✅ Completed</SelectItem>
                        <SelectItem value="MAINTENANCE">🔧 Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      required
                      placeholder="AI Tool, Web App, etc."
                      className="bg-black/20 border-zinc-700 h-12 focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tech Stack <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.techStack}
                    onChange={(e) =>
                      setFormData({ ...formData, techStack: e.target.value })
                    }
                    required
                    placeholder="Next.js, React, TailwindCSS, OpenAI"
                    className="bg-black/20 border-zinc-700 h-12 focus:border-white transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate technologies with commas
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Content Section */}
          {activeSection === 'content' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Project Content</h2>
                <p className="text-gray-400 text-sm">
                  Tell the story behind your project
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Why I Built This <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={formData.why}
                    onChange={(e) =>
                      setFormData({ ...formData, why: e.target.value })
                    }
                    required
                    rows={6}
                    placeholder="Explain your motivation and the problem you're solving..."
                    className="bg-black/20 border-zinc-700 focus:border-white transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Key Features <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={formData.features}
                    onChange={(e) =>
                      setFormData({ ...formData, features: e.target.value })
                    }
                    required
                    rows={8}
                    placeholder="List features, one per line:&#10;AI-powered generation&#10;Real-time collaboration&#10;Export to multiple formats"
                    className="bg-black/20 border-zinc-700 focus:border-white transition-colors resize-none font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Each line will become a separate feature point
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Links Section */}
          {activeSection === 'links' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Project Links</h2>
                <p className="text-gray-400 text-sm">
                  Add links to showcase your project
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Image URL
                  </label>
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                    className="bg-black/20 border-zinc-700 h-12 focus:border-white transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    A screenshot or preview image of your project
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Live Demo URL
                  </label>
                  <Input
                    value={formData.demoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, demoUrl: e.target.value })
                    }
                    placeholder="https://demo.example.com"
                    className="bg-black/20 border-zinc-700 h-12 focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    GitHub Repository
                  </label>
                  <Input
                    value={formData.githubUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, githubUrl: e.target.value })
                    }
                    placeholder="https://github.com/username/repo"
                    className="bg-black/20 border-zinc-700 h-12 focus:border-white transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Project Settings</h2>
                <p className="text-gray-400 text-sm">
                  Configure visibility and other options
                </p>
              </div>

              <div className="space-y-5">
                <div className="p-6 bg-black/20 border border-zinc-700 rounded-lg">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      id="isPublic"
                      checked={formData.isPublic}
                      onChange={(e) =>
                        setFormData({ ...formData, isPublic: e.target.checked })
                      }
                      className="w-5 h-5 mt-1 accent-white"
                    />
                    <div className="flex-1">
                      <label htmlFor="isPublic" className="font-medium cursor-pointer">
                        Make this project public
                      </label>
                      <p className="text-sm text-gray-400 mt-1">
                        Public projects will be visible on your portfolio homepage.
                        Private projects are only accessible via the admin panel.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-900/10 border border-blue-800/30 rounded-lg">
                  <h3 className="font-medium mb-2">💡 Quick Tips</h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Use high-quality images for better presentation</li>
                    <li>• Keep descriptions concise and impactful</li>
                    <li>• Add demo links to increase engagement</li>
                    <li>• List 3-6 key features for best results</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
