/**
 * Playwright Örneği: Workflow 2 - Adım 2
 * Checkbox Seçimi ve Doğrulama
 * 
 * Bu örnek, Microsoft Security Center'da "Connection Filter Policy" satırının
 * checkbox'ını seçmek ve seçildiğini doğrulamak için Playwright kullanır.
 */

const { chromium } = require('playwright');

async function selectConnectionFilterCheckbox() {
  // Tarayıcıyı başlat
  const browser = await chromium.launch({
    headless: false, // Görsel olarak görmek için false
    slowMo: 500 // Adımları yavaşlat (debug için)
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 1. Microsoft Security Center Anti-Spam sayfasına git
    console.log('📋 Anti-Spam sayfasına gidiliyor...');
    await page.goto('https://security.microsoft.com/antispam', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Sayfanın yüklenmesini bekle
    await page.waitForTimeout(2000);

    // 2. "Bağlantı filtresi ilkesi (Varsayılan)" satırını bul
    console.log('🔍 "Bağlantı filtresi ilkesi (Varsayılan)" satırı aranıyor...');
    
    // Önce satır metnini bul
    const rowText = await page.waitForSelector('span.scc-list-first-column', { 
      timeout: 10000,
      state: 'visible'
    });
    
    if (!rowText) {
      throw new Error('❌ Satır metni bulunamadı!');
    }
    
    // Tüm satırları kontrol et ve "Bağlantı filtresi ilkesi (Varsayılan)" satırını bul
    const allRows = await page.$$('span.scc-list-first-column');
    let targetRow = null;
    
    for (const row of allRows) {
      const text = await row.textContent();
      if (text && /Bağlantı filtresi ilkesi.*Varsayılan|Connection filter policy.*Default/i.test(text)) {
        targetRow = row;
        console.log(`✅ Hedef satır bulundu: "${text.trim()}"`);
        break;
      }
    }
    
    if (!targetRow) {
      throw new Error('❌ "Bağlantı filtresi ilkesi (Varsayılan)" satırı bulunamadı!');
    }
    
    // 3. Satırın parent container'ını bul ve checkbox'ı bul
    console.log('🔍 Checkbox aranıyor (satırdan)...');
    
    // Satırın parent container'ını bul
    const rowContainer = await targetRow.evaluateHandle((el) => {
      return el.closest('div[data-automationid="DetailsRow"]') ||
             el.closest('div.ms-DetailsRow') ||
             el.closest('div[role="row"]') ||
             el.parentElement?.parentElement;
    });
    
    if (!rowContainer) {
      throw new Error('❌ Satır container\'ı bulunamadı!');
    }
    
    // Container içinde checkbox'ı bul
    const checkboxHandle = await rowContainer.evaluateHandle((container) => {
      return container.querySelector('div[role="radio"][data-automationid="DetailsRowCheck"]') ||
             container.querySelector('div[aria-label="Satır seç"][data-automationid="DetailsRowCheck"]') ||
             container.querySelector('div.ms-DetailsRow-check[data-automationid="DetailsRowCheck"]');
    });
    
    if (!checkboxHandle) {
      throw new Error('❌ Checkbox bulunamadı! Satır container\'ında checkbox yok.');
    }
    
    // JSHandle'ı ElementHandle'a çevir
    const checkbox = await checkboxHandle.asElement();
    
    if (!checkbox) {
      throw new Error('❌ Checkbox element handle\'ı alınamadı!');
    }
    
    console.log('✅ Checkbox bulundu satırdan!');

    // 3. Checkbox'ın mevcut durumunu kontrol et
    const initialChecked = await checkbox.getAttribute('aria-checked');
    console.log(`📊 Mevcut durum: aria-checked="${initialChecked}"`);

    if (initialChecked === 'true') {
      console.log('✅ Checkbox zaten seçili!');
      return;
    }

    // 4. Checkbox'a scroll et (görünür olması için)
    await checkbox.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // 5. Checkbox'a tıkla - Nested yapı için özel strateji
    console.log('🖱️ Checkbox\'a tıklanıyor...');
    
    // Önce ana elemente tıkla
    await checkbox.click();
    
    // İçteki tıklanabilir alana da tıkla (nested yapı için)
    try {
      const clickableArea = await checkbox.$('.ms-Check');
      if (clickableArea) {
        console.log('🖱️ İçteki tıklanabilir alana da tıklanıyor...');
        await clickableArea.click();
      }
    } catch (e) {
      console.log('⚠️ İç alan tıklaması atlandı:', e.message);
    }

    // 6. Checkbox'ın seçildiğini doğrula - aria-checked="true" olana kadar bekle
    console.log('⏳ Checkbox\'ın seçilmesi bekleniyor...');
    
    const maxWait = 5000; // 5 saniye maksimum bekleme
    const checkInterval = 100; // Her 100ms kontrol et
    let waited = 0;
    let isChecked = false;

    while (waited < maxWait) {
      // Checkbox'ı tekrar bul (satırdan, DOM güncellenmiş olabilir)
      const allRows = await page.$$('span.scc-list-first-column');
      
      for (const currentRow of allRows) {
        const text = await currentRow.textContent();
        if (text && /Bağlantı filtresi ilkesi.*Varsayılan|Connection filter policy.*Default/i.test(text)) {
          const currentRowContainer = await currentRow.evaluateHandle((el) => {
            return el.closest('div[data-automationid="DetailsRow"]') ||
                   el.closest('div.ms-DetailsRow') ||
                   el.closest('div[role="row"]');
          });
          
          if (currentRowContainer) {
            const currentCheckboxHandle = await currentRowContainer.evaluateHandle((container) => {
              return container.querySelector('div[role="radio"][data-automationid="DetailsRowCheck"]');
            });
            
            if (currentCheckboxHandle) {
              const currentCheckbox = await currentCheckboxHandle.asElement();
              if (currentCheckbox) {
                const currentChecked = await currentCheckbox.getAttribute('aria-checked');
                
                if (currentChecked === 'true') {
                  console.log(`✅ Checkbox seçildi! (${waited}ms sonra)`);
                  isChecked = true;
                  checkbox = currentCheckbox; // Güncel checkbox'ı sakla
                  break;
                }
              }
            }
          }
          break; // Hedef satır bulundu, döngüden çık
        }
      }

      if (isChecked) break; // Checkbox seçildi, döngüden çık

      await page.waitForTimeout(checkInterval);
      waited += checkInterval;
    }

    if (!isChecked) {
      throw new Error(`❌ Checkbox ${maxWait}ms içinde seçilmedi!`);
    }

    // 7. Final doğrulama
    const finalChecked = await checkbox.getAttribute('aria-checked');
    console.log(`✅ Final doğrulama: aria-checked="${finalChecked}"`);

    if (finalChecked !== 'true') {
      throw new Error('❌ Checkbox seçilmedi! Final doğrulama başarısız.');
    }

    console.log('🎉 Başarılı! Checkbox seçildi ve doğrulandı.');

    // Ekran görüntüsü al (opsiyonel)
    await page.screenshot({ 
      path: 'checkbox-selected.png',
      fullPage: false 
    });
    console.log('📸 Ekran görüntüsü kaydedildi: checkbox-selected.png');

  } catch (error) {
    console.error('❌ Hata:', error.message);
    
    // Hata durumunda ekran görüntüsü al
    await page.screenshot({ 
      path: 'checkbox-error.png',
      fullPage: true 
    });
    console.log('📸 Hata ekran görüntüsü kaydedildi: checkbox-error.png');
    
    throw error;
  } finally {
    // Tarayıcıyı kapat (opsiyonel - debug için açık bırakılabilir)
    // await browser.close();
    console.log('🔚 İşlem tamamlandı.');
  }
}

// Fonksiyonu çalıştır
if (require.main === module) {
  selectConnectionFilterCheckbox()
    .then(() => {
      console.log('✅ Script başarıyla tamamlandı!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script hatası:', error);
      process.exit(1);
    });
}

module.exports = { selectConnectionFilterCheckbox };

