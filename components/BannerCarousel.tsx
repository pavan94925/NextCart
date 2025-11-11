
"use client"
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const banners = [
    {
      id: 1,
      title: 'Flight Bookings',
      subtitle: 'Up to 35% Off',
      code: 'CODE: FLYMH',
      bgGradient: 'from-orange-600 to-blue-800',
      image: '✈️',
      partner: 'Malaysia Airlines',
    },
    {
      id: 2,
      title: 'Electronics Sale',
      subtitle: 'Up to 50% Off',
      code: 'CODE: TECH50',
      bgGradient: 'from-orange-600 to-pink-600',
      image: '📱',
      partner: 'Samsung & Apple',
    },
    {
      id: 3,
      title: 'Fashion Festival',
      subtitle: 'Flat 40% Off',
      code: 'CODE: STYLE40',
      bgGradient: 'from-orange-500 to-red-600',
      image: '👗',
      partner: 'Top Brands',
    },
    {
      id: 4,
      title: 'Home Appliances',
      subtitle: 'Up to 45% Off',
      code: 'CODE: HOME45',
      bgGradient: 'from-orange-600 to-teal-600',
      image: '🏠',
      partner: 'Best Deals',
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[250px] overflow-hidden rounded-xl shadow-2xl">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`min-w-full h-full bg-gradient-to-r ${banner.bgGradient} flex items-center justify-between px-16`}
          >
            {/* Left Content */}
            <div className="text-white max-w-xl">
              <div className="mb-4">
                <p className="text-xl font-medium mb-2">{banner.partner}</p>
                <h1 className="text-6xl font-bold mb-4">{banner.title}</h1>
                <h2 className="text-5xl font-bold mb-6">{banner.subtitle}</h2>
              </div>

              <div className="inline-block bg-white text-gray-800 px-8 py-3 rounded-full text-2xl font-bold shadow-lg">
                {banner.code}
              </div>
            </div>

            {/* Right Image/Icon */}
            <div className="text-[200px] opacity-20">{banner.image}</div>
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
