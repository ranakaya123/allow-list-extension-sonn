"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Server, Globe, Plus, X, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react"
import type { WizardState } from "../allow-list-wizard"

interface ConfigurationStepProps {
  state: WizardState
  updateState: (updates: Partial<WizardState>) => void
  nextStep: () => void
  prevStep: () => void
}

export function ConfigurationStep({ state, updateState, nextStep, prevStep }: ConfigurationStepProps) {
  const [newDomain, setNewDomain] = useState("")
  const [error, setError] = useState("")

  const content = {
    tr: {
      title: "IP Adresleri ve Domain Yapılandırması",
      subtitle: "Keepnet için gerekli bilgileri girin",
      ipTitle: "Keepnet IP Adresleri",
      ipDescription: "Bu IP adresleri otomatik olarak eklenmiştir",
      domainTitle: "Domain Listesi",
      domainDescription: "Keepnet domainlerinizi ekleyin (örn: yourdomain.com)",
      domainPlaceholder: "Domain adı girin",
      addButton: "Ekle",
      nextButton: "Devam Et",
      prevButton: "Geri",
      errorMessage: "Lütfen en az bir domain ekleyin",
      note: "Not: Bu bilgiler tüm yapılandırma adımlarında kullanılacaktır",
    },
    en: {
      title: "IP Addresses and Domain Configuration",
      subtitle: "Enter required information for Keepnet",
      ipTitle: "Keepnet IP Addresses",
      ipDescription: "These IP addresses are automatically added",
      domainTitle: "Domain List",
      domainDescription: "Add your Keepnet domains (e.g., yourdomain.com)",
      domainPlaceholder: "Enter domain name",
      addButton: "Add",
      nextButton: "Continue",
      prevButton: "Back",
      errorMessage: "Please add at least one domain",
      note: "Note: This information will be used in all configuration steps",
    },
  }

  const t = content[state.language]

  const addDomain = () => {
    if (newDomain.trim()) {
      updateState({ domains: [...state.domains, newDomain.trim()] })
      setNewDomain("")
      setError("")
    }
  }

  const removeDomain = (index: number) => {
    updateState({ domains: state.domains.filter((_, i) => i !== index) })
  }

  const handleNext = () => {
    if (state.domains.length === 0) {
      setError(t.errorMessage)
      return
    }
    nextStep()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-foreground mb-3 text-balance">{t.title}</h2>
        <p className="text-lg text-muted-foreground text-pretty">{t.subtitle}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* IP Addresses */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card-elevated"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Server className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{t.ipTitle}</h3>
              <p className="text-sm text-muted-foreground">{t.ipDescription}</p>
            </div>
          </div>
          <div className="space-y-2">
            {state.ipAddresses.map((ip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border"
              >
                <div className="w-2 h-2 bg-success rounded-full" />
                <code className="text-sm font-mono text-foreground flex-1">{ip}</code>
                <span className="badge-success">Aktif</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Domains */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card-elevated"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{t.domainTitle}</h3>
              <p className="text-sm text-muted-foreground">{t.domainDescription}</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addDomain()}
              placeholder={t.domainPlaceholder}
              className="input-field"
            />
            <button onClick={addDomain} className="btn-primary flex-shrink-0 flex items-center gap-2 px-4">
              <Plus className="w-4 h-4" />
              {t.addButton}
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-lg bg-destructive/20 border border-destructive/30 mb-4"
            >
              <AlertCircle className="w-4 h-4 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </motion.div>
          )}

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {state.domains.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                {state.language === "tr" ? "Henüz domain eklenmedi" : "No domains added yet"}
              </div>
            ) : (
              state.domains.map((domain, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg bg-secondary/50 border border-border group hover:border-primary/50 transition-colors"
                >
                  <code className="text-sm font-mono text-foreground flex-1">{domain}</code>
                  <button
                    onClick={() => removeDomain(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/20 rounded"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-start gap-3 p-4 rounded-lg bg-info/10 border border-info/30 mb-8"
      >
        <AlertCircle className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
        <p className="text-sm text-info">{t.note}</p>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex items-center justify-between"
      >
        <button onClick={prevStep} className="btn-secondary inline-flex items-center gap-2 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t.prevButton}
        </button>
        <button onClick={handleNext} className="btn-primary inline-flex items-center gap-2 group">
          {t.nextButton}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  )
}
