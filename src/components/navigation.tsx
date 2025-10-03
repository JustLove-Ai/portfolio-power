'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Portfolio' },
    { href: '/admin', label: 'Admin' },
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/">
            <motion.div
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Portfolio Power
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {links.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(link.href + '/')

              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-[#D30013] text-white'
                        : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
