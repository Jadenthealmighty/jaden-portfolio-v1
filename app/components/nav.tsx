'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

  return (
    <header className="site-nav">
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
