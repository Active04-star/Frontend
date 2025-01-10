import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import Image from 'next/image';

interface StoredImage {
  id: string;
  dataUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

interface ImageCarouselProps {
  images: string[];
  onImageUpload: (file: File) => void;
}

export default function ImageCarousel({ images, onImageUpload }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localImages, setLocalImages] = useState<StoredImage[]>([]);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('pendingImages') || '[]');
    setLocalImages(storedImages);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const storedImages = JSON.parse(localStorage.getItem('pendingImages') || '[]');
      if (images.length + storedImages.length >= 3) {
        alert('Máximo 3 imágenes permitidas');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage: StoredImage = {
          id: crypto.randomUUID(),
          dataUrl: reader.result as string,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        };

        const updatedImages = [...storedImages, newImage];
        localStorage.setItem('pendingImages', JSON.stringify(updatedImages));
        setLocalImages(updatedImages);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const allImages = [...images, ...localImages.map((img) => img.dataUrl)];

  return (
    <div className="relative w-full h-64">
      {allImages.length > 0 ? (
        <>
          <Image
            src={allImages[currentIndex]}
            alt={`Sport center image ${currentIndex + 1}`}
            fill
            className="object-cover rounded-t-lg"
            priority
          />

          {localImages.length + images.length < 3 && (
            <label className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white rounded-full cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              <span className="text-sm">Agregar Imagen</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          )}

          {allImages.length > 1 && (
            <>
              <button
                onClick={() => setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {allImages.map((_, idx) => (
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
        </>
      ) : (
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
      )}

      {allImages.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {allImages.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </>
  ) : (
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
  )}
</div>
  );
}
