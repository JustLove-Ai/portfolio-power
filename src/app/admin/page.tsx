import { getAllProjects } from '@/app/actions/projects'
import { ProjectList } from '@/components/admin/project-list'
import { StatsCards } from '@/components/admin/stats-cards'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function AdminPage() {
  const projects = await getAllProjects()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative py-20 px-4 border-b border-zinc-800">
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                Project Management
              </h1>
              <p className="text-gray-400 text-lg">
                Manage your portfolio projects
              </p>
            </div>
            <Link href="/admin/new">
              <Button className="bg-[#D30013] hover:bg-[#B00010] text-white h-12 px-8 text-base font-medium rounded-full">
                + Add New Project
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats and Projects */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <StatsCards projects={projects} />
        <ProjectList projects={projects} />
      </div>
    </div>
  )
}
