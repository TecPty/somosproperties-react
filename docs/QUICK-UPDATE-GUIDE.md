# 🔧 Guía de Actualización Rápida - Properties.json

## CAMBIOS PRIORITARIOS (Copiar y Pegar)

### 1️⃣ ACTUALIZAR PRECIOS - The Towers Business Plaza

**ID: 26** (Local 2A Nivel 2)
```json
"pricePerMonth": 7276  // Cambiar de 6378 a 7276
```

**ID: 242** (Local Planta Baja)  
```json
"pricePerMonth": 4280  // Cambiar de 4000 a 4280
```

---

### 2️⃣ AGREGAR - The Tower Residences (2 apartamentos)

```json
{
  "id": 248,
  "title": "The Tower Residences - Apto. 18 C Torre 100",
  "type": "Apartamento",
  "category": "Residencial",
  "operation": "Venta",
  "price": 400000,
  "pricePerMonth": null,
  "location": "San Francisco, Ciudad de Panamá",
  "city": "Ciudad de Panamá",
  "district": "San Francisco",
  "bedrooms": 3,
  "bathrooms": 3,
  "parkingSpots": 2,
  "area": 188.26,
  "builtYear": 2024,
  "mantenimiento": 375.52,
  "image": "/images/properties/the-towers-residences/units/30/sala-1.png",
  "images": [
    "/images/properties/the-towers-residences/units/30/sala-1.png"
  ],
  "description": "The Towers Residences - Apartamento 18 C en Torre 100, 188.26 m². Precio de venta $400,000. Mantenimiento mensual $375.52.",
  "amenities": [
    "Cancha de tenis profesional",
    "Piscina moderna efecto infinito",
    "Gimnasio equipado moderno",
    "Seguridad 24/7"
  ],
  "featured": false,
  "status": "available",
  "highlights": [
    "188 m² en Torre 100",
    "Precio $400,000",
    "Mantenimiento $375.52/mes"
  ]
},
{
  "id": 249,
  "title": "The Tower Residences - Apto. 23 C Torre 100 (Alquilado hasta 2027)",
  "type": "Apartamento",
  "category": "Residencial",
  "operation": "Venta",
  "price": 400000,
  "pricePerMonth": null,
  "location": "San Francisco, Ciudad de Panamá",
  "city": "Ciudad de Panamá",
  "district": "San Francisco",
  "bedrooms": 3,
  "bathrooms": 3,
  "parkingSpots": 2,
  "area": 188.26,
  "builtYear": 2024,
  "mantenimiento": 375.52,
  "image": "/images/properties/the-towers-residences/units/30/sala-1.png",
  "images": [
    "/images/properties/the-towers-residences/units/30/sala-1.png"
  ],
  "description": "The Towers Residences - Apartamento 23 C en Torre 100, 188.26 m². Actualmente alquilado hasta 2027. Precio de venta $400,000. Mantenimiento mensual $375.52.",
  "amenities": [
    "Cancha de tenis profesional",
    "Piscina moderna efecto infinito",
    "Gimnasio equipado moderno",
    "Seguridad 24/7"
  ],
  "featured": false,
  "status": "rented",
  "estadoDetallado": "Alquilado hasta 2027",
  "highlights": [
    "188 m² en Torre 100",
    "Precio $400,000",
    "Alquilado hasta 2027"
  ]
}
```

---

### 3️⃣ AGREGAR - Plaza Los Guayacanes (5 locales disponibles) ⭐

