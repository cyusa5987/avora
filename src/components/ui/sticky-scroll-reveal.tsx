"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const accentGradients = [
    "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
    "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
    "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
  ];

  const [panelGradient, setPanelGradient] = useState(accentGradients[0]);

  useEffect(() => {
    setPanelGradient(accentGradients[activeCard % accentGradients.length]);
  }, [activeCard]);

  return (
    <div
      ref={ref}
      className="relative flex h-[38rem] justify-center gap-12 overflow-y-auto rounded-2xl p-10"
      style={{
        background: "var(--av-card)",
        border: "1px solid var(--av-border)",
        scrollbarWidth: "none",
      }}
    >
      {/* Left: scrollable text */}
      <div className="relative flex items-start">
        <div className="max-w-xs">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20 first:mt-0">
              <motion.h2
                animate={{ opacity: activeCard === index ? 1 : 0.25 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-bold leading-snug"
                style={{ color: "var(--av-text-1)", fontFamily: "var(--font-syne)" }}
              >
                {item.title}
              </motion.h2>
              <motion.p
                animate={{ opacity: activeCard === index ? 1 : 0.25 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-[13px] leading-relaxed"
                style={{ color: "var(--av-text-2)" }}
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>

      {/* Right: sticky visual panel */}
      <motion.div
        animate={{ background: panelGradient }}
        transition={{ duration: 0.5 }}
        className={cn(
          "sticky top-0 hidden h-64 w-72 shrink-0 overflow-hidden rounded-2xl lg:flex items-center justify-center",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </motion.div>
    </div>
  );
};
