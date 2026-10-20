'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const navItems = {
  '/': {
    name: 'home',
  },
  '/research': {
    name: 'research',
    featured: true, // gets the accent colour + pulsing dot so it's easy to spot
  },
  '/projects': {
    name: 'projects',
  },
}

export function Navbar() {
  const pathname = usePathname()

  // Dim the nav while scrolling down, bring it back as soon as you scroll up
  const [dimmed, setDimmed] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - lastY.current
        if (y < 80) {
          setDimmed(false) // always fully visible near the top of the page
        } else if (delta > 6) {
          setDimmed(true) // scrolling down
        } else if (delta < -6) {
          setDimmed(false) // scrolling up
        }
        if (Math.abs(delta) > 6) lastY.current = y // ignore tiny jitters
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // reset when changing pages
  useEffect(() => {
    setDimmed(false)
  }, [pathname])

  return (
    <header className={`site-nav${dimmed ? ' is-dimmed' : ''}`}>
      <nav className="site-nav-inner" aria-label="Main">
        {Object.entries(navItems).map(([path, item]) => {
          const isActive = pathname === path
          const featured = 'featured' in item && item.featured
          return (
            <Link
              key={path}
              href={path}
              aria-current={isActive ? 'page' : undefined}
              className={[
                'site-nav-tab',
                isActive ? 'is-active' : '',
                featured ? 'is-featured' : '',
              ].join(' ')}
            >
              {featured && !isActive && <span className="nav-dot" aria-hidden="true" />}
              {item.name}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
