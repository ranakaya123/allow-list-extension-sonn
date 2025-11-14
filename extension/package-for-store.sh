#!/bin/bash

# Keepnet Assistant - Chrome Web Store Paketleme Scripti
# Bu script extension'ı Chrome Web Store'a yüklemek için hazırlar

set -e

echo "🚀 Keepnet Assistant - Chrome Web Store Paketleme Başlatılıyor..."

# Renk kodları
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Extension klasörüne git
cd "$(dirname "$0")"
EXTENSION_DIR="$(pwd)"
PROJECT_ROOT="$(dirname "$EXTENSION_DIR")"
VERSION=$(grep '"version"' manifest.json | cut -d'"' -f4)
ZIP_NAME="keepnet-assistant-v${VERSION}.zip"
BUILD_DIR="${PROJECT_ROOT}/build"

echo -e "${GREEN}✓ Extension klasörü: ${EXTENSION_DIR}${NC}"
echo -e "${GREEN}✓ Versiyon: ${VERSION}${NC}"

# Build klasörü oluştur
echo -e "\n${YELLOW}📦 Build klasörü oluşturuluyor...${NC}"
mkdir -p "${BUILD_DIR}"
rm -rf "${BUILD_DIR}"/*

# Gerekli dosyaları kopyala
echo -e "${YELLOW}📋 Dosyalar kopyalanıyor...${NC}"

# Zorunlu dosyalar
cp manifest.json "${BUILD_DIR}/"
cp background.js "${BUILD_DIR}/"
cp content.js "${BUILD_DIR}/"
cp content.css "${BUILD_DIR}/"
cp config.json "${BUILD_DIR}/"
cp steps.json "${BUILD_DIR}/"

# Klasörleri kopyala
cp -r icons "${BUILD_DIR}/"
cp -r _locales "${BUILD_DIR}/"

# Dosya varlık kontrolü
echo -e "\n${YELLOW}🔍 Dosya kontrolü yapılıyor...${NC}"

REQUIRED_FILES=(
  "manifest.json"
  "background.js"
  "content.js"
  "content.css"
  "config.json"
  "steps.json"
  "icons/icon16.png"
  "icons/icon48.png"
  "icons/icon128.png"
  "_locales/tr/messages.json"
  "_locales/en/messages.json"
)

MISSING_FILES=()

for file in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "${BUILD_DIR}/${file}" ]; then
    MISSING_FILES+=("${file}")
  fi
done

if [ ${#MISSING_FILES[@]} -gt 0 ]; then
  echo -e "${RED}✗ Eksik dosyalar bulundu:${NC}"
  for file in "${MISSING_FILES[@]}"; do
    echo -e "${RED}  - ${file}${NC}"
  done
  exit 1
fi

echo -e "${GREEN}✓ Tüm gerekli dosyalar mevcut${NC}"

# Manifest.json kontrolü
echo -e "\n${YELLOW}🔍 Manifest.json kontrolü...${NC}"
if ! grep -q '"manifest_version": 3' "${BUILD_DIR}/manifest.json"; then
  echo -e "${RED}✗ Manifest version 3 olmalı!${NC}"
  exit 1
fi

if ! grep -q '"version"' "${BUILD_DIR}/manifest.json"; then
  echo -e "${RED}✗ Version tanımlı değil!${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Manifest.json geçerli${NC}"

# ZIP oluştur
echo -e "\n${YELLOW}📦 ZIP dosyası oluşturuluyor...${NC}"
cd "${BUILD_DIR}"
zip -r "${PROJECT_ROOT}/${ZIP_NAME}" . \
  -x "*.DS_Store" \
  -x "*.git*" \
  -x "*.md" \
  > /dev/null

cd "${PROJECT_ROOT}"

# ZIP boyutu kontrolü
ZIP_SIZE=$(du -h "${ZIP_NAME}" | cut -f1)
ZIP_SIZE_BYTES=$(stat -f%z "${ZIP_NAME}" 2>/dev/null || stat -c%s "${ZIP_NAME}" 2>/dev/null)
MAX_SIZE=$((10 * 1024 * 1024)) # 10MB

if [ ${ZIP_SIZE_BYTES} -gt ${MAX_SIZE} ]; then
  echo -e "${RED}✗ ZIP dosyası çok büyük: ${ZIP_SIZE} (Maksimum: 10MB)${NC}"
  exit 1
fi

echo -e "${GREEN}✓ ZIP dosyası oluşturuldu: ${ZIP_NAME} (${ZIP_SIZE})${NC}"

# Özet
echo -e "\n${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Paketleme Tamamlandı!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "📦 ZIP Dosyası: ${GREEN}${ZIP_NAME}${NC}"
echo -e "📏 Boyut: ${GREEN}${ZIP_SIZE}${NC}"
echo -e "📁 Konum: ${GREEN}${PROJECT_ROOT}/${ZIP_NAME}${NC}"
echo -e "\n${YELLOW}📝 Sonraki Adımlar:${NC}"
echo -e "1. Chrome Web Store Developer Dashboard'a gidin"
echo -e "2. 'New Item' butonuna tıklayın"
echo -e "3. ${ZIP_NAME} dosyasını yükleyin"
echo -e "4. Store listing bilgilerini doldurun (STORE_LISTING.md dosyasına bakın)"
echo -e "5. Privacy Policy URL'i ekleyin"
echo -e "6. Görselleri yükleyin (STORE_ASSETS_README.md dosyasına bakın)"
echo -e "7. 'Submit for Review' butonuna tıklayın"
echo -e "\n${YELLOW}📚 Yardımcı Dosyalar:${NC}"
echo -e "- ${EXTENSION_DIR}/STORE_LISTING.md"
echo -e "- ${EXTENSION_DIR}/PRIVACY_POLICY.md"
echo -e "- ${EXTENSION_DIR}/STORE_ASSETS_README.md"
echo -e "- ${EXTENSION_DIR}/CHROME_STORE_CHECKLIST.md"