**Local 3 - $212,688**
```json
{
  "id": 250,
  "title": "Plaza Los Guayacanes - Local 3",
  "type": "Local",
  "category": "Comercial",
  "operation": "Venta/Alquiler",
  "price": 212688,
  "pricePerMonth": 711,
  "location": "La Chorrera, Vía Las Mendozas, Panamá Oeste",
  "city": "Panamá Oeste",
  "district": "La Chorrera",
  "bedrooms": 0,
  "bathrooms": 1,
  "parkingSpots": 0,
  "area": 132.93,
  "builtYear": 2024,
  "deposito": 664.65,
  "mantenimiento": 265.86,
  "image": "/images/properties/plaza-guayacanes/hero/hero-1.webp",
  "images": [
    "/images/properties/plaza-guayacanes/hero/hero-1.webp",
    "/images/properties/plaza-guayacanes/hero/hero-2.webp"
  ],
  "description": "Local comercial 3 en Plaza Los Guayacanes, La Chorrera. 132.93 m² disponible para venta o alquiler. Depósito $664.65, Alquiler mensual $711.17, Mantenimiento $265.86. Promoción: Cielo raso básico y cámara de seguridad totalmente gratis.",
  "amenities": [
    "Ubicación estratégica La Chorrera",
    "Amplio estacionamiento pÚblico",
    "Seguridad 24/7 con CCTV",
    "Promoción: Cielo raso básico gratis",
    "Promoción: Cámara de seguridad gratis",
    "Alto flujo vehicular"
  ],
  "featured": true,
  "status": "available",
  "promociones": ["Cielo raso básico gratis", "Cámara de seguridad gratis"],
  "highlights": [
    "132.93 m² en La Chorrera",
    "Venta $212,688 | Alquiler $711/mes",
    "Promoción: Cielo raso + cámara gratis"
  ]
}
```

**Local 5 - $105,008**
```json
{
  "id": 251,
  "title": "Plaza Los Guayacanes - Local 5",
  "type": "Local",
  "category": "Comercial",
  "operation": "Venta/Alquiler",
  "price": 105008,
  "pricePerMonth": 351,
  "location": "La Chorrera, Vía Las Mendozas, Panamá Oeste",
  "city": "Panamá Oeste",
  "district": "La Chorrera",
  "bedrooms": 0,
  "bathrooms": 1,
  "parkingSpots": 0,
  "area": 65.63,
  "builtYear": 2024,
  "deposito": 328.15,
  "mantenimiento": 131.26,
  "image": "/images/properties/plaza-guayacanes/hero/hero-2.webp",
  "images": [
    "/images/properties/plaza-guayacanes/hero/hero-2.webp",
    "/images/properties/plaza-guayacanes/hero/hero-3.webp"
  ],
  "description": "Local comercial 5 en Plaza Los Guayacanes, La Chorrera. 65.63 m² disponible para venta o alquiler. Depósito $328.15, Alquiler mensual $351.12, Mantenimiento $131.26. Promoción: Cielo raso básico y cámara de seguridad totalmente gratis.",
  "amenities": [
    "Ubicación estratégica La Chorrera",
    "Amplio estacionamiento pÚblico",
    "Seguridad 24/7 con CCTV",
    "Promoción: Cielo raso básico gratis",
    "Promoción: Cámara de seguridad gratis",
    "Alto flujo vehicular"
  ],
  "featured": false,
  "status": "available",
  "promociones": ["Cielo raso básico gratis", "Cámara de seguridad gratis"],
  "highlights": [
    "65.63 m² en La Chorrera",
    "Venta $105,008 | Alquiler $351/mes",
    "Ideal para comercio pequeño"
  ]
}
```

