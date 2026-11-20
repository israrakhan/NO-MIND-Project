import { Link } from "react-router";
import { motion } from "motion/react";
import { Home, Compass, BookOpen, MessageSquare, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F6E4D5]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#EEDCC8]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        {/* Animated Lotus / 404 Visual Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative inline-block"
        >
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-[#EEDCC8] to-[#FFF8F3] border border-[#D8B49F]/40 shadow-xl shadow-[#BC6034]/10 flex items-center justify-center mx-auto ring-8 ring-white/80">
            <Compass className="w-14 h-14 md:w-16 md:h-16 text-[#BC6034] animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <span className="absolute -bottom-2 right-2 px-3 py-1 bg-[#4A362D] text-white text-xs font-bold rounded-full shadow-md uppercase tracking-wider">
            404
          </span>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF8F3] text-[#BC6034] text-xs font-bold uppercase tracking-wider border border-[#EEDCC8] shadow-sm">
            Lost in Mindfulness
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[#4A362D] tracking-tight leading-tight">
            Peace Begins Within...<br />
            <span className="text-[#BC6034]">But This Page Doesn't Exist.</span>
          </h1>

          <p className="text-base text-gray-600 max-w-lg mx-auto leading-relaxed">
            The path you followed might have been moved, renamed, or never existed. Take a deep breath and let us help you find your way back.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 bg-[#BC6034] hover:bg-[#A5522B] text-white px-7 py-3.5 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-[#BC6034]/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            <Home className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/workshops"
            className="inline-flex items-center gap-2 bg-white border border-[#D8B49F] text-[#4A362D] hover:bg-[#FFF8F3] hover:text-[#BC6034] px-7 py-3.5 rounded-2xl text-sm font-bold transition-all shadow-sm hover:shadow hover:-translate-y-0.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Workshops</span>
          </Link>
        </motion.div>

        {/* Quick Navigation Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="pt-8 border-t border-[#EEDCC8]/60 max-w-md mx-auto"
        >
          <p className="text-xs text-gray-400 font-medium mb-3 uppercase tracking-wider">Useful Destinations</p>
          <div className="flex items-center justify-center gap-6 text-xs font-semibold text-[#BC6034]">
            <Link to="/meditation" className="hover:underline flex items-center gap-1">
              Meditation
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/library" className="hover:underline flex items-center gap-1">
              Library
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/blog" className="hover:underline flex items-center gap-1">
              Blogs
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/connect" className="hover:underline flex items-center gap-1">
              Connect
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
