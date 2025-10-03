'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ProjectImage {
  url: string
  label?: string | null
}

interface ProjectGalleryProps {
  images: ProjectImage[]
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) return null

  return (
    <div className="space-y-4">
      {/* Main image display */}
      <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 relative group">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video"
          >
            <img
              src={images[selectedImage].url}
              alt={images[selectedImage].label || 'Project screenshot'}
              className="w-full h-full object-cover"
            />

            {/* Label overlay */}
            {images[selectedImage].label && (
              <motion.div
                className="absolute bottom-4 left-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Badge className="bg-black/80 text-white backdrop-blur-md border-white/20">
                  {images[selectedImage].label}
                </Badge>
              </motion.div>
            )}

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <motion.button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/80"
                  onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ←
                </motion.button>
                <motion.button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/80"
                  onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  →
                </motion.button>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </Card>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-white scale-105'
                  : 'border-zinc-700 opacity-60 hover:opacity-100 hover:border-zinc-500'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={image.url}
                alt={image.label || `Thumbnail ${index + 1}`}
                className="w-24 h-16 object-cover"
              />
              {image.label && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-1">
                  <span className="text-[8px] text-white font-medium truncate w-full">
                    {image.label}
                  </span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Indicator dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                selectedImage === index ? 'bg-white w-8' : 'bg-zinc-600 hover:bg-zinc-500'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