**Local 9 - $489,440** (El más grande disponible)
```json
{
  "id": 252,
  "title": "Plaza Los Guayacanes - Local 9",
  "type": "Local",
  "category": "Comercial",
  "operation": "Venta/Alquiler",
  "price": 489440,
  "pricePerMonth": 1637,
  "location": "La Chorrera, Vía Las Mendozas, Panamá Oeste",
  "city": "Panamá Oeste",
  "district": "La Chorrera",
  "bedrooms": 0,
  "bathrooms": 2,
  "parkingSpots": 0,
  "area": 305.9,
  "builtYear": 2024,
  "deposito": 1529.50,
  "mantenimiento": 611.80,
  "image": "/images/properties/plaza-guayacanes/hero/hero-3.webp",
  "images": [
    "/images/properties/plaza-guayacanes/hero/hero-3.webp",
    "/images/properties/plaza-guayacanes/hero/hero-1.webp"
  ],
  "description": "Local comercial 9 en Plaza Los Guayacanes, La Chorrera. 305.9 m² disponible para venta o alquiler. El local más grande disponible en el proyecto. Depósito $1,529.50, Alquiler mensual $1,636.56, Mantenimiento $611.80. Ideal para supermercado, gimnasio o retail grande. Promoción: Cielo raso básico y cámara de seguridad totalmente gratis.",
  "amenities": [
    "Ubicación estratégica La Chorrera",
    "Amplio estacionamiento pÚblico",
    "Seguridad 24/7 con CCTV",
    "Promoción: Cielo raso básico gratis",
    "Promoción: Cámara de seguridad gratis",
    "Alto flujo vehicular",
    "Ideal para anchor store"
  ],
  "featured": true,
  "status": "available",
  "promociones": ["Cielo raso básico gratis", "Cámara de seguridad gratis"],
  "highlights": [
    "305.9 m² - Local más grande disponible",
    "Venta $489,440 | Alquiler $1,637/mes",
    "Ideal supermercado o gimnasio"
  ]
}
```

**Local 16 - $122,784**
```json
{
  "id": 253,
  "title": "Plaza Los Guayacanes - Local 16",
  "type": "Local",
  "category": "Comercial",
  "operation": "Venta/Alquiler",
  "price": 122784,
  "pricePerMonth": 411,
  "location": "La Chorrera, Vía Las Mendozas, Panamá Oeste",
  "city": "Panamá Oeste",
  "district": "La Chorrera",
  "bedrooms": 0,
  "bathrooms": 1,
  "parkingSpots": 0,
  "area": 76.74,
  "builtYear": 2024,
  "deposito": 383.70,
  "mantenimiento": 153.48,
  "image": "/images/properties/plaza-guayacanes/hero/hero-1.webp",
  "images": [
    "/images/properties/plaza-guayacanes/hero/hero-1.webp"
  ],
  "description": "Local comercial 16 en Plaza Los Guayacanes, La Chorrera. 76.74 m² disponible. Depósito $383.70, Alquiler $410.55, Mantenimiento $153.48. Promoción: Cielo raso y cámara gratis.",
  "amenities": [
    "Seguridad 24/7 con CCTV",
    "Promoción: Cielo raso básico gratis",
    "Promoción: Cámara de seguridad gratis",
    "Alto flujo vehicular"
  ],
  "featured": false,
  "status": "available",
  "promociones": ["Cielo raso básico gratis", "Cámara de seguridad gratis"],
  "highlights": [
    "76.74 m²",
    "Venta $122,784 | Alquiler $411/mes"
  ]
}
```

**Local 17 - $186,176**
```json
{
  "id": 254,
  "title": "Plaza Los Guayacanes - Local 17",
  "type": "Local",
  "category": "Comercial",
  "operation": "Venta/Alquiler",
  "price": 186176,
  "pricePerMonth": 596,
  "location": "La Chorrera, Vía Las Mendozas, Panamá Oeste",
  "city": "Panamá Oeste",
  "district": "La Chorrera",
  "bedrooms": 0,
  "bathrooms": 1,
  "parkingSpots": 0,
  "area": 111.36,
  "builtYear": 2024,
  "deposito": 556.80,
  "mantenimiento": 222.72,
  "image": "/images/properties/plaza-guayacanes/hero/hero-2.webp",
  "images": [
    "/images/properties/plaza-guayacanes/hero/hero-2.webp"
  ],
  "description": "Local comercial 17 en Plaza Los Guayacanes, La Chorrera. 111.36 m² disponible. Depósito $556.80, Alquiler $595.77, Mantenimiento $222.72. Promoción: Cielo raso y cámara gratis.",
  "amenities": [
    "Seguridad 24/7 con CCTV",
    "Promoción: Cielo raso básico gratis",
    "Promoción: Cámara de seguridad gratis",
    "Alto flujo vehicular"
  ],
  "featured": false,
  "status": "available",
  "promociones": ["Cielo raso básico gratis", "Cámara de seguridad gratis"],
  "highlights": [
    "111.36 m²",
    "Venta $186,176 | Alquiler $596/mes"
  ]
}
```

