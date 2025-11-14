"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, CheckCircle, Camera, MousePointer, AlertTriangle } from "lucide-react"
import type { WizardState } from "../allow-list-wizard"
import { HighlightDemo } from "../highlight-demo"

interface GuidanceStepProps {
  state: WizardState
  updateState: (updates: Partial<WizardState>) => void
  nextStep: () => void
  prevStep: () => void
}

const STEP_CONTENT = {
  2: {
    tr: {
      title: "Third-party Phishing Simulations",
      path: "Security & Compliance Center > Policies & rules > Threat policies > Advanced delivery",
      actions: [
        '"Phishing simulations" sekmesine tıklayın',
        '"Edit" butonuna tıklayın',
        'IP adreslerini "Sending IP" bölümüne ekleyin',
        'Domainleri "Domains" bölümüne ekleyin',
        'Simulation URL\'lerini "*.domain.com/*" formatında ekleyin',
        '"Save" butonuna tıklayın',
      ],
    },
    en: {
      title: "Third-party Phishing Simulations",
      path: "Security & Compliance Center > Policies & rules > Threat policies > Advanced delivery",
      actions: [
        'Click on "Phishing simulations" tab',
        'Click "Edit" button',
        'Add IP addresses to "Sending IP" section',
        'Add domains to "Domains" section',
        'Add simulation URLs in "*.domain.com/*" format',
        'Click "Save" button',
      ],
    },
  },
  3: {
    tr: {
      title: "Connection Filter Policy",
      path: "Policies and rules > Anti-Spam > Connection Filter Policy",
      actions: [
        '"Connection Filter Policy" seçeneğini seçin',
        '"Edit connection filter" butonuna tıklayın',
        'IP adreslerini "Always allow messages from..." bölümüne ekleyin',
        '"Turn on safe list" checkbox\'ını işaretleyin',
        '"Save" butonuna tıklayın',
      ],
    },
    en: {
      title: "Connection Filter Policy",
      path: "Policies and rules > Anti-Spam > Connection Filter Policy",
      actions: [
        'Select "Connection Filter Policy"',
        'Click "Edit connection filter" button',
        'Add IP addresses to "Always allow messages from..." section',
        'Check "Turn on safe list" checkbox',
        'Click "Save" button',
      ],
    },
  },
  4: {
    tr: {
      title: "Safe Links Policy",
      path: "Policies and rules > Threat Policies > Safe Links",
      actions: [
        '"Create" butonuna tıklayın',
        "Policy adı ve açıklama girin",
        "Şirket domainini seçin",
        '"Track user clicks" ve "Office 365 Apps" seçeneklerini KAPATIN',
        'Domainleri "Do not rewrite..." bölümüne "*.domain.com/*" formatında ekleyin',
        '"Submit" butonuna tıklayın',
      ],
    },
    en: {
      title: "Safe Links Policy",
      path: "Policies and rules > Threat Policies > Safe Links",
      actions: [
        'Click "Create" button',
        "Enter policy name and description",
        "Select company domain",
        'TURN OFF "Track user clicks" and "Office 365 Apps" options',
        'Add domains to "Do not rewrite..." section in "*.domain.com/*" format',
        'Click "Submit" button',
      ],
    },
  },
  5: {
    tr: {
      title: "Spam Filter Bypass Rule",
      path: "Exchange Admin Center > Mail flow > Rules",
      actions: [
        '"+ Add a rule" > "Bypass Spam Filter" seçin',
        "Kural adı girin",
        '"The sender" > "IP address is in any of these ranges" seçin',
        "IP adreslerini ekleyin",
        'SCL değerini "-1" olarak ayarlayın',
        '"X-MS-Exchange-Organization-BypassClutter" header\'ını "true" olarak ekleyin',
        "Kuralı kaydedin ve etkinleştirin",
      ],
    },
    en: {
      title: "Spam Filter Bypass Rule",
      path: "Exchange Admin Center > Mail flow > Rules",
      actions: [
        'Select "+ Add a rule" > "Bypass Spam Filter"',
        "Enter rule name",
        'Select "The sender" > "IP address is in any of these ranges"',
        "Add IP addresses",
        'Set SCL value to "-1"',
        'Add "X-MS-Exchange-Organization-BypassClutter" header as "true"',
        "Save and enable the rule",
      ],
    },
  },
  6: {
    tr: {
      title: "ATP Link Bypass",
      path: "Exchange > Mail flow > Rules",
      actions: [
        "Yeni kural oluşturun",
        "Kural adı girin",
        '"The sender" > "IP address is in any of these ranges" seçin',
        "IP adreslerini ekleyin",
        '"X-MS-Exchange-Organization-SkipSafeLinksProcessing" header\'ını "1" olarak ayarlayın',
        "Kuralı kaydedin ve etkinleştirin",
      ],
    },
    en: {
      title: "ATP Link Bypass",
      path: "Exchange > Mail flow > Rules",
      actions: [
        "Create new rule",
        "Enter rule name",
        'Select "The sender" > "IP address is in any of these ranges"',
        "Add IP addresses",
        'Set "X-MS-Exchange-Organization-SkipSafeLinksProcessing" header to "1"',
        "Save and enable the rule",
      ],
    },
  },
  7: {
    tr: {
      title: "ATP Attachment Bypass",
      path: "Exchange > Mail flow > Rules",
      actions: [
        "Yeni kural oluşturun",
        "Kural adı girin",
        '"The sender" > "IP address is in any of these ranges" seçin',
        "IP adreslerini ekleyin",
        '"X-MS-Exchange-Organization-SkipSafeAttachmentProcessing" header\'ını "1" olarak ayarlayın',
        "Kuralı kaydedin ve etkinleştirin",
      ],
    },
    en: {
      title: "ATP Attachment Bypass",
      path: "Exchange > Mail flow > Rules",
      actions: [
        "Create new rule",
        "Enter rule name",
        'Select "The sender" > "IP address is in any of these ranges"',
        "Add IP addresses",
        'Set "X-MS-Exchange-Organization-SkipSafeAttachmentProcessing" header to "1"',
        "Save and enable the rule",
      ],
    },
  },
}

