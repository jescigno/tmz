import { useRef, useEffect } from 'react'
import './FeaturedCarousel.css'

const featuredItems = [
  {
    id: 1,
    image: '/featured-card-1.png',
    title: 'Superior Grocers #126 (06) June 2025',
    tag: 'EVENT',
    fillContainer: true,
  },
  {
    id: 2,
    image: '/featured-card-2.png',
    title: 'DIRECTV Satellite + Device Sales Guide LDC',
    tag: 'CREATIVE',
    fillContainer: true,
  },
  {
    id: 3,
    image: '/featured-card-3.png',
    title: 'DIRECTV Satellite + Device Sales Guide LDC',
    tag: 'CREATIVE',
    imageMode: 'fullHeight',
    imageBg: '#D5D9DF',
  },
  {
    id: 4,
    image: '/featured-card-4.png',
    title: 'Paid Social Media Campaign',
    tag: 'MEDIA',
    fillContainer: true,
  },
  {
    id: 5,
    image: '/featured-card-5.png',
    title: 'Summer Promo 2025',
    tag: 'CREATIVE',
    fillContainer: true,
  },
]

const carouselItems = [...featuredItems, ...featuredItems, ...featuredItems]

export default function FeaturedCarousel() {
  const scrollRef = useRef(null)
  const cardRef = useRef(null)
  const isJumpingRef = useRef(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const setInitialPosition = () => {
      const originalScrollBehavior = el.style.scrollBehavior
      el.style.scrollBehavior = 'auto'
      el.scrollLeft = el.scrollWidth / 3
      el.style.scrollBehavior = originalScrollBehavior
    }

    setInitialPosition()

    const handleResize = () => {
      setInitialPosition()
    }
    window.addEventListener('resize', handleResize)

    const preventWheelScroll = (e) => {
      e.preventDefault()
    }

    el.addEventListener('wheel', preventWheelScroll, { passive: false })

    const handleScroll = () => {
      if (isJumpingRef.current) return

      const { scrollLeft, scrollWidth, clientWidth } = el
      const setWidth = scrollWidth / 3

      if (scrollLeft < setWidth - clientWidth) {
        isJumpingRef.current = true
        el.scrollLeft += setWidth
        requestAnimationFrame(() => { isJumpingRef.current = false })
      } else if (scrollLeft > setWidth * 2) {
        isJumpingRef.current = true
        el.scrollLeft -= setWidth
        requestAnimationFrame(() => { isJumpingRef.current = false })
      }
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
      el.removeEventListener('scroll', handleScroll)
      el.removeEventListener('wheel', preventWheelScroll)
    }
  }, [])

  const scroll = (direction) => {
    const viewport = scrollRef.current
    const carousel = viewport?.firstElementChild
    const card = cardRef.current || carousel?.firstElementChild
    if (!viewport || !card) return
    const cardWidth = card.offsetWidth
    const gap = parseFloat(getComputedStyle(carousel).gap) || 24
    const scrollAmount = cardWidth + gap
    viewport.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
  }

  return (
    <section className="featured">
      <h2 className="featured-title">Explore What's Featured – Shape It as You Go</h2>
      <div ref={scrollRef} className="carousel-viewport">
        <div className="carousel">
        {carouselItems.map((item, index) => (
          <a key={`${Math.floor(index / featuredItems.length)}-${item.id}`} href="#" className="featured-card" ref={index === 0 ? cardRef : undefined}>
            <div className="featured-card-image">
              <div className="featured-card-image-clip">
                <div
                  className={`featured-card-image-inner${item.fillContainer ? ' featured-card-image-cover' : ''}${item.imageMode === 'fullHeight' ? ' featured-card-image-full-height' : ''}`}
                  style={{
                    backgroundImage: `url(${item.image})`,
                    ...(item.imageBg && { backgroundColor: item.imageBg }),
                  }}
                />
              </div>
              <img src={item.image} alt={item.title} className="sr-only" />
            </div>
            <div className="featured-card-content">
              <div className="featured-card-title-wrapper">
                <h3 className="featured-card-title">{item.title}</h3>
              </div>
              <span className="featured-card-tag">{item.tag}</span>
            </div>
          </a>
        ))}
        </div>
      </div>
      <div className="carousel-nav">
        <button className="carousel-btn" onClick={() => scroll(-1)} aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="carousel-btn" onClick={() => scroll(1)} aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  )
}
