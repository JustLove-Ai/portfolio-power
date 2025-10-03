'use client'

import { useEffect, useState } from 'react'

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/50" />
          <span className="text-sm uppercase tracking-[0.3em] text-gray-400">
            Portfolio
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/50" />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
          AI Applications
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12">
          Showcasing innovative AI-powered web applications
          <br />
          built with modern technologies
        </p>

        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold mb-1">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                10+
              </span>
            </div>
            <div className="text-sm text-gray-500 uppercase tracking-wider">
              Projects
            </div>
          </div>

          <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          <div className="text-center">
            <div className="text-4xl font-bold mb-1">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                AI
              </span>
            </div>
            <div className="text-sm text-gray-500 uppercase tracking-wider">
              Powered
            </div>
          </div>

          <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          <div className="text-center">
            <div className="text-4xl font-bold mb-1">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-600">
                100%
              </span>
            </div>
            <div className="text-sm text-gray-500 uppercase tracking-wider">
              Custom
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
