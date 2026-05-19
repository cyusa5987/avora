'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Toggle theme"
      className="fixed bottom-6 right-6 z-50 flex size-9 items-center justify-center rounded-full border transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.85)',
        borderColor:     theme === 'dark' ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.10)',
        backdropFilter:  'blur(12px)',
        boxShadow:       theme === 'dark'
          ? '0 2px 12px rgba(0,0,0,0.4)'
          : '0 2px 12px rgba(0,0,0,0.10)',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{    opacity: 0, rotate:  45 }}
            transition={{ duration: 0.18 }}
            className="block"
          >
            <Sun className="size-4 text-white/70" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{    opacity: 0, rotate: -45 }}
            transition={{ duration: 0.18 }}
            className="block"
          >
            <Moon className="size-4 text-slate-600" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
