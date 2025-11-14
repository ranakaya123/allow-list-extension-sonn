"use client"

import { motion } from "framer-motion"
import { Shield, CheckCircle, Camera, ArrowRight } from "lucide-react"
import type { WizardState } from "../allow-list-wizard"

interface WelcomeStepProps {
  state: WizardState
  updateState: (updates: Partial<WizardState>) => void
  nextStep: () => void
}

export function WelcomeStep({ state, nextStep }: WelcomeStepProps) {
  const content = {
    tr: {
      title: "Keepnet Allow List Yapılandırma Asistanı",
      subtitle: "Office 365 için adım adım rehberlik",
      description:
        "Bu asistan, Office 365 hesabınızda Keepnet phishing simülasyonları için gerekli allow list ayarlarını yapmanıza yardımcı olacak.",
      features: [
        {
          icon: CheckCircle,
          title: "Adım Adım Rehberlik",
          description: "Her adımda ne yapmanız gerektiğini açık ve net şekilde gösteriyoruz",
        },
        {
          icon: Shield,
          title: "Canlı Ekran Yönlendirme",
          description: "Tıklamanız gereken yerleri ekranda vurguluyoruz",
        },
        {
          icon: Camera,
          title: "Otomatik Kanıt Toplama",
          description: "Her adımda otomatik ekran görüntüsü alıyoruz",
        },
      ],
      steps: [
        "Third-party Phishing Simulations",
        "Connection Filter Policy",
        "Safe Links Policy",
        "Spam Filter Bypass",
        "ATP Link Bypass",
        "ATP Attachment Bypass",
        "Doğrulama ve Tamamlama",
      ],
      button: "Başlayalım",
      estimatedTime: "Tahmini Süre: 15-20 dakika",
    },
    en: {
      title: "Keepnet Allow List Configuration Assistant",
      subtitle: "Step-by-step guidance for Office 365",
      description:
        "This assistant will help you configure the necessary allow list settings in your Office 365 account for Keepnet phishing simulations.",
      features: [
        {
          icon: CheckCircle,
          title: "Step-by-Step Guidance",
          description: "We clearly show you what to do at each step",
        },
        {
          icon: Shield,
          title: "Live On-Screen Direction",
          description: "We highlight where you need to click on the screen",
        },
        {
          icon: Camera,
          title: "Automatic Evidence Collection",
          description: "We automatically take screenshots at each step",
        },
      ],
      steps: [
        "Third-party Phishing Simulations",
        "Connection Filter Policy",
        "Safe Links Policy",
        "Spam Filter Bypass",
        "ATP Link Bypass",
        "ATP Attachment Bypass",
        "Verification and Completion",
      ],
      button: "Let's Start",
      estimatedTime: "Estimated Time: 15-20 minutes",
    },
  }

  const t = content[state.language]

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-2xl mb-6"
        >
          <Shield className="w-10 h-10 text-primary" />
        </motion.div>
        <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">{t.title}</h2>
        <p className="text-xl text-muted-foreground mb-2">{t.subtitle}</p>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto text-pretty">{t.description}</p>
      </motion.div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {t.features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="card-elevated"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Steps Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="card-elevated mb-8"
      >
        <h3 className="text-xl font-semibold text-foreground mb-6">
          {state.language === "tr" ? "Yapılacak Adımlar" : "Steps to Complete"}
        </h3>
        <div className="space-y-3">
          {t.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                {index + 1}
              </div>
              <p className="text-foreground">{step}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground mb-4">{t.estimatedTime}</p>
        <button onClick={nextStep} className="btn-primary inline-flex items-center gap-2 group">
          {t.button}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  )
}
