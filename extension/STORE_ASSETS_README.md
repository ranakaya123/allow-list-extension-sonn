# Chrome Web Store Görselleri Hazırlama Kılavuzu

Bu klasör Chrome Web Store'a yüklemek için gerekli görselleri içerir.

## Gerekli Görseller

### 1. Small Promotional Tile (ZORUNLU)
- **Boyut**: 440x280 piksel
- **Format**: PNG veya JPG
- **Açıklama**: Store listing'de gösterilecek küçük promosyon görseli
- **İçerik Önerisi**: 
  - Extension ikonu ve adı
  - Kısa bir slogan veya özellik
  - Temiz ve profesyonel tasarım

### 2. Marquee Promotional Tile (ÖNERİLİR)
- **Boyut**: 1400x560 piksel
- **Format**: PNG veya JPG
- **Açıklama**: Store sayfasının üst kısmında gösterilecek büyük promosyon görseli
- **İçerik Önerisi**:
  - Extension'un ana özelliklerini gösteren görsel
  - "Keepnet Assistant" başlığı
  - Office 365 logosu veya Microsoft logosu referansı

### 3. Screenshots (EN AZ 1, MAKSİMUM 5)
- **Boyut**: 1280x800 veya 640x400 piksel
- **Format**: PNG veya JPG
- **Açıklama**: Extension'un kullanımını gösteren ekran görüntüleri
- **Önerilen Screenshot'lar**:
  1. **Welcome Screen**: Assistant panelinin açılış ekranı
  2. **Workflow Selection**: Workflow seçim ekranı
  3. **Step Navigation**: Adım navigasyonu gösteren ekran
  4. **Completion Screen**: Tamamlanma ekranı ve özet rapor
  5. **Office 365 Integration**: Microsoft Security Center'da çalışırken görünüm

## Görsel Hazırlama İpuçları

### Tasarım Prensipleri
- **Tutarlılık**: Tüm görsellerde aynı renk paleti ve tipografi kullanın
- **Netlik**: Yüksek çözünürlükte görseller kullanın
- **Basitlik**: Görselleri karmaşık hale getirmeyin
- **Branding**: Keepnet marka renklerini kullanın

### Renk Paleti Önerileri
- Ana Renk: #1E40AF (Mavi)
- İkincil Renk: #10B981 (Yeşil - tamamlanma durumu için)
- Arka Plan: #FFFFFF (Beyaz) veya #F3F4F6 (Açık gri)
- Metin: #111827 (Koyu gri)

### Tipografi
- Başlık: Bold, 24-32px
- Alt Başlık: Medium, 18-24px
- Metin: Regular, 14-16px

## Görselleri Hazırlama Adımları

1. **Ekran Görüntüleri Alın**:
   - Extension'u Microsoft Security Center'da çalıştırın
   - Her önemli ekranı yakalayın
   - Chrome DevTools ile yüksek kaliteli screenshot alın

2. **Görselleri Düzenleyin**:
   - Photoshop, Figma veya benzeri bir araç kullanın
   - Gerekli boyutlara yeniden boyutlandırın
   - Metin ve açıklamalar ekleyin
   - Branding elementlerini ekleyin

3. **Optimize Edin**:
   - Görselleri sıkıştırın (TinyPNG veya benzeri)
   - Dosya boyutlarını kontrol edin (mümkün olduğunca küçük)
   - Format kontrolü yapın (PNG veya JPG)

## Dosya Adlandırma

Görselleri şu şekilde adlandırın:
- `promotional-tile-small.png` (440x280)
- `promotional-tile-marquee.png` (1400x560)
- `screenshot-1-welcome.png` (1280x800)
- `screenshot-2-workflow.png` (1280x800)
- `screenshot-3-steps.png` (1280x800)
- `screenshot-4-completion.png` (1280x800)
- `screenshot-5-integration.png` (1280x800)

## Store'a Yükleme

1. Chrome Web Store Developer Dashboard'a gidin
2. Yeni extension oluşturun veya mevcut extension'ı düzenleyin
3. "Store listing" sekmesine gidin
4. Görselleri ilgili bölümlere yükleyin
5. Her görsel için uygun açıklama ekleyin

## Notlar

- Tüm görseller İngilizce ve Türkçe olarak hazırlanmalı (veya her iki dilde de anlaşılır olmalı)
- Görsellerde kişisel bilgi veya hassas veri gösterilmemeli
- Görseller Chrome Web Store'un içerik politikasına uygun olmalı

