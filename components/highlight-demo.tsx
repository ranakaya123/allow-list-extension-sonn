"use client"

import { motion } from "framer-motion"
import { MousePointer } from "lucide-react"

export function HighlightDemo() {
  return (
    <div className="relative bg-secondary/30 rounded-lg p-6 border border-border overflow-hidden">
      {/* Simulated Office 365 Interface */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <div className="w-8 h-8 bg-primary/20 rounded" />
          <div className="h-4 bg-muted rounded w-32" />
        </div>

        <div className="space-y-3">
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-3/4" />

          {/* Highlighted Element */}
          <motion.div
            className="relative p-4 bg-card rounded-lg border-2 border-primary shadow-lg"
            animate={{
              boxShadow: ["0 0 0 0 rgba(var(--color-primary), 0.7)", "0 0 0 20px rgba(var(--color-primary), 0)"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="h-3 bg-primary/30 rounded w-2/3" />

            {/* Animated Arrow */}
            <motion.div
              className="absolute -left-12 top-1/2 -translate-y-1/2"
              animate={{
                x: [0, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <MousePointer className="w-8 h-8 text-primary" />
            </motion.div>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl"
            >
              Buraya tıklayın
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary" />
            </motion.div>
          </motion.div>

          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-1/2" />
        </div>
      </div>

      {/* Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
    </div>
  )
}
