'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface SliderItem {
  title: string
  excerpt: string
  slug: string
  featuredImage?: {
    url: string
    alt?: string
  }
}

interface HeroSliderProps {
  items: SliderItem[]
}

export default function HeroSlider({ items }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [items.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      // Swiped left - go to next
      goToNext()
    }

    if (touchStartX.current - touchEndX.current < -75) {
      // Swiped right - go to previous
      goToPrevious()
    }
  }
  
  if (!items.length) return null
  
  // URL düzeltme fonksiyonu
  const fixImageUrl = (url?: string) => {
    if (!url) return undefined
    return url.replace('/medya/', '/media/').replace('http://localhost:3000', '').replace('http://localhost:3001', '')
  }
  
  const currentItem = items[currentIndex]
  
  return (
    <div
      className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-xl bg-gray-900"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Link href={`/haberler/${currentItem.slug}`} className="absolute inset-0 cursor-pointer">
        {currentItem.featuredImage?.url && (
          <Image
            src={fixImageUrl(currentItem.featuredImage.url) || '/placeholder.jpg'}
            alt={currentItem.featuredImage.alt || currentItem.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            key={currentItem.slug}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        <div className="absolute bottom-8 md:bottom-12 left-0 right-0 px-8 md:px-12 text-white">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              {currentItem.title}
            </h2>
            <p className="text-lg md:text-xl mb-6 text-gray-200 line-clamp-2">
              {currentItem.excerpt}
            </p>
            <span className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold px-8 py-3 rounded-lg transition">
              Devamını Oku
            </span>
          </div>
        </div>
      </Link>
      
      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          goToPrevious()
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition z-20"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          goToNext()
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition z-20"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              goToSlide(index)
            }}
            className={`w-3 h-3 rounded-full transition ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
