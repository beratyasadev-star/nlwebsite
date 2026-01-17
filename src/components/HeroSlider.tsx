'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface SliderItem {
  title: string
  excerpt: string
  slug: string
  type: 'guide' | 'news'
  featuredImage?: {
    url: string
    alt?: string
  }
}

interface HeroSliderProps {
  items: SliderItem[]
  locale: string
}

export default function HeroSlider({ items, locale }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlayActive || isPaused) return

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 4000) // 4 saniye

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [items.length, isAutoPlayActive, isPaused, currentIndex])

  // Manuel kontrol - auto-play'i resetle
  const handleManualControl = (callback: () => void) => {
    setIsTransitioning(true)
    setTimeout(() => {
      callback()
      setIsTransitioning(false)
    }, 150)

    // Auto-play'i durdur ve 15 saniye sonra yeniden başlat
    setIsAutoPlayActive(false)
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }

    setTimeout(() => {
      setIsAutoPlayActive(true)
    }, 15000) // 15 saniye kullanıcının incelemesi için
  }

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
      handleManualControl(goToNext)
    }

    if (touchStartX.current - touchEndX.current < -75) {
      // Swiped right - go to previous
      handleManualControl(goToPrevious)
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
      className="relative h-[320px] md:h-[500px] w-full overflow-hidden rounded-xl bg-gray-900 group"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Link
        href={`/${locale}/${currentItem.type === 'guide' ? 'rehber' : 'haberler'}/${currentItem.slug}`}
        className={`absolute inset-0 cursor-pointer transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        <div className="absolute bottom-6 md:bottom-10 left-0 right-0 px-6 md:px-12 text-white">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4 drop-shadow-lg line-clamp-2">
              {currentItem.title}
            </h2>
            <p className="text-sm md:text-xl text-gray-200 line-clamp-2 md:line-clamp-3">
              {currentItem.excerpt}
            </p>
          </div>
        </div>
      </Link>
      
      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleManualControl(goToPrevious)
        }}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-200 md:opacity-0 md:group-hover:opacity-100 z-20"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleManualControl(goToNext)
        }}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-200 md:opacity-0 md:group-hover:opacity-100 z-20"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              handleManualControl(() => goToSlide(index))
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
