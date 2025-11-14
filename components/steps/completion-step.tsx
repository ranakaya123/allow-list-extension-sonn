"use client"

import { motion } from "framer-motion"
import { CheckCircle, Download, ArrowLeft, Trophy, Camera } from "lucide-react"
import type { WizardState } from "../allow-list-wizard"

interface CompletionStepProps {
  state: WizardState
  updateState: (updates: Partial<WizardState>) => void
  prevStep: () => void
}

export function CompletionStep({ state, prevStep }: CompletionStepProps) {
  const content = {
    tr: {
      title: "Tebrikler! Yapılandırma Tamamlandı",
      subtitle: "Office 365 white list ayarlarınız başarıyla yapılandırıldı",
      completedSteps: "Tamamlanan Adımlar",
      summary: "Özet",
      ipCount: "IP Adresi Eklendi",
      domainCount: "Domain Eklendi",
      screenshotCount: "Ekran Görüntüsü Alındı",
      downloadButton: "Kanıt Dosyalarını İndir",
      nextSteps: "Sonraki Adımlar",
      nextStepsItems: [
        "Test email göndererek yapılandırmayı doğrulayın",
        "Keepnet panelinden phishing simülasyonu başlatın",
        "Ekip üyelerinizi bilgilendirin",
        "Düzenli olarak raporları kontrol edin",
      ],
      backButton: "Geri",
      restartButton: "Yeni Yapılandırma Başlat",
      supportText: "Sorun yaşıyorsanız Keepnet destek ekibiyle iletişime geçin",
    },
    en: {
      title: "Congratulations! Configuration Complete",
      subtitle: "Your Office 365 allow list settings have been successfully configured",
      completedSteps: "Completed Steps",
      summary: "Summary",
      ipCount: "IP Addresses Added",
      domainCount: "Domains Added",
      screenshotCount: "Screenshots Taken",
      downloadButton: "Download Evidence Files",
      nextSteps: "Next Steps",
      nextStepsItems: [
        "Verify configuration by sending a test email",
        "Start phishing simulation from Keepnet panel",
        "Inform your team members",
        "Check reports regularly",
      ],
      backButton: "Back",
      restartButton: "Start New Configuration",
      supportText: "If you experience any issues, contact Keepnet support team",
    },
  }

  const t = content[state.language]

  const completedStepsList = [
    "Third-party Phishing Simulations",
    "Connection Filter Policy",
    "Safe Links Policy",
    "Spam Filter Bypass",
    "ATP Link Bypass",
    "ATP Attachment Bypass",
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-success/20 rounded-full mb-6"
        >
          <Trophy className="w-12 h-12 text-success" />
        </motion.div>
        <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">{t.title}</h2>
        <p className="text-xl text-muted-foreground text-pretty">{t.subtitle}</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card-elevated text-center"
        >
          <div className="text-4xl font-bold text-primary mb-2">{state.ipAddresses.length}</div>
          <p className="text-sm text-muted-foreground">{t.ipCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card-elevated text-center"
        >
          <div className="text-4xl font-bold text-primary mb-2">{state.domains.length}</div>
          <p className="text-sm text-muted-foreground">{t.domainCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card-elevated text-center"
        >
          <div className="text-4xl font-bold text-primary mb-2">6</div>
          <p className="text-sm text-muted-foreground">{t.screenshotCount}</p>
        </motion.div>
      </div>

      {/* Completed Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="card-elevated mb-8"
      >
        <h3 className="text-xl font-semibold text-foreground mb-6">{t.completedSteps}</h3>
        <div className="space-y-3">
          {completedStepsList.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-lg bg-success/10 border border-success/30"
            >
              <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
              <p className="text-foreground font-medium">{step}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Download Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center mb-8"
      >
        <button className="btn-primary inline-flex items-center gap-3 text-lg px-8 py-4">
          <Download className="w-6 h-6" />
          {t.downloadButton}
        </button>
        <p className="text-sm text-muted-foreground mt-3 flex items-center justify-center gap-2">
          <Camera className="w-4 h-4" />
          ZIP dosyası tüm ekran görüntülerini içerir
        </p>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="card-elevated mb-8"
      >
        <h3 className="text-xl font-semibold text-foreground mb-6">{t.nextSteps}</h3>
        <div className="space-y-3">
          {t.nextStepsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1 + index * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30"
            >
              <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold text-xs">
                {index + 1}
              </div>
              <p className="text-foreground text-pretty">{item}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="text-center p-4 rounded-lg bg-info/10 border border-info/30 mb-8"
      >
        <p className="text-sm text-info">{t.supportText}</p>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="flex items-center justify-between"
      >
        <button onClick={prevStep} className="btn-secondary inline-flex items-center gap-2 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t.backButton}
        </button>
        <button onClick={() => window.location.reload()} className="btn-primary inline-flex items-center gap-2">
          {t.restartButton}
        </button>
      </motion.div>
    </div>
  )
}
