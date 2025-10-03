'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { ProjectStatus } from '@prisma/client'

export async function getPublicProjects() {
  return await prisma.project.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getAllProjects() {
  return await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function getProjectBySlug(slug: string) {
  return await prisma.project.findUnique({
    where: { slug },
  })
}

export async function createProject(data: {
  title: string
  description: string
  slug: string
  status: ProjectStatus
  techStack: string[]
  why: string
  features: string[]
  imageUrl?: string
  demoUrl?: string
  githubUrl?: string
  category: string
  isPublic: boolean
}) {
  const project = await prisma.project.create({
    data,
  })
  revalidatePath('/admin')
  revalidatePath('/')
  return project
}

export async function updateProject(
  id: string,
  data: {
    title?: string
    description?: string
    slug?: string
    status?: ProjectStatus
    techStack?: string[]
    why?: string
    features?: string[]
    imageUrl?: string
    demoUrl?: string
    githubUrl?: string
    category?: string
    isPublic?: boolean
  }
) {
  const project = await prisma.project.update({
    where: { id },
    data,
  })
  revalidatePath('/admin')
  revalidatePath('/')
  return project
}

export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: { id },
  })
  revalidatePath('/admin')
  revalidatePath('/')
}
