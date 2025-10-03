import { getProjectBySlug } from '@/app/actions/projects'
import { notFound } from 'next/navigation'
import { ProjectPageClient } from './page-client'

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project || !project.isPublic) {
    notFound()
  }

  return <ProjectPageClient project={project} />
}
