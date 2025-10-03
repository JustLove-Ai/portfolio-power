import { getAllProjects } from '@/app/actions/projects'
import { ProjectForm } from '@/components/admin/project-form'
import { notFound } from 'next/navigation'

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const projects = await getAllProjects()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Edit Project</h1>
        <ProjectForm project={project} />
      </div>
    </div>
  )
}