export function GuidanceStep({ state, nextStep, prevStep }: GuidanceStepProps) {
  const stepData = STEP_CONTENT[state.currentStep as keyof typeof STEP_CONTENT]
  const content = stepData[state.language]

  const labels = {
    tr: {
      pathLabel: "Navigasyon Yolu",
      actionsLabel: "Yapılacaklar",
      ipLabel: "Kullanılacak IP Adresleri",
      domainLabel: "Kullanılacak Domainler",
      screenshotNote: "Bu adım tamamlandığında otomatik ekran görüntüsü alınacak",
      demoTitle: "Canlı Rehberlik Önizlemesi",
      demoDescription: "Gerçek Office 365 sayfasında bu şekilde yönlendirileceksiniz",
      nextButton: "Adımı Tamamla",
      prevButton: "Geri",
      warningTitle: "Önemli Uyarı",
      warningText: "Bu adımı tamamlamadan devam edemezsiniz. Lütfen tüm işlemleri Office 365 panelinde yapın.",
    },
    en: {
      pathLabel: "Navigation Path",
      actionsLabel: "Actions to Take",
      ipLabel: "IP Addresses to Use",
      domainLabel: "Domains to Use",
      screenshotNote: "Screenshot will be taken automatically when this step is completed",
      demoTitle: "Live Guidance Preview",
      demoDescription: "You will be guided like this on the actual Office 365 page",
      nextButton: "Complete Step",
      prevButton: "Back",
      warningTitle: "Important Warning",
      warningText:
        "You cannot proceed without completing this step. Please perform all operations in the Office 365 panel.",
    },
  }

  const t = labels[state.language]

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          {state.language === "tr" ? `Adım ${state.currentStep}/8` : `Step ${state.currentStep}/8`}
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3 text-balance">{content.title}</h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Left Column - Instructions */}
        <div className="space-y-6">
          {/* Navigation Path */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-elevated"
          >
            <div className="flex items-center gap-2 mb-3">
              <MousePointer className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">{t.pathLabel}</h3>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 border border-border">
              <code className="text-sm text-foreground break-all">{content.path}</code>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-elevated"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">{t.actionsLabel}</h3>
            </div>
            <div className="space-y-3">
              {content.actions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold text-xs">
                    {index + 1}
                  </div>
                  <p className="text-sm text-foreground text-pretty">{action}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Configuration Data */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card-elevated"
          >
            <h3 className="font-semibold text-foreground mb-4">{t.ipLabel}</h3>
            <div className="space-y-2 mb-4">
              {state.ipAddresses.map((ip, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded bg-secondary/50">
                  <code className="text-sm font-mono text-foreground">{ip}</code>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-foreground mb-4">{t.domainLabel}</h3>
            <div className="space-y-2">
              {state.domains.map((domain, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded bg-secondary/50">
                  <code className="text-sm font-mono text-foreground">*.{domain}/*</code>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Live Demo */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-elevated"
          >
            <div className="flex items-center gap-2 mb-3">
              <Camera className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">{t.demoTitle}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{t.demoDescription}</p>
            <HighlightDemo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-start gap-3 p-4 rounded-lg bg-warning/10 border border-warning/30"
          >
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-warning mb-1">{t.warningTitle}</h4>
              <p className="text-sm text-warning/90">{t.warningText}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/30"
          >
            <Camera className="w-5 h-5 text-success" />
            <p className="text-sm text-success">{t.screenshotNote}</p>
          </motion.div>
        </div>
      </div>

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
        <button onClick={nextStep} className="btn-primary inline-flex items-center gap-2 group">
          {t.nextButton}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  )
}