---

### 4️⃣ AGREGAR - Plaza Sunset Strip (3 oficinas) ⭐

**Local 10 - Planta 00**
```json
{
  "id": 255,
  "title": "Plaza Sunset Strip - Local 10 Planta 00",
  "type": "Local",
  "category": "Comercial",
  "operation": "Alquiler",
  "price": 0,
  "pricePerMonth": 2000,
  "location": "Vía Israel, San Francisco, Ciudad de Panamá",
  "city": "Ciudad de Panamá",
  "district": "San Francisco",
  "bedrooms": 0,
  "bathrooms": 1,
  "parkingSpots": 0,
  "area": 78,
  "builtYear": 2024,
  "mantenimiento": 117,
  "image": "/images/properties/sunset-strip/hero/fachada-frontal-strip-mall.webp",
  "images": [
    "/images/properties/sunset-strip/hero/fachada-frontal-strip-mall.webp",
    "/images/properties/sunset-strip/gallery/pasillo-comercial-interior.webp"
  ],
  "description": "Local 10 en Planta Baja de Plaza Sunset Strip, Vía Israel. 78 m² en ubicación premium con alto tráfico. Alquiler $2,000/mes + Mantenimiento $117/mes ($1.50/m²). ITBMS no incluido en precio.",
  "amenities": [
    "Ubicación premium Vía Israel",
    "Alto tráfico vehicular",
    "Diseño strip mall moderno",
    "Amplio estacionamiento",
    "Seguridad 24/7"
  ],
  "featured": true,
  "status": "available",
  "notaITBMS": "ITBMS no incluido",
  "highlights": [
    "78 m² en Vía Israel",
    "Alquiler $2,000/mes",
    "Planta Baja con alta visibilidad"
  ]
}
```

**Local 14 - Planta 00**
```json
{
  "id": 256,
  "title": "Plaza Sunset Strip - Local 14 Planta 00",
  "type": "Local",
  "category": "Comercial",
  "operation": "Alquiler",
  "price": 0,
  "pricePerMonth": 2300,
  "location": "Vía Israel, San Francisco, Ciudad de Panamá",
  "city": "Ciudad de Panamá",
  "district": "San Francisco",
  "bedrooms": 0,
  "bathrooms": 1,
  "parkingSpots": 0,
  "area": 89,
  "builtYear": 2024,
  "mantenimiento": 133.5,
  "image": "/images/properties/sunset-strip/hero/fachada-principal-via-israel.webp",
  "images": [
    "/images/properties/sunset-strip/hero/fachada-principal-via-israel.webp",
    "/images/properties/sunset-strip/gallery/pasillo-comercial-interior.webp"
  ],
  "description": "Local 14 en Planta Baja de Plaza Sunset Strip, Vía Israel. 89 m² en zona comercial premium. Alquiler $2,300/mes + Mantenimiento $133.50/mes ($1.50/m²). ITBMS no incluido.",
  "amenities": [
    "Ubicación premium Vía Israel",
    "Alto tráfico vehicular",
    "Diseño strip mall moderno",
    "Amplio estacionamiento",
    "Seguridad 24/7"
  ],
  "featured": true,
  "status": "available",
  "notaITBMS": "ITBMS no incluido",
  "highlights": [
    "89 m² en Vía Israel",
    "Alquiler $2,300/mes",
    "Planta Baja premium"
  ]
}
```

