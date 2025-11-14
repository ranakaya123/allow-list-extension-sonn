"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface StepIndicatorProps {
  stepNumber: number
  isActive: boolean
  isComplete: boolean
}

export function StepIndicator({ stepNumber, isActive, isComplete }: StepIndicatorProps) {
  return (
    <motion.div
      className={`step-indicator ${isActive ? "step-indicator-active" : ""} ${
        isComplete ? "step-indicator-complete" : ""
      }`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, delay: stepNumber * 0.05 }}
    >
      {isComplete ? <Check className="w-5 h-5" /> : stepNumber}
    </motion.div>
  )
}
