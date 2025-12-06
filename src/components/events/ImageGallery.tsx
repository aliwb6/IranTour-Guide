// src/components/events/ImageGallery.tsx
'use client'

import { useState } from 'react'

interface ImageGalleryProps {
  images: string[]
  title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className="aspect-square overflow-hidden rounded-xl border-4 border-gold hover:border-persian-red transition cursor-pointer group"
          >
            <img
              src={image}
              alt={`${title} - تصویر ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
            />
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white font-black text-2xl transition"
            aria-label="بستن"
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt={title}
            className="max-w-full max-h-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
