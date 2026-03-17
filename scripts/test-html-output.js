const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/propiedad/1',
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
};

console.log('🔍 Fetching http://localhost:3000/propiedad/1\n');

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`Status: ${res.statusCode}\n`);
    
    // Buscar la sección de promociones
    const promotionMatches = data.match(/promotion/gi);
    console.log(`Found ${promotionMatches ? promotionMatches.length : 0} occurrences of "promotion" in HTML\n`);
    
    // Buscar el componente específico
    if (data.includes('PropertyPromotionsGrid')) {
      console.log('✓ PropertyPromotionsGrid component found in HTML');
    } else {
      console.log('✗ PropertyPromotionsGrid component NOT found in HTML');
    }
    
    // Buscar la imagen de promoción
    if (data.includes('modal-desktop-kings-park')) {
      console.log('✓ Promotion image reference found in HTML');
    } else {
      console.log('✗ Promotion image reference NOT found in HTML');
    }
    
    // Buscar sección de promociones
    if (data.includes('Promociones Especiales') || data.includes('promotions-heading')) {
      console.log('✓ Promotions section heading found');
    } else {
      console.log('✗ Promotions section heading NOT found');
    }
    
    // Extraer un snippet del HTML relacionado con promociones
    const sections = data.split('<section');
    const promotionSection = sections.find(s => s.includes('promotion'));
    
    if (promotionSection) {
      console.log('\n📄 Promotion section snippet:');
      console.log(promotionSection.substring(0, 500) + '...\n');
    } else {
      console.log('\n❌ No promotion section found in HTML\n');
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error:', error.message);
});

req.end();
