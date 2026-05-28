'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

type TimelineContentProps = {
  children: React.ReactNode
  as?: React.ElementType
  animationNum?: number
  timelineRef?: React.RefObject<HTMLElement | null>
  customVariants?: Record<string, unknown>
  className?: string
}

export function TimelineContent({
  children,
  as: _as = 'div',
  className,
  customVariants,
  animationNum = 0,
}: TimelineContentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  const defaultVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  }

  const variants = (customVariants as typeof defaultVariants) || defaultVariants

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={animationNum}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