**Local 109 - Nivel 100**
```json
{
  "id": 257,
  "title": "Plaza Sunset Strip - Local 109 Nivel 100",
  "type": "Local",
  "category": "Comercial",
  "operation": "Alquiler",
  "price": 0,
  "pricePerMonth": 1800,
  "location": "Vía Israel, San Francisco, Ciudad de Panamá",
  "city": "Ciudad de Panamá",
  "district": "San Francisco",
  "bedrooms": 0,
  "bathrooms": 1,
  "parkingSpots": 0,
  "area": 162,
  "builtYear": 2024,
  "mantenimiento": 324,
  "image": "/images/properties/sunset-strip/gallery/lobby-recepcion-cowork.webp",
  "images": [
    "/images/properties/sunset-strip/gallery/lobby-recepcion-cowork.webp",
    "/images/properties/sunset-strip/gallery/escaleras-electricas-lobby.webp"
  ],
  "description": "Local 109 en Nivel 100 de Plaza Sunset Strip, Vía Israel. 162 m² (84m² + 78m²) ideal para oficina o comercio. Alquiler $1,800/mes + Mantenimiento $324/mes ($2.00/m²). ITBMS no incluido.",
  "amenities": [
    "Ubicación Vía Israel",
    "162 m² amplios",
    "Diseño moderno",
    "Ascensores",
    "Seguridad 24/7"
  ],
  "featured": false,
  "status": "available",
  "notaITBMS": "ITBMS no incluido",
  "highlights": [
    "162 m² en Nivel 100",
    "Alquiler $1,800/mes",
    "Ideal oficina o comercio"
  ]
}
```

---

### 5️⃣ AGREGAR - New West Costa Verde (5 modelos de casas) ⭐ NUEVO PROYECTO

**Modelo Nevada - 3 rec, $240,000**
```json
{
  "id": 258,
  "title": "New West Costa Verde - Modelo Nevada (Entrega Inmediata)",
  "type": "Casa",
  "category": "Residencial",
  "operation": "Venta",
  "price": 240000,
  "pricePerMonth": null,
  "location": "Costa Verde, Panamá Oeste",
  "city": "Panamá Oeste",
  "district": "Costa Verde",
  "bedrooms": 3,
  "bathrooms": 2.5,
  "parkingSpots": 2,
  "area": 167,
  "builtYear": 2026,
  "lote": 180,
  "image": "/images/properties/new-west/modelo-nevada.webp",
  "images": [
    "/images/properties/new-west/modelo-nevada.webp"
  ],
  "description": "Casa modelo Nevada en New West I Costa Verde. 2 plantas, 3 recámaras, 167 m² de construcción. Lotes desde 180 m². Conjunto residencial de 140 casas con área social independiente. Entrega inmediata con 10% de abono inicial. Aplica con ingreso familiar de $3,500. Se trabaja con todos los bancos.",
  "amenities": [
    "Conjunto residencial 140 casas",
    "Área social independiente",
    "Seguridad 24/7",
    "Parque infantil",
    "Áreas verdes",
    "Garita de acceso",
     "Canchas deportivas",
    "Salón de eventos"
  ],
  "featured": true,
  "status": "available",
  "fechaEntrega": "inmediata",
  "abonoInicial": "10%",
  "trabajaBancos": true,
  "minIncome": 3500,
  "highlights": [
    "167 m² - 3 recámaras - 2 plantas",
    "Entrega inmediata",
    "Lotes desde 180 m²",
    "10% abono inicial - Trabaja con todos los bancos"
  ]
}
```

