import { Link } from 'react-router'
import { Facebook, Instagram, Mail, Youtube } from 'lucide-react'
import { getMediaUrl } from '../../utils/cloudinary.js'

export default function Footer() {
  return (
    <footer className="bg-surface-container border-t border-outline-variant/10 w-full mt-auto">

      {/* Upper Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-margin-mobile md:px-margin-desktop pt-10 pb-4 w-full max-w-container-max mx-auto items-stretch">

        {/* Column 1: Logo & Info */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <img className="h-28 md:h-36 w-auto object-contain" src={getMediaUrl('logo.png')} alt="NoMind Foundation Logo" />
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Empowering humanity through the art of stillness and the wisdom of conscious presence.
          </p>
        </div>

        {/* Vertical Leafy Divider 1 */}
        <div className="hidden md:flex md:col-span-1 justify-center items-start pt-1 select-none pointer-events-none">
          <svg width="24" height="180" viewBox="0 0 24 180" fill="none" className="text-secondary stroke-current fill-current">
            <line x1="12" y1="0" x2="12" y2="180" strokeWidth="1" className="stroke-outline-variant/30" />
            <path d="M12 45 C16 41, 17 37, 16 32 C13 33, 12 39, 12 45 Z" className="fill-secondary/35" />
            <path d="M12 45 C8 41, 7 37, 8 32 C11 33, 12 39, 12 45 Z" className="fill-secondary/35" />
            <path d="M12 90 C16 86, 17 82, 16 77 C13 78, 12 84, 12 90 Z" className="fill-secondary/35" />
            <path d="M12 90 C8 86, 7 82, 8 77 C11 78, 12 84, 12 90 Z" className="fill-secondary/35" />
            <path d="M12 135 C16 131, 17 127, 16 122 C13 123, 12 129, 12 135 Z" className="fill-secondary/35" />
            <path d="M12 135 C8 131, 7 127, 8 122 C11 123, 12 129, 12 135 Z" className="fill-secondary/35" />
          </svg>
        </div>

        {/* Column 2: Explore Links */}
        <div className="col-span-1 md:col-span-2">
          <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-primary mb-6 font-bold">Explore</h4>
          <ul className="space-y-4 flex flex-col items-start">
            <li>
              <Link
                to="/meditation"
                className="text-on-surface-variant hover:text-secondary transition-colors font-body-md text-sm md:text-base text-left cursor-pointer focus:outline-none"
              >
                Meditation
              </Link>
            </li>
            <li>
              <Link
                to="/workshops"
                className="text-on-surface-variant hover:text-secondary transition-colors font-body-md text-sm md:text-base text-left cursor-pointer focus:outline-none"
              >
                Workshops
              </Link>
            </li>
            <li>
              <Link
                to="/library"
                className="text-on-surface-variant hover:text-secondary transition-colors font-body-md text-sm md:text-base text-left cursor-pointer focus:outline-none"
              >
                Library
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="text-on-surface-variant hover:text-secondary transition-colors font-body-md text-sm md:text-base text-left cursor-pointer focus:outline-none"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-on-surface-variant hover:text-secondary transition-colors font-body-md text-sm md:text-base text-left cursor-pointer focus:outline-none"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Vertical Leafy Divider 2 */}
        <div className="hidden md:flex md:col-span-1 justify-center items-start pt-1 select-none pointer-events-none">
          <svg width="24" height="180" viewBox="0 0 24 180" fill="none" className="text-secondary stroke-current fill-current">
            <line x1="12" y1="0" x2="12" y2="180" strokeWidth="1" className="stroke-outline-variant/30" />
            <path d="M12 45 C16 41, 17 37, 16 32 C13 33, 12 39, 12 45 Z" className="fill-secondary/35" />
            <path d="M12 45 C8 41, 7 37, 8 32 C11 33, 12 39, 12 45 Z" className="fill-secondary/35" />
            <path d="M12 90 C16 86, 17 82, 16 77 C13 78, 12 84, 12 90 Z" className="fill-secondary/35" />
            <path d="M12 90 C8 86, 7 82, 8 77 C11 78, 12 84, 12 90 Z" className="fill-secondary/35" />
            <path d="M12 135 C16 131, 17 127, 16 122 C13 123, 12 129, 12 135 Z" className="fill-secondary/35" />
            <path d="M12 135 C8 131, 7 127, 8 122 C11 123, 12 129, 12 135 Z" className="fill-secondary/35" />
          </svg>
        </div>

        {/* Column 3: Resources Links */}
        <div className="col-span-1 md:col-span-2">
          <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-primary mb-6 font-bold">Resources</h4>
          <ul className="space-y-4 flex flex-col items-start">
            <li>
              <Link
                className="text-on-surface-variant hover:text-secondary transition-colors font-body-md text-sm md:text-base"
                to="/connect"
              >
                Connect
              </Link>
            </li>
            <li>
              <Link
                to="/library"
                className="text-on-surface-variant hover:text-secondary transition-colors font-body-md text-sm md:text-base text-left cursor-pointer focus:outline-none"
              >
                Publications & Books
              </Link>
            </li>
          </ul>
        </div>

        {/* Vertical Leafy Divider 3 */}
        <div className="hidden md:flex md:col-span-1 justify-center items-start pt-1 select-none pointer-events-none">
          <svg width="24" height="180" viewBox="0 0 24 180" fill="none" className="text-secondary stroke-current fill-current">
            <line x1="12" y1="0" x2="12" y2="180" strokeWidth="1" className="stroke-outline-variant/30" />
            <path d="M12 45 C16 41, 17 37, 16 32 C13 33, 12 39, 12 45 Z" className="fill-secondary/35" />
            <path d="M12 45 C8 41, 7 37, 8 32 C11 33, 12 39, 12 45 Z" className="fill-secondary/35" />
            <path d="M12 90 C16 86, 17 82, 16 77 C13 78, 12 84, 12 90 Z" className="fill-secondary/35" />
            <path d="M12 90 C8 86, 7 82, 8 77 C11 78, 12 84, 12 90 Z" className="fill-secondary/35" />
            <path d="M12 135 C16 131, 17 127, 16 122 C13 123, 12 129, 12 135 Z" className="fill-secondary/35" />
            <path d="M12 135 C8 131, 7 127, 8 122 C11 123, 12 129, 12 135 Z" className="fill-secondary/35" />
          </svg>
        </div>

        {/* Column 4: Find us on Social Media */}
        <div className="col-span-1 md:col-span-3">
          <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-primary mb-6 font-bold">
            Find us on Social Media
          </h4>
          <div className="flex gap-3 flex-wrap">
            <a
              className="w-10 h-10 rounded-full bg-surface-tan flex items-center justify-center text-primary hover:bg-[#1877F2] hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm border border-outline-variant/10 cursor-pointer"
              href="https://www.facebook.com/shivaji.kuche/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              className="w-10 h-10 rounded-full bg-surface-tan flex items-center justify-center text-primary hover:bg-[#FF0000] hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm border border-outline-variant/10 cursor-pointer"
              href="https://www.youtube.com/@shivajikuche1798/featured"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
            <a
              className="w-10 h-10 rounded-full bg-surface-tan flex items-center justify-center text-primary hover:bg-gradient-to-tr hover:from-[#FD1D1D] hover:via-[#E1306C] hover:to-[#C13584] hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm border border-outline-variant/10 cursor-pointer"
              href="https://www.instagram.com/shivajikuche?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              className="w-10 h-10 rounded-full bg-surface-tan flex items-center justify-center text-primary hover:bg-[#EA4335] hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm border border-outline-variant/10 cursor-pointer"
              href="mailto:contact@nomind.org"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

      </div>

      {/* Lower Copyright Area */}
      <div className="px-margin-mobile md:px-margin-desktop py-5 border-t border-outline-variant/10 max-w-container-max mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-on-surface-variant gap-4">
        <span>© 2026 No Mind Foundation. All rights reserved.</span>
        <div className="flex gap-6 pr-14 sm:pr-16">
          <Link to="/accessibility" className="hover:text-secondary transition-colors">Accessibility</Link>
          <Link to="/cookie-policy" className="hover:text-secondary transition-colors">Cookie Policy</Link>
        </div>
      </div>

    </footer>
  )
}
