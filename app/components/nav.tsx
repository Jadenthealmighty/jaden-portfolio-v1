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

  // Dim the nav while scrolling down, bring it back as soon as you scroll up.
  // Handled directly in the scroll event (no requestAnimationFrame): browsers pause
  // rAF in background tabs, which could leave the handler stuck after a tab switch.
  const [dimmed, setDimmed] = useState(false)
  const dimmedRef = useRef(false)
  const lastY = useRef(0)

  useEffect(() => {
    const set = (value: boolean) => {
      if (dimmedRef.current !== value) {
        dimmedRef.current = value
        setDimmed(value) // only re-render when the state actually flips
      }
    }

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY.current
      if (y < 80) {
        set(false) // always fully visible near the top of the page
        lastY.current = y
      } else if (Math.abs(delta) > 6) {
        set(delta > 0) // down = dim, up = show
        lastY.current = y // ignore tiny jitters
      }
    }

    // re-sync whenever the tab becomes visible again
    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        lastY.current = window.scrollY
        if (window.scrollY < 80) set(false)
      }
    }

    lastY.current = window.scrollY
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  // reset when changing pages
  useEffect(() => {
    dimmedRef.current = false
    setDimmed(false)
    lastY.current = window.scrollY
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
