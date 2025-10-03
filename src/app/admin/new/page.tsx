import { ProjectForm } from '@/components/admin/project-form'

export default function NewProjectPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Create New Project</h1>
        <ProjectForm />
      </div>
    </div>
  )
}
