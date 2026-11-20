import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { getMediaUrl } from '../../utils/cloudinary.js'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation();
  const path = location.pathname;

  const isActive = (targetPath) => path === targetPath;

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-md border-b border-outline-variant/10 transition-all duration-300">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">

        {/* Left Side: Mobile Menu Toggle (only on mobile) */}
        <div className="md:hidden flex-1 flex justify-start">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-primary hover:text-secondary transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[28px] select-none">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Center: Logo (centered on mobile, left-aligned on desktop) */}
        <div className="flex-shrink-0 flex justify-center md:justify-start md:mr-10">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display-lg-mobile text-display-lg-mobile md:text-headline-md text-primary tracking-tight cursor-pointer font-bold select-none flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <img className="h-16 md:h-20 w-auto flex-shrink-0 object-contain" src={getMediaUrl('logo.png')} alt="NoMind Foundation Logo" />
          </Link>
        </div>

        {/* Desktop Nav Links (hidden on mobile) */}
        <div className="hidden md:flex gap-15 items-center flex-1 justify-center mr-12">
          <Link
            to="/meditation"
            className={`${isActive('/meditation')
              ? 'text-secondary font-bold border-b-2 border-secondary pb-1'
              : 'text-on-surface-variant hover:text-secondary pb-1 border-b-2 border-transparent'
              } font-body-md text-body-md transition-all duration-300 cursor-pointer focus:outline-none`}
          >
            Meditation
          </Link>
          <Link
            to="/workshops"
            className={`${isActive('/workshops')
              ? 'text-secondary font-bold border-b-2 border-secondary pb-1'
              : 'text-on-surface-variant hover:text-secondary pb-1 border-b-2 border-transparent'
              } font-body-md text-body-md transition-all duration-300 cursor-pointer focus:outline-none`}
          >
            Workshops
          </Link>
          <Link
            to="/library"
            className={`${isActive('/library')
              ? 'text-secondary font-bold border-b-2 border-secondary pb-1'
              : 'text-on-surface-variant hover:text-secondary pb-1 border-b-2 border-transparent'
              } font-body-md text-body-md transition-all duration-300 cursor-pointer focus:outline-none`}
          >
            Library
          </Link>
          <Link
            to="/blog"
            className={`${isActive('/blog')
              ? 'text-secondary font-bold border-b-2 border-secondary pb-1'
              : 'text-on-surface-variant hover:text-secondary pb-1 border-b-2 border-transparent'
              } font-body-md text-body-md transition-all duration-300 cursor-pointer focus:outline-none`}
          >
            Blog
          </Link>
          <Link
            to="/about"
            className={`${isActive('/about')
              ? 'text-secondary font-bold border-b-2 border-secondary pb-1'
              : 'text-on-surface-variant hover:text-secondary pb-1 border-b-2 border-transparent'
              } font-body-md text-body-md transition-all duration-300 cursor-pointer focus:outline-none`}
          >
            About
          </Link>
          <Link
            to="/connect"
            className={`${isActive('/connect')
              ? 'text-secondary font-bold border-b-2 border-secondary pb-1'
              : 'text-on-surface-variant hover:text-secondary pb-1 border-b-2 border-transparent'
              } font-body-md text-body-md transition-all duration-300 cursor-pointer focus:outline-none`}
          >
            Connect
          </Link>
        </div>

        {/* Right Side: Spacer to balance flex layout on mobile */}
        <div className="md:hidden flex-1 flex justify-end">
          <div className="w-11 h-11 pointer-events-none" />
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-[73px] bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 shadow-lg transition-all duration-300 ease-in-out transform ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
      >
        <div className="px-6 py-6 flex flex-col gap-6">
          {/* Mobile Search - Only on Meditation Tab */}


          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <Link
              to="/meditation"
              className={`text-left text-lg py-1 border-b border-outline-variant/10 font-medium ${isActive('/meditation') ? 'text-secondary font-bold' : 'text-on-surface-variant'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Meditation
            </Link>
            <Link
              to="/workshops"
              className={`text-left text-lg py-1 border-b border-outline-variant/10 font-medium ${isActive('/workshops') ? 'text-secondary font-bold' : 'text-on-surface-variant'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Workshops
            </Link>
            <Link
              to="/library"
              className={`text-left text-lg py-1 border-b border-outline-variant/10 font-medium ${isActive('/library') ? 'text-secondary font-bold' : 'text-on-surface-variant'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Library
            </Link>
            <Link
              to="/blog"
              className={`text-left text-lg py-1 border-b border-outline-variant/10 font-medium ${isActive('/blog') ? 'text-secondary font-bold' : 'text-on-surface-variant'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className={`text-left text-lg py-1 border-b border-outline-variant/10 font-medium ${isActive('/about') ? 'text-secondary font-bold' : 'text-on-surface-variant'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/connect"
              className={`text-left text-lg py-1 border-b border-outline-variant/10 font-medium ${isActive('/connect') ? 'text-secondary font-bold' : 'text-on-surface-variant'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Connect
            </Link>
          </div>

          {/* Join Community button removed */}
        </div>
      </div>
    </nav>
  )
}
