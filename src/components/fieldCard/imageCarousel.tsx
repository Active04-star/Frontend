'use client'; // Asegúrate de que esto esté incluido

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import Image from 'next/image'; // Importa el componente de Next.js

interface ImageCarouselProps {
  images: string[];
  onImageUpload: (file: File) => void;
}

export default function ImageCarousel({ images, onImageUpload }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  if (images.length === 0) {
    return (
      <div className="relative w-full h-64 bg-gray-100 rounded-t-lg">
        <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Upload Images</span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64">
      <Image
        src={images[currentIndex]}
        alt={`Sport center image ${currentIndex + 1}`}
        fill // Para llenar el contenedor
        sizes="100vw"
        className="object-cover rounded-t-lg"
      />
      
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
