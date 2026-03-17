const http = require('http');

function testURL(propertyId, name) {
  return new Promise((resolve) => {
    console.log(`\n🔍 Testing: ${name} (ID: ${propertyId})`);
    console.log(`   URL: http://localhost:3000/propiedad/${propertyId}`);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/propiedad/${propertyId}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const hasPromotionSection = data.includes('Promociones Especiales');
        const hasPromotionImage = data.includes('modal-desktop-kings-park');
        
        console.log(`   Status: ${res.statusCode}`);
        console.log(`   Promotion section: ${hasPromotionSection ? '✓' : '✗'}`);
        console.log(`   Promotion image: ${hasPromotionImage ? '✓' : '✗'}`);
        
        if (hasPromotionSection && hasPromotionImage) {
          console.log(`   ✅ SUCCESS - Promotion should be visible`);
        } else {
          console.log(`   ❌ FAIL - Promotion not rendering`);
        }
        
        resolve({ success: hasPromotionSection && hasPromotionImage });
      });
    });

    req.on('error', (error) => {
      console.error(`   ❌ Error: ${error.message}`);
      resolve({ success: false });
    });

    req.end();
  });
}

async function main() {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║  VERIFICACIÓN DE PROMOCIONES EN PÁGINAS DE APARTAMENTOS   ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  
  const results = await Promise.all([
    testURL(1, 'Torre 500, Apto 3-B'),
    testURL(238, 'Torre 500, Apto 10-B')
  ]);
  
  console.log('\n' + '═'.repeat(60));
  console.log('  RESUMEN');
  console.log('═'.repeat(60));
  
  const successCount = results.filter(r => r.success).length;
  console.log(`  ${successCount}/2 páginas mostrando promociones correctamente`);
  
  if (successCount === 2) {
    console.log(`  ✅ SISTEMA COMPLETO Y FUNCIONANDO`);
    console.log(`\n  Visita las páginas en tu navegador:`);
    console.log(`  • http://localhost:3000/propiedad/1`);
    console.log(`  • http://localhost:3000/propiedad/238`);
  } else {
    console.log(`  ⚠️  Revisa los logs del servidor para más detalles`);
  }
  console.log('═'.repeat(60) + '\n');
}

main();
