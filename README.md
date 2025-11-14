# Keepnet Allow List Assistant for Office 365

Office 365'te Keepnet phishing simülasyonları için otomatik allow list yapılandırma asistanı. Akıllı navigasyon, gerçek zamanlı doğrulama ve kanıt toplama özellikleri ile Office 365 güvenlik ayarlarını kolayca yapılandırın.

## 🚀 Özellikler

- **Otomatik Navigasyon**: Microsoft Security Center ve Exchange Admin Portal'da otomatik gezinme
- **Gerçek Zamanlı Doğrulama**: Her adımda otomatik kontrol ve doğrulama
- **Akıllı Tıklama**: Element bulma ve otomatik tıklama sistemi
- **Screenshot Kanıtları**: Her adım için otomatik ekran görüntüsü alma
- **Çoklu Workflow Desteği**: 
  - Third-Party Phishing Simulations
  - Anti-Spam Policies
  - Safe Links Configuration
  - Spam Filter Bypass Rules
  - ATP Link Bypass
  - ATP Attachment Bypass

## 📋 Desteklenen Workflow'lar

### 1. Third-Party Phishing Simulations
- Security Center ana sayfasından başlayarak
- E-posta ve İşbirliği menüsü
- İlkeler ve Kurallar
- Tehdit İlkeleri
- Advanced Delivery
- Phishing Simulation sekmesi
- Domain ve IP allow list yapılandırması

### 2. Anti-Spam Policies
- Connection Filter Policy yapılandırması
- IP adresi allow list'i
- Safe List aktivasyonu

### 3. Safe Links
- Safe Links policy oluşturma
- Domain ekleme
- Phishing domain bypass'ı

### 4. Spam Filter Bypass
- Exchange Admin Portal transport rules
- IP-based bypass kuralları
- Message header yapılandırması

### 5. ATP (Advanced Threat Protection)
- ATP Link Bypass kuralları
- ATP Attachment Bypass kuralları
- SkipSafeLinksProcessing ve SkipSafeAttachmentProcessing

## 🛠️ Kurulum

### Chrome Extension Olarak

1. Bu repository'yi klonlayın:
```bash
git clone https://github.com/yourusername/keepnet-allow-list-assistant.git
cd keepnet-allow-list-assistant
```

2. Chrome'da `chrome://extensions/` sayfasına gidin

3. "Developer mode" aktif edin

4. "Load unpacked" butonuna tıklayın

5. `extension/` klasörünü seçin

### Next.js Web App Olarak

1. Dependencies'leri yükleyin:
```bash
npm install
# veya
pnpm install
```

2. Development server'ı başlatın:
```bash
npm run dev
# veya
pnpm dev
```

3. `http://localhost:3000` adresinde uygulamayı açın

## 📖 Kullanım

### Chrome Extension

1. Microsoft Security Center (`https://security.microsoft.com`) veya Exchange Admin Portal (`https://admin.exchange.microsoft.com`) sayfasına gidin

2. Extension ikonuna tıklayın

3. Assistant paneli açılacak

4. "Başlat" butonuna tıklayarak workflow'u başlatın

5. Adım adım talimatları takip edin

### Web App

1. Ana sayfada "Start Wizard" butonuna tıklayın

2. Workflow türünü seçin

3. Adım adım talimatları takip edin

## 🔧 Teknik Detaylar

### Chrome Extension
- **Manifest Version**: 3
- **Permissions**: storage, tabs, activeTab, scripting
- **Content Scripts**: Security.microsoft.com ve admin.exchange.microsoft.com için
- **Background Service Worker**: Mesaj yönetimi ve screenshot alma

### Web App
- **Framework**: Next.js 14
- **UI Library**: Custom UI components
- **Styling**: CSS Modules ve Tailwind CSS
- **State Management**: React hooks

## 📁 Proje Yapısı

```
keepnet-allow-list-assistant/
├── app/                    # Next.js app directory
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/             # React components
│   ├── ui/                 # UI components
│   ├── steps/              # Step components
│   └── allow-list-wizard.tsx
├── extension/              # Chrome extension
│   ├── manifest.json
│   ├── background.js
│   ├── content.js
│   ├── content.css
│   └── icons/
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── styles/                 # Global styles
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 🆘 Destek

Sorunlar için GitHub Issues kullanın veya [Keepnet Labs](https://keepnetlabs.com) ile iletişime geçin.

## 🔄 Changelog

### v3.1.0
- ✅ Content script mesaj dinleyici eklendi
- ✅ Initialization süreci iyileştirildi
- ✅ Injection timing sorunları çözüldü
- ✅ Çoklu retry mekanizması eklendi
- ✅ Timeout süreleri artırıldı
- ✅ Illegal return statement hatası düzeltildi
- ✅ IIFE ile script sarıldı

### v3.0.0
- 🎉 İlk stabil sürüm
- 🎯 Office 365 entegrasyonu
- 🎯 Otomatik workflow sistemi
- 🎯 Screenshot kanıt sistemi
