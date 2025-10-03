import { getPublicProjects } from '@/app/actions/projects'
import { Hero } from '@/components/portfolio/hero'
import { MasonryGrid } from '@/components/portfolio/masonry-grid'

export default async function Home() {
  const projects = await getPublicProjects()

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <MasonryGrid projects={projects} />
    </div>
  )
}