**Modelo Ilana - 3 rec, $180,000**
```json
{
  "id": 259,
  "title": "New West Costa Verde - Modelo Ilana",
  "type": "Casa",
  "category": "Residencial",
  "operation": "Venta",
  "price": 180000,
  "pricePerMonth": null,
  "location": "Costa Verde, Panamá Oeste",
  "city": "Panamá Oeste",
  "district": "Costa Verde",
  "bedrooms": 3,
  "bathrooms": 2.5,
  "parkingSpots": 2,
  "area": 137,
  "builtYear": 2026,
  "lote": 180,
  "image": "/images/properties/new-west/modelo-ilana.webp",
  "images": [
    "/images/properties/new-west/modelo-ilana.webp"
  ],
  "description": "Casa modelo Ilana en New West I Costa Verde. 2 plantas, 3 recámaras, 137 m² de construcción. Lote 180 m². Conjunto residencial con amenidades completas. Aplica con ingreso familiar de $3,500.",
  "amenities": [
    "Conjunto residencial 140 casas",
    "Área social independiente",
    "Seguridad 24/7",
    "Parque infantil"
  ],
  "featured": false,
  "status": "available",
  "trabajaBancos": true,
  "minIncome": 3500,
  "highlights": [
    "137 m² - 3 recámaras",
    "Precio $180,000",
    "Lote 180 m²"
  ]
}
```

**Modelo Jazmin - 3 rec, $220,000**
```json
{
  "id": 260,
  "title": "New West Costa Verde - Modelo Jazmin",
  "type": "Casa",
  "category": "Residencial",
  "operation": "Venta",
  "price": 220000,
  "pricePerMonth": null,
  "location": "Costa Verde, Panamá Oeste",
  "city": "Panamá Oeste",
  "district": "Costa Verde",
  "bedrooms": 3,
  "bathrooms": 2.5,
  "parkingSpots": 2,
  "area": 157,
  "builtYear": 2026,
  "lote": 180,
  "image": "/images/properties/new-west/modelo-jazmin.webp",
  "images": [
    "/images/properties/new-west/modelo-jazmin.webp"
  ],
  "description": "Casa modelo Jazmin en New West I Costa Verde. 2 plantas, 3 recámaras, 157 m² de construcción. Lotes desde 180 m². Aplica con ingreso familiar de $3,500.",
  "amenities": [
    "Conjunto residencial 140 casas",
    "Área social independiente",
    "Seguridad 24/7"
  ],
  "featured": false,
  "status": "available",
  "trabajaBancos": true,
  "minIncome": 3500,
  "highlights": [
    "157 m² - 3 recámaras",
    "Precio $220,000"
  ]
}
```

**Modelo Cedro - 2 rec, $150,000 (ENTREGA INMEDIATA)**
```json
{
  "id": 261,
  "title": "New West Costa Verde - Modelo Cedro (Entrega Inmediata)",
  "type": "Casa",
  "category": "Residencial",
  "operation": "Venta",
  "price": 150000,
  "pricePerMonth": null,
  "location": "Costa Verde, Panamá Oeste",
  "city": "Panamá Oeste",
  "district": "Costa Verde",
  "bedrooms": 2,
  "bathrooms": 2,
  "parkingSpots": 2,
  "area": 122,
  "builtYear": 2026,
  "lote": 200,
  "image": "/images/properties/new-west/modelo-cedro.webp",
  "images": [
    "/images/properties/new-west/modelo-cedro.webp"
  ],
  "description": "Casa modelo Cedro en New West II Costa Verde. 1 planta, 2 recámaras, 122 m² de construcción. Lote 200 m². Casa unifamiliar con área social independiente. Entrega inmediata con 10% de abono inicial. Aplica con ingreso familiar de $3,500.",
  "amenities": [
    "Casa unifamiliar 1 planta",
    "Área social independiente",
    "Seguridad 24/7",
    "Parque infantil"
  ],
  "featured": true,
  "status": "available",
  "fechaEntrega": "inmediata",
  "abonoInicial": "10%",
  "trabajaBancos": true,
  "minIncome": 3500,
  "highlights": [
    "122 m² - 2 recámaras - 1 planta",
    "Entrega inmediata",
    "Lote 200 m²",
    "Desde $150,000"
  ]
}
```

