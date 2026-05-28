'use client'

import React from 'react'

interface StarButtonProps {
  children?: React.ReactNode
  onClick?: () => void
  className?: string
}

const ACCENT = '#EBBCE7'
const ACCENT_SHADOW = '#EBBCE78c'

const StarButton: React.FC<StarButtonProps> = ({
  children = 'Get started',
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        group relative px-[35px] py-[12px]
        text-[17px] font-medium
        text-[#181818]
        border-[3px]
        rounded-md
        transition-all duration-300 ease-in-out
        cursor-pointer
        active:scale-95
        ${className}
      `}
      style={{
        backgroundColor: ACCENT,
        borderColor: ACCENT,
        boxShadow: `0 0 0 ${ACCENT_SHADOW}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 25px ${ACCENT_SHADOW}`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 ${ACCENT_SHADOW}`
      }}
    >
      {children}

      {/* Star 1 */}
      <div
        className="absolute top-[20%] left-[20%] w-[25px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0.05,0.83,0.43,0.96)] group-hover:top-[-80%] group-hover:left-[-30%] group-hover:z-[2]"
        style={{ filter: 'drop-shadow(0 0 0 transparent)' }}
        onMouseEnter={(e) => (e.currentTarget.style.filter = `drop-shadow(0 0 10px ${ACCENT})`)}
      >
        <Star />
      </div>

      {/* Star 2 */}
      <div
        className="absolute top-[45%] left-[45%] w-[15px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] group-hover:top-[-25%] group-hover:left-[10%] group-hover:z-[2]"
        style={{ filter: 'drop-shadow(0 0 0 transparent)' }}
      >
        <Star />
      </div>

      {/* Star 3 */}
      <div
        className="absolute top-[40%] left-[40%] w-[5px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] group-hover:top-[55%] group-hover:left-[25%] group-hover:z-[2]"
      >
        <Star />
      </div>

      {/* Star 4 */}
      <div
        className="absolute top-[20%] left-[40%] w-[8px] z-[-5] transition-all duration-[800ms] ease-[cubic-bezier(0,0.4,0,1.01)] group-hover:top-[30%] group-hover:left-[80%] group-hover:z-[2]"
      >
        <Star />
      </div>

      {/* Star 5 */}
      <div
        className="absolute top-[25%] left-[45%] w-[15px] z-[-5] transition-all duration-[600ms] ease-[cubic-bezier(0,0.4,0,1.01)] group-hover:top-[25%] group-hover:left-[115%] group-hover:z-[2]"
      >
        <Star />
      </div>

      {/* Star 6 */}
      <div
        className="absolute top-[5%] left-[50%] w-[5px] z-[-5] transition-all duration-[800ms] ease-in-out group-hover:top-[5%] group-hover:left-[60%] group-hover:z-[2]"
      >
        <Star />
      </div>
    </button>
  )
}

const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 784.11 815.53"
    className="w-full h-auto"
    style={{ fill: ACCENT, filter: `drop-shadow(0 0 10px ${ACCENT})` }}
  >
    <path d="M392.05 0c-20.9,210.08-184.06,378.41-392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93-210.06 184.09-378.37 392.05-407.74-207.98-29.38-371.16-197.69-392.06-407.78z" />
  </svg>
)

export default StarButton
