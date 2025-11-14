"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WelcomeStep } from "./steps/welcome-step"
import { ConfigurationStep } from "./steps/configuration-step"
import { GuidanceStep } from "./steps/guidance-step"
import { CompletionStep } from "./steps/completion-step"
import { ProgressBar } from "./progress-bar"
import { StepIndicator } from "./step-indicator"

export type Language = "tr" | "en"

export interface WizardState {
  currentStep: number
  language: Language
  ipAddresses: string[]
  domains: string[]
  completedSteps: number[]
  screenshots: Array<{
    stepNumber: number
    stepName: string
    timestamp: string
    dataUrl: string
  }>
}

interface PanelPosition {
  x: number
  y: number
}


const TOTAL_STEPS = 8
const PANEL_SIZE = { width: 400, height: 600 }
const STORAGE_KEY = 'allow_list_wizard_position'

export function AllowListWizard() {
  const [state, setState] = useState<WizardState>({
    currentStep: 0,
    language: "tr",
    ipAddresses: ["149.72.161.59", "149.72.42.201", "149.72.154.87"],
    domains: [],
    completedSteps: [],
    screenshots: [],
  })

  // Position state
  const [position, setPosition] = useState<PanelPosition>({ x: 20, y: 20 })
  
  const headerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const updateState = (updates: Partial<WizardState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }

  // Position management functions
  const savePosition = async (pos: PanelPosition) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pos))
    } catch (error) {
      console.warn('Failed to save position:', error)
    }
  }

  const loadPosition = (): PanelPosition => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (error) {
      console.warn('Failed to load position:', error)
    }
    return { x: 20, y: 20 }
  }

  // Load saved position on mount
  useEffect(() => {
    const savedPosition = loadPosition()
    setPosition(savedPosition)
  }, [])

  // Simple drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('button')) return
    
    const startX = e.clientX - position.x
    const startY = e.clientY - position.y
    
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - startX
      const newY = e.clientY - startY
      
      const maxX = window.innerWidth - PANEL_SIZE.width
      const maxY = window.innerHeight - PANEL_SIZE.height
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      })
    }
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      savePosition(position)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const nextStep = () => {
    if (state.currentStep < TOTAL_STEPS) {
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
        completedSteps: [...prev.completedSteps, prev.currentStep],
      }))
    }
  }

  const prevStep = () => {
    if (state.currentStep > 0) {
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep - 1,
      }))
    }
  }

  const renderStep = () => {
    switch (state.currentStep) {
      case 0:
        return <WelcomeStep state={state} updateState={updateState} nextStep={nextStep} />
      case 1:
        return <ConfigurationStep state={state} updateState={updateState} nextStep={nextStep} prevStep={prevStep} />
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return <GuidanceStep state={state} updateState={updateState} nextStep={nextStep} prevStep={prevStep} />
      case 8:
        return <CompletionStep state={state} updateState={updateState} prevStep={prevStep} />
      default:
        return null
    }
  }

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed z-50 bg-gradient-to-br from-white to-slate-50 border border-slate-200/60 rounded-2xl shadow-2xl backdrop-blur-xl"
      style={{
        left: position.x,
        top: position.y,
        width: PANEL_SIZE.width,
        height: PANEL_SIZE.height,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
      }}
    >
      {/* Draggable Header */}
      <motion.div
        ref={headerRef}
        onMouseDown={handleMouseDown}
        className="flex items-center justify-between p-5 border-b border-slate-200/50 bg-gradient-to-r from-slate-800 to-slate-700 rounded-t-2xl cursor-grab active:cursor-grabbing select-none"
        whileHover={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Keepnet Assistant</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateState({ language: state.language === "tr" ? "en" : "tr" })}
            className="px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-200 text-xs font-medium backdrop-blur-sm border border-white/20"
          >
            {state.language === "tr" ? "EN" : "TR"}
          </button>
        </div>
      </motion.div>

      {/* Progress Section */}
      {state.currentStep > 0 && state.currentStep < TOTAL_STEPS && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-b border-slate-200/50 bg-gradient-to-r from-slate-50 to-white backdrop-blur-sm"
        >
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-slate-500 mb-1 font-medium">
                  {state.language === "tr" ? "İlerleme" : "Progress"}
                </p>
                <p className="text-xl font-bold text-slate-800">
                  {state.language === "tr" ? "Adım" : "Step"} {state.currentStep}/{TOTAL_STEPS}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                  <StepIndicator
                    key={i}
                    stepNumber={i + 1}
                    isActive={state.currentStep === i + 1}
                    isComplete={state.completedSteps.includes(i + 1)}
                  />
                ))}
              </div>
            </div>
            <ProgressBar current={state.currentStep} total={TOTAL_STEPS} />
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-white to-slate-50">
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
