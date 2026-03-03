import { useRef, useEffect } from 'react'
import './FeaturedCarousel.css'

const featuredItems = [
  {
    id: 1,
    image: '/featured-card-1.png',
    title: 'Superior Grocers #126 (06) June 2025',
    tag: 'EVENT',
    fillContainer: true,
    buttonText: 'BOOK EVENT',
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
    buttonText: 'CREATE MEDIA',
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
  const scrollTimeoutRef = useRef(null)

  useEffect(() => {
    const viewport = scrollRef.current
    if (!viewport) return

    const updateCardSize = () => {
      const carousel = viewport.firstElementChild
      if (!carousel) return
      const width = viewport.clientWidth
      const paddingX = parseFloat(getComputedStyle(carousel).paddingLeft) || 24
      const gap = parseFloat(getComputedStyle(carousel).gap) || 20
      const cardWidth = Math.max(0, Math.floor((width - 2 * paddingX - 3 * gap) / 4))
      viewport.style.setProperty('--card-width', `${cardWidth}px`)
    }

    const setInitialPosition = () => {
      const carousel = viewport.firstElementChild
      const card = cardRef.current || carousel?.firstElementChild
      if (!card || !carousel) return
      const cardWidth = card.offsetWidth
      const gap = parseFloat(getComputedStyle(carousel).gap) || 20
      const paddingX = parseFloat(getComputedStyle(carousel).paddingLeft) || 24
      const setWidth = 5 * cardWidth + 4 * gap
      viewport.style.scrollBehavior = 'auto'
      viewport.scrollLeft = paddingX + setWidth
      viewport.style.scrollBehavior = ''
    }

    const checkAndJump = () => {
      if (isJumpingRef.current) return
      const carousel = viewport.firstElementChild
      const card = cardRef.current || carousel?.firstElementChild
      if (!card || !carousel) return
      const { scrollLeft, clientWidth } = viewport
      const cardWidth = card.offsetWidth
      const gap = parseFloat(getComputedStyle(carousel).gap) || 20
      const paddingX = parseFloat(getComputedStyle(carousel).paddingLeft) || 24
      const setWidth = 5 * cardWidth + 4 * gap
      const middleSetStart = paddingX + setWidth - clientWidth
      const middleSetEnd = paddingX + 2 * setWidth - clientWidth
      if (scrollLeft < middleSetStart) {
        isJumpingRef.current = true
        viewport.style.scrollBehavior = 'auto'
        viewport.scrollLeft += setWidth
        viewport.style.scrollBehavior = ''
        requestAnimationFrame(() => { isJumpingRef.current = false })
      } else if (scrollLeft > middleSetEnd) {
        isJumpingRef.current = true
        viewport.style.scrollBehavior = 'auto'
        viewport.scrollLeft -= setWidth
        viewport.style.scrollBehavior = ''
        requestAnimationFrame(() => { isJumpingRef.current = false })
      }
    }

    updateCardSize()
    const resizeObserver = new ResizeObserver(() => {
      updateCardSize()
      requestAnimationFrame(setInitialPosition)
    })
    resizeObserver.observe(viewport)
    requestAnimationFrame(setInitialPosition)

    const handleScroll = () => {
      clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(checkAndJump, 150)
    }

    const preventWheel = (e) => e.preventDefault()
    viewport.addEventListener('scroll', handleScroll, { passive: true })
    viewport.addEventListener('wheel', preventWheel, { passive: false })

    return () => {
      clearTimeout(scrollTimeoutRef.current)
      resizeObserver.disconnect()
      viewport.removeEventListener('scroll', handleScroll)
      viewport.removeEventListener('wheel', preventWheel)
    }
  }, [])

  const scroll = (direction) => {
    const viewport = scrollRef.current
    const carousel = viewport?.firstElementChild
    const card = cardRef.current || carousel?.firstElementChild
    if (!viewport || !card) return
    const cardWidth = card.offsetWidth
    const gap = parseFloat(getComputedStyle(carousel).gap) || 20
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
              <div className="featured-card-image-overlay" />
              <span className="featured-card-personalize">{item.buttonText || 'PERSONALIZE'}</span>
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
