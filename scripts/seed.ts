import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.project.deleteMany()

  // Create demo projects
  const projects = [
    {
      title: 'AI Content Generator',
      slug: 'ai-content-generator',
      description:
        'An intelligent content generation platform that creates blog posts, social media content, and marketing copy using advanced AI models.',
      status: 'COMPLETED',
      techStack: ['Next.js', 'OpenAI GPT-4', 'TailwindCSS', 'Prisma', 'MongoDB'],
      why: 'I built this to help content creators overcome writer\'s block and streamline their content creation process. Traditional content creation is time-consuming, and I wanted to create a tool that maintains quality while significantly reducing the time investment.',
      features: [
        'Multi-format content generation (blogs, social media, emails)',
        'Tone and style customization',
        'SEO optimization suggestions',
        'Real-time preview and editing',
        'Content history and versioning',
        'Export to multiple formats (PDF, DOCX, HTML)',
      ],
      imageUrl:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80', label: 'Homepage' },
        { url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80', label: 'Editor Interface' },
        { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', label: 'Analytics Dashboard' },
      ],
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/yourusername/ai-content-generator',
      category: 'AI Tool',
      isPublic: true,
    },
    {
      title: 'Smart Email Assistant',
      slug: 'smart-email-assistant',
      description:
        'AI-powered email management system that drafts replies, categorizes messages, and schedules follow-ups automatically.',
      status: 'COMPLETED',
      techStack: ['React', 'Node.js', 'Claude AI', 'PostgreSQL', 'Redis'],
      why: 'Email overload is a real problem for professionals. I created this assistant to help people manage their inbox more efficiently by automating repetitive tasks and providing smart suggestions for responses.',
      features: [
        'Automatic email categorization',
        'AI-generated reply suggestions',
        'Smart scheduling and reminders',
        'Priority inbox sorting',
        'Email templates library',
        'Analytics dashboard',
      ],
      imageUrl:
        'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&q=80',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&q=80', label: 'Dashboard' },
        { url: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80', label: 'Email Composer' },
        { url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80', label: 'Settings Page' },
      ],
      demoUrl: 'https://demo.example.com',
      category: 'Productivity',
      isPublic: true,
    },
    {
      title: 'Visual Slide Creator',
      slug: 'visual-slide-creator',
      description:
        'Create stunning presentation slides from simple text prompts using AI-powered design and layout generation.',
      status: 'IN_PROGRESS',
      techStack: [
        'Next.js',
        'TypeScript',
        'OpenAI',
        'Fabric.js',
        'TailwindCSS',
      ],
      why: 'Designing beautiful presentations takes hours of work. I wanted to democratize good design by letting anyone create professional-looking slides just by describing what they want.',
      features: [
        'Text-to-slide generation',
        'Smart layout algorithms',
        'Custom theme creation',
        'Real-time collaboration',
        'Export to PowerPoint/PDF',
        'Stock image integration',
        'Animation presets',
      ],
      imageUrl:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', label: 'Editor View' },
        { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', label: 'Template Gallery' },
        { url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80', label: 'Presentation Mode' },
      ],
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/yourusername/slide-creator',
      category: 'Design Tool',
      isPublic: true,
    },
    {
      title: 'AI Code Reviewer',
      slug: 'ai-code-reviewer',
      description:
        'Automated code review tool that provides intelligent feedback, catches bugs, and suggests improvements using machine learning.',
      status: 'COMPLETED',
      techStack: ['Python', 'FastAPI', 'OpenAI Codex', 'Docker', 'GitHub API'],
      why: 'Code reviews are essential but time-consuming. I built this to provide instant, consistent feedback to developers, helping them learn best practices and catch issues before they reach production.',
      features: [
        'Multi-language support',
        'Security vulnerability detection',
        'Performance optimization suggestions',
        'Code style consistency checks',
        'GitHub integration',
        'Custom rule configuration',
        'Detailed reports and metrics',
      ],
      imageUrl:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', label: 'Code Analysis' },
        { url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80', label: 'Report Dashboard' },
        { url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80', label: 'GitHub Integration' },
      ],
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/yourusername/ai-code-reviewer',
      category: 'Developer Tool',
      isPublic: true,
    },
    {
      title: 'Voice Note Organizer',
      slug: 'voice-note-organizer',
      description:
        'Transform voice memos into organized, searchable notes with AI-powered transcription, summarization, and categorization.',
      status: 'PLANNING',
      techStack: ['Next.js', 'Whisper AI', 'GPT-4', 'Supabase', 'React'],
      why: 'I often record voice memos but struggle to organize and find them later. This tool automatically transcribes, summarizes, and categorizes voice notes, making them easily searchable and actionable.',
      features: [
        'High-accuracy voice transcription',
        'Automatic summarization',
        'Smart categorization and tagging',
        'Action item extraction',
        'Calendar integration',
        'Multi-language support',
        'Full-text search',
      ],
      imageUrl:
        'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80', label: 'Recording Interface' },
        { url: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&q=80', label: 'Notes Library' },
      ],
      category: 'Productivity',
      isPublic: true,
    },
  ]

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    })
    console.log(`✅ Created project: ${project.title}`)
  }

  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
