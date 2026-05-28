'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'

type Theme = 'dark'

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Lock to dark mode permanently
  useEffect(() => {
    document.documentElement.classList.add('dark')
    try { localStorage.setItem('avora-theme', 'dark') } catch {}
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: 'dark', toggle: () => {} }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