**Modelo Roble - 3 rec, $150,000**
```json
{
  "id": 262,
  "title": "New West Costa Verde - Modelo Roble",
  "type": "Casa",
  "category": "Residencial",
  "operation": "Venta",
  "price": 150000,
  "pricePerMonth": null,
  "location": "Costa Verde, Panamá Oeste",
  "city": "Panamá Oeste",
  "district": "Costa Verde",
  "bedrooms": 3,
  "bathrooms": 2,
  "parkingSpots": 2,
  "area": 122,
  "builtYear": 2026,
  "lote": 220,
  "image": "/images/properties/new-west/modelo-roble.webp",
  "images": [
    "/images/properties/new-west/modelo-roble.webp"
  ],
  "description": "Casa modelo Roble en New West II Costa Verde. 1 planta, 3 recámaras, 122 m² de construcción. Lotes desde 220 m². Opción de 2 ó 3 recámaras. Aplica con ingreso familiar de $3,500.",
  "amenities": [
    "Casa unifamiliar 1 planta",
    "Área social independiente",
    "Seguridad 24/7"
  ],
  "featured": false,
  "status": "available",
  "trabajaBancos": true,
  "minIncome": 3500,
  "highlights": [
    "122 m² - 3 recámaras - 1 planta",
    "Lote desde 220 m²",
    "Precio $150,000"
  ]
}
```

---

### 6️⃣ CORRECCIÓN - Central Plaza

**ID: 2** (Central Plaza)
```json
"district": "La Chorrera",  // Cambiar de "Arraiján" a "La Chorrera"
"status": "rented",         // Cambiar de "available" a "rented"
"description": "Central Plaza La Chorrera. 42 locales comerciales actualmente ocupados al 100%. Proyecto administrado por SOMOS Properties."
```

---

## ✅ RESUMEN DE CAMBIOS

**Total de propiedades agregadas:** 18  
**Total de precios actualizados:** 2  
**Total de correcciones:** 1  

### Nuevas Propiedades por Proyecto:
- ✅ The Tower Residences: +2 apartamentos
- ✅ Plaza Los Guayacanes: +5 locales
- ✅ Plaza Sunset Strip: +3 oficinas
- ✅ New West Costa Verde: +5 modelos de casas
- ✅ Balboa Boutiques: +1 local (A-104 ya existía)
- ✅ Rali Business Center: +6 oficinas (pendiente - ver documento principal)

### Cambios en Precios:
- ✅ The Towers Business Plaza Local 2A: $6,378 → $7,276
- ✅ The Towers Business Plaza Planta Baja: $4,000 → $4,280

### Correcciones:
- ✅ Central Plaza: Distrito corregido, marcado como ocupado

---

## 📝 NOTAS IMPORTANTES

1. **Imágenes:** Las rutas de imágenes son placeholders. Deberán solicitarse fotos reales de:
   - New West Costa Verde (5 modelos)
   - Locales individuales de Plaza Los Guayacanes
   - Sunset Strip (locales específicos)

2. **IDs:** Continúan desde 248 en adelante para evitar duplicados

3. **Campos nuevos agregados:**
   - `deposito`: Depósito de garantía
   - `mantenimiento`: Costo mensual de mantenimiento
   - `promociones`: Array de promociones activas
   - `fechaEntrega`: "inmediata" o fecha específica
   - `abonoInicial`: Porcentaje de abono inicial
   - `trabajaBancos`: Boolean si acepta financiamiento
   - `notaITBMS`: Nota sobre impuestos
   - `lote`: Tamaño del lote en m² (para casas)

4. **Inversión de tiempo estimada:**
   - Copiar y pegar cambios: 30-45 minutos
   - Solicitar y agregar imágenes: 2-3 horas
   - Testing completo: 1 hora
   - **Total:** 4-5 horas de trabajo

---

*Guía de implementación rápida*  
*Generado: 30 de Marzo 2026*
