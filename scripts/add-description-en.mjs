/**
 * P5 — Add description_en to all properties in properties.json
 * Translations authored manually. Run once with: node scripts/add-description-en.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const FILE = resolve(__dirname, '../data/properties.json')

// Map of id → English description
const translations = {
  23:  'Pacific Point Torre 400 — luxury apartments in Punta Pacífica. Generous floor plans, ocean views, 3 m ceiling height and premium finishes. Estimated delivery 2025.',
  236: 'Pacific Point Torre 400 — luxury apartments in Punta Pacífica. Generous floor plans, ocean views, 3 m ceiling height and premium finishes. Estimated delivery 2025.',
  237: 'Pacific Point Torre 400 in Punta Pacífica. Apartment for rent: 305 m², 3 bedrooms and 3.5 bathrooms. Appliances and A/C included. Monthly rent: $5,750.',

  1:   'Apartment 3-B in Tower 500 at Kings Park, Condado del Rey. 155.70 m² with 4 bedrooms and 4½ bathrooms. Sale price $280,000, HOA $295.83/month. Includes full appliances, Smart Home system and 2 parking spaces.',
  238: 'Apartment 10-B in Tower 500 at Kings Park, Condado del Rey. 155.70 m² with 4 bedrooms and 5½ bathrooms. Sale price $280,000, HOA $295.83/month. Includes 2 parking spaces + 1 storage unit. Full appliances and Smart Home system.',

  2:   'Central Plaza offers two levels with 42 commercial spaces in various sizes, ideal for any business. Restaurants, game zone, gym, banks, hardware store, beauty salon, shipping services and more. 70 parking spaces with access from Av. Juan Demóstenes Arosemena and Av. Omar Torrijos.',

  25:  'Your new home awaits in the heart of Panama West. Roble model at Praderas de Arraiján: 3-bedroom single-family home, 84 m², with flexible financing plans. Minimum household income $1,500. 3D virtual tour available.',
  239: 'Your first major investment starts here. 2-bedroom model at Praderas de Arraiján. Direct access to Metro Line 3, Pumptrack, pools, gym and mini golf. Minimum household income $1,300. 3D virtual tour available.',
  240: 'Optimize your lifestyle in this exclusive duplex at Praderas de Arraiján. 2 levels, 3 bedrooms, 90 m², 2 covered parking spaces. Metro Line 3 connectivity. Minimum household income $1,500.',
  241: '3-bedroom duplex (Stage 1, House 272) at Praderas de Arraiján. 2 levels, 90 m², 2 covered parking spaces. Financing plans available.',
  243: '3-bedroom duplex (Stage 1, House 287) at Praderas de Arraiján. 2 levels, 90 m², 2 covered parking spaces. Financing plans available.',
  244: '2-bedroom single-family home (Stage 2, House 189) at Praderas de Arraiján. Single level, 80 m². Financing plans available.',
  245: '2-bedroom single-family home (Stage 2, House 192) at Praderas de Arraiján. Single level, 80 m². Financing plans available.',
  246: 'Single-level home (Stage 3, House 198) at Praderas de Arraiján. 3 bedrooms, 80 m². Covered parking. Financing plans available.',
  247: '3-bedroom duplex (Stage 4 New, House 29) at Praderas de Arraiján. 2 levels, 90 m², 2 covered parking spaces. Financing plans available.',

  242: 'Commercial space for rent — The Towers Business Plaza, Ground Floor facing Calle 50. 235.82 m². Rent: $4,000/month + HOA $531/month.',
  26:  'Commercial space for rent — The Towers Business Plaza, Unit 2A Level 2 on Calle 50. 425.78 m². Rent: $6,378/month + HOA $958/month. Central duct A/C included.',
  268: 'Unit 4-A on Level 4 at The Towers Business Plaza, San Francisco. 425.78 m². Sale: $1,105,000 | Rent: $7,276/month + deposit $6,800. HOA $958/month. Minimum 2-year lease with 2 months grace period.',
  269: 'Ground-floor unit facing the street at The Towers Business Plaza, San Francisco. Total 235.82 m² (GF: 118.26 m², Mezzanine: 87.39 m², Terrace: 30.17 m²). Sale: $707,460 | Rent: $4,280/month + deposit $4,000. HOA $531/month.',
  27:  'Offices at The Tower Business Calle 50. Currently at full occupancy. Shown for portfolio reference.',

  270: 'The Towers Residences — Apartment 31 B in Tower 100, 272.50 m² of absolute luxury. 3 bedrooms, 4 bathrooms, covered terrace, 2 VIP parking spaces. Price: $480,000. HOA: $4,981/month.',
  29:  'The Towers Residences — Apartment 28 B in Tower 100, 272.50 m². 3 bedrooms, 4 luxury bathrooms, gourmet kitchen. Price: $500,000. HOA: $4,981/month.',
  30:  'Apartment 29 B at The Towers Residences, San Francisco. 272.50 m² with luxury finishes. Double-height living room, Italian kitchen, panoramic terrace. Price: $480,000. HOA: $545/month.',
  248: 'The Towers Residences — Apartment 18 C in Tower 100, 188.26 m². Sale price $400,000. Monthly HOA $375.52.',
  249: 'The Towers Residences — Apartment 23 C in Tower 100, 188.26 m². Currently rented until 2027. Sale price $400,000. Monthly HOA $375.52.',

  31:  "Plaza Los Guayacanes: La Chorrera's new commercial center. 42 commercial spaces across 2 levels. Units from 40 m² to 150+ m². High vehicle traffic, easy access from the Pan-American Highway.",

  32:  'Unit A-104 at Balboa Boutiques, mezzanine 100. 84 m² enclosed + 67 m² terrace (151 m² total). Rent $4,375/month. 2 months grace period. HOA $4.50/m² ($316/month).',
  132: 'Unit A-108 at Balboa Boutiques, mezzanine 100. 74 m² enclosed + 37 m² terrace (111 m² total). Rent $3,200/month. HOA $4.50/m² ($269/month).',
  133: 'Unit A-109 at Balboa Boutiques, mezzanine 100. 318 m² open space; ideal for large restaurant, boutique gym or showroom. Rent $6,360/month. HOA $4.50/m² ($1,272/month).',
  134: 'Unit B-102/202 at Balboa Boutiques, mezzanine 100. 360 m²; perfect for anchor tenant, premium gym or flagship restaurant. Rent $9,000/month. HOA $4.50/m² ($1,356/month).',
  263: 'Unit A-106 at Balboa Boutiques. 147 m² (79 m² enclosed + 68 m² terrace). Rent $3,700/month. Tourist zone near Calzada de Amador.',

  33:  'Sunset Strip: modern strip-mall development on Vía Israel. Spaces from 70 m² with maximum visibility, front parking and high vehicle traffic.',
  271: 'Unit 409 at Sunset Strip (Level 400), 38 m². Rent $700/month. Upper level with visibility over Vía Israel, ideal for boutique offices or professional services.',
  141: 'Unit 11 at Sunset Strip (Ground Floor), 79 m². Rent $2,000/month + HOA $2.00/m². Pedestrian-facing frontage, ideal for retail or high-traffic services.',
  146: 'Unit 10 at Sunset Strip (Ground Floor), 78 m². Rent $2,000/month + HOA $1.50/m² ($117/month). 1 hour free parking. Tax not included.',
  147: 'Unit 14 at Sunset Strip (Ground Floor), 89 m². Rent $2,300/month + HOA $1.50/m² ($133.50/month). 1 hour free parking. Tax not included.',
  148: 'Unit 109 at Sunset Strip (Level 100), 162 m² (84 m² + 78 m²). Rent $1,800/month + HOA $2.00/m² ($324/month). Ideal for gym, showroom or restaurant. Tax not included.',
  142: 'Unit 25 at Sunset Strip (Ground Floor), 114 m². Rent $3,500/month + HOA $2.00/m². Perfect for casual restaurant, pharmacy or anchor store.',
  143: 'Unit 26 at Sunset Strip (Ground Floor), 69 m² + 29 m² terrace (98 m² total). Rent $2,200/month + HOA $2.00/m². Front terrace for outdoor seating, ideal for café or quick-service concept.',
  144: 'Unit 134 at Sunset Strip (Mezzanine 100), 47 m². Rent $940/month + HOA $1.50/m². Ideal for medical office, showroom or service office.',
  145: 'Office 206 at Sunset Strip (Level 200), 57 m². Rent $1,200/month + HOA $1.50/m². Efficient layout with views towards Vía Israel.',
  255: 'Unit 10 at Plaza Sunset Strip Ground Floor, Vía Israel. 78 m². Rent $2,000/month + HOA $117/month ($1.50/m²). Tax not included.',
  256: 'Unit 14 at Plaza Sunset Strip Ground Floor, Vía Israel. 89 m². Rent $2,300/month + HOA $133.50/month ($1.50/m²). Tax not included.',
  257: 'Unit 109 at Plaza Sunset Strip Level 100, Vía Israel. 162 m² (84 m² + 78 m²). Rent $1,800/month + HOA $324/month ($2.00/m²). Tax not included.',

  34:  'Evolution Tower: cutting-edge residential project in Panama City. Units with 1–3 bedrooms from 55 m². Infinity pool, gym, co-working lounge and 24/7 security.',
  150: 'Corporate office at Evolution Tower (Calle 50). Currently at full occupancy; shown for portfolio reference and waitlist.',
  151: 'Corporate office at Evolution Tower (Calle 50). Currently at full occupancy; shown for portfolio reference and waitlist.',
  152: 'Corporate office at Evolution Tower (Calle 50). Currently at full occupancy; shown for portfolio reference and waitlist.',
  153: 'Corporate office at Evolution Tower (Calle 50). Currently at full occupancy; shown for portfolio reference and waitlist.',
  154: 'Corporate office at Evolution Tower (Calle 50). Currently at full occupancy; shown for portfolio reference and waitlist.',
  155: 'Corporate office at Evolution Tower (Calle 50). Currently at full occupancy; shown for portfolio reference and waitlist.',
  156: 'Corporate office at Evolution Tower (Calle 50). Currently at full occupancy; shown for portfolio reference and waitlist.',
  157: 'Corporate office at Evolution Tower (Calle 50). Currently at full occupancy; shown for portfolio reference and waitlist.',
  158: 'Corporate office at Evolution Tower (Calle 50). Currently at full occupancy; shown for portfolio reference and waitlist.',
  159: 'Corporate office at Evolution Tower (Calle 50). Currently at full occupancy; shown for portfolio reference and waitlist.',
  160: 'Corporate office at Evolution Tower (Calle 50). Currently at full occupancy; shown for portfolio reference and waitlist.',

  39:  'Tower A Floor 2 — Office 228 at Rali Business Center, 22.00 m². Rent $802.50/month (tax included). Ready to move in on Avenida Balboa with executive lobby, central A/C and 24/7 security.',
  40:  'Tower A Floor 2 — Office 231 at Rali Business Center, 28.00 m². Rent $1,070.00/month (tax included). Ready to move in on Avenida Balboa with executive lobby, central A/C and 24/7 security.',
  41:  'Tower A Floor 2 — Office 244 at Rali Business Center, 38.00 m². Rent $1,284.00/month (tax included). Ready to move in on Avenida Balboa with executive lobby, central A/C and 24/7 security.',
  42:  'Tower B Floor 8 — Office 802 at Rali Business Center, 52.64 m². Rent $1,284.00/month (tax included). Ready to move in on Avenida Balboa with executive lobby, central A/C and 24/7 security.',
  43:  'Tower B Floor 8 — Office 806 at Rali Business Center, 71.99 m². Rent $1,551.00/month (tax included). Ready to move in on Avenida Balboa with executive lobby, central A/C and 24/7 security.',
  44:  'Tower B Floor 8 — Office 810 at Rali Business Center, 75.77 m². Rent $1,605.00/month (tax included). Ready to move in on Avenida Balboa with executive lobby, central A/C and 24/7 security.',
  45:  'Tower B Floor 8 — Office 826 at Rali Business Center, 79.82 m². Rent $1,712.00/month (tax included). Ready to move in on Avenida Balboa with executive lobby, central A/C and 24/7 security.',

  135: 'Boulevard Plaza in Costa Verde (La Chorrera): established strip mall at full occupancy. Shown to demonstrate management experience in fully-leased retail properties.',
  161: 'Commercial space at Boulevard Costa Verde (La Chorrera). Project at full occupancy; shown for waitlist and commercial management purposes.',
  162: 'Commercial space at Boulevard Costa Verde (La Chorrera). Project at full occupancy; shown for waitlist and commercial management purposes.',

  136: 'Unit 3 at Plaza Los Guayacanes (Vía Las Mendozas, La Chorrera). 132.93 m² single level. Rent $711.17/month. Sale: $212,688. Minimum 1-year lease with 2 months grace period.',
  137: 'Unit 4 at Plaza Los Guayacanes (Vía Las Mendozas, La Chorrera). 134.9 m² single level. Rent $721.71/month. Minimum 1-year lease with 2 months grace period to fit out.',
  138: 'Unit 9 at Plaza Los Guayacanes (Vía Las Mendozas, La Chorrera). 305.9 m² single level. Rent $1,636.56/month. Sale: $489,440. Minimum 1-year lease with 2 months grace period.',
  139: 'Unit 17 at Plaza Los Guayacanes (Vía Las Mendozas, La Chorrera). 111.36 m² single level. Rent $595.77/month. Sale: $186,176. Minimum 1-year lease with 2 months grace period.',
  140: 'Unit 16 at Plaza Los Guayacanes (Vía Las Mendozas, La Chorrera). 76.74 m² single level. Rent $410.55/month. Sale: $122,784. Promotion: basic ceiling and security camera included.',
  251: 'Commercial unit 5 at Plaza Los Guayacanes, La Chorrera. 65.63 m². Rent $351.12/month. Sale: $105,008. Promotion: basic ceiling and security camera included.',

  // New West Costa Verde
  258: 'Nevada model home at New West I Costa Verde. 2 levels, 3 bedrooms, 167 m². Immediate delivery, 10% down payment. Minimum household income $3,500.',
  259: 'Ilana model home at New West I Costa Verde. 2 levels, 3 bedrooms, 137 m². 180 m² lot. Minimum household income $3,500.',
  260: 'Jasmine model home at New West I Costa Verde. 2 levels, 3 bedrooms, 157 m². Lots from 180 m². Minimum household income $3,500.',
  261: 'Cedro model — single-level home with optimized design at New West II Costa Verde. Open kitchen integrated with the social area. Immediate delivery.',
  262: 'Roble model — single-level home at New West II Costa Verde. Spacious living-dining area and covered terrace.',

  // Playa Escondida — Torre 100
  164: 'Unit 1201 in Tower 100 at Playa Escondida. 263.36 m², Lake & Ocean View. Layout: 4 bedrooms + service room. Sale price: $912,542.',
  165: 'Unit 1202 in Tower 100 at Playa Escondida. 148.75 m², Ocean View. Layout: 2 bedrooms + den + service room. Sale price: $624,750.',
  166: 'Unit 1203 in Tower 100 at Playa Escondida. 260.83 m², Lake & Ocean View. Layout: 4 bedrooms + service room. Sale price: $903,776.',
  167: 'Unit 1101 in Tower 100 at Playa Escondida. 263.36 m², Lake & Ocean View. Layout: 4 bedrooms + service room. Sale price: $912,542.',
  168: 'Unit 1103 in Tower 100 at Playa Escondida. 260.83 m², Lake & Ocean View. Layout: 4 bedrooms + service room. Sale price: $903,776.',
  169: 'Unit 1005 in Tower 100 at Playa Escondida. 127.88 m², Lake View. Layout: 2 bedrooms. Sale price: $402,570.',
  170: 'Unit 1002 in Tower 100 at Playa Escondida. 199.70 m², Ocean View. Layout: 3 bedrooms + service room. Sale price: $670,992.',
  171: 'Unit 1004 in Tower 100 at Playa Escondida. 199.91 m², Lake & Ocean View. Layout: 3 bedrooms + service room. Sale price: $671,698.',
  172: 'Unit 905 in Tower 100 at Playa Escondida. 214.71 m², Ocean View. Layout: 3 bedrooms + den + service room. Sale price: $721,426.',
  173: 'Unit 601 in Tower 100 at Playa Escondida. 133.91 m², Lake View. Layout: 2 bedrooms + service room. Sale price: $421,817.',
  174: 'Unit 606 in Tower 100 at Playa Escondida. 126.48 m², Lake View. Layout: 2 bedrooms. Sale price: $398,412.',
  175: 'Unit 603 in Tower 100 at Playa Escondida. 143.78 m², Ocean View. Layout: 2 bedrooms + den + service room. Sale price: $543,488.',
  176: 'Unit 501 in Tower 100 at Playa Escondida. 152.58 m², Lake View. Layout: 3 bedrooms + service room. Sale price: $480,627.',
  177: 'Unit 503 in Tower 100 at Playa Escondida. 143.78 m², Ocean View. Layout: 2 bedrooms + den + service room. Sale price: $543,488.',
  178: 'Unit 504 in Tower 100 at Playa Escondida. 143.78 m², Ocean View. Layout: 2 bedrooms + den + service room. Sale price: $543,488.',
  179: 'Unit 505 in Tower 100 at Playa Escondida. 178.80 m², Lake & Ocean View. Layout: 3 bedrooms + service room. Sale price: $600,768.',
  180: 'Unit 401 in Tower 100 at Playa Escondida. 152.58 m², Lake View. Layout: 4 bedrooms. Sale price: $480,627.',
  181: 'Unit 406 in Tower 100 at Playa Escondida. 137.03 m², Lake View. Layout: 3 bedrooms. Sale price: $431,645.',
  182: 'Unit 402 in Tower 100 at Playa Escondida. 183.76 m², Ocean View. Layout: 3 bedrooms + service room. Sale price: $617,434.',
  183: 'Unit 403 in Tower 100 at Playa Escondida. 143.78 m², Ocean View. Layout: 2 bedrooms + den + service room. Sale price: $543,488.',
  184: 'Unit 404 in Tower 100 at Playa Escondida. 143.78 m², Ocean View. Layout: 2 bedrooms + den + service room. Sale price: $543,488.',
  185: 'Unit 301 in Tower 100 at Playa Escondida. 152.58 m², Lake View. Layout: 3 bedrooms + service room. Sale price: $480,627.',
  186: 'Unit 306 in Tower 100 at Playa Escondida. 137.03 m², Lake View. Layout: 3 bedrooms. Sale price: $431,645.',
  187: 'Unit 302 in Tower 100 at Playa Escondida. 183.76 m², Ocean View. Layout: 3 bedrooms + service room. Sale price: $617,434.',
  188: 'Unit 303 in Tower 100 at Playa Escondida. 143.73 m², Ocean View. Layout: 2 bedrooms + den + service room. Sale price: $543,299.',
  189: 'Unit 304 in Tower 100 at Playa Escondida. 143.78 m², Ocean View. Layout: 2 bedrooms + den + service room. Sale price: $543,488.',
  190: 'Unit 305 in Tower 100 at Playa Escondida. 178.80 m², Lake & Ocean View. Layout: 3 bedrooms + service room. Sale price: $600,768.',
  191: 'Unit 201 in Tower 100 at Playa Escondida. 152.60 m², Lake View. Layout: 3 bedrooms + service room. Sale price: $480,690.',
  192: 'Unit 206 in Tower 100 at Playa Escondida. 137.03 m², Lake View. Layout: 3 bedrooms. Sale price: $431,645.',
  193: 'Unit 202 in Tower 100 at Playa Escondida. 183.76 m², Ocean View. Layout: 3 bedrooms + service room. Sale price: $617,434.',
  194: 'Unit 203 in Tower 100 at Playa Escondida. 143.78 m², Ocean View. Layout: 2 bedrooms + den + service room. Sale price: $543,488.',
  195: 'Unit 204 in Tower 100 at Playa Escondida. 143.78 m², Ocean View. Layout: 2 bedrooms + den + service room. Sale price: $543,488.',
  196: 'Unit 205 in Tower 100 at Playa Escondida. 178.80 m², Lake & Ocean View. Layout: 3 bedrooms + service room. Sale price: $600,768.',
  197: 'Unit 101 in Tower 100 at Playa Escondida. 434.50 m², Lake & Ocean View. Layout: 4 bedrooms + den + service room. Sale price: $1,417,500.',
  198: 'Unit 102 in Tower 100 at Playa Escondida. 510.97 m², Lake & Ocean View. Layout: 5 bedrooms + den + service room. Sale price: $1,470,000.',

  // Playa Escondida — Torre 90
  199: 'Unit 1203 in Tower 90 at Playa Escondida. 260.83 m², Lake & Ocean View. Layout: 4 bedrooms + service room. Sale price: $860,739.',
  200: 'Unit 1101 in Tower 90 at Playa Escondida. 263.36 m², Lake & Ocean View. Layout: 4 bedrooms + service room. Sale price: $869,088.',
  201: 'Unit 1103 in Tower 90 at Playa Escondida. 260.83 m², Lake & Ocean View. Layout: 4 bedrooms + service room. Sale price: $860,739.',
  202: 'Unit 1001 in Tower 90 at Playa Escondida. 338.27 m², Lake & Ocean View. Layout: 4 bedrooms + service room. Sale price: $1,116,291.',
  203: 'Unit 1003 in Tower 90 at Playa Escondida. 335.52 m², Lake & Ocean View. Layout: 4 bedrooms + service room. Sale price: $1,107,216.',
  204: 'Unit 801 in Tower 90 at Playa Escondida. 150.48 m², Lake View. Layout: 3 bedrooms + service room. Sale price: $451,440.',
  205: 'Unit 701 in Tower 90 at Playa Escondida. 150.48 m², Lake View. Layout: 3 bedrooms + service room. Sale price: $451,440.',
  206: 'Unit 606 in Tower 90 at Playa Escondida. 126.48 m², Lake View. Layout: 2 bedrooms. Sale price: $379,440.',
  207: 'Unit 501 in Tower 90 at Playa Escondida. 152.58 m², Lake View. Layout: 3 bedrooms + service room. Sale price: $457,740.',
  208: 'Unit 401 in Tower 90 at Playa Escondida. 152.58 m², Lake View. Layout: 4 bedrooms. Sale price: $457,740.',
  209: 'Unit 306 in Tower 90 at Playa Escondida. 137.03 m², Lake View. Layout: 3 bedrooms. Sale price: $411,090.',
  210: 'Unit 206 in Tower 90 at Playa Escondida. 137.03 m², Lake View. Layout: 3 bedrooms. Sale price: $411,090.',
  211: 'Unit 101 in Tower 90 at Playa Escondida. 434.50 m², Lake & Ocean View. Layout: 4 bedrooms + den + service room. Sale price: $1,350,000.',
  212: 'Unit 102 in Tower 90 at Playa Escondida. 510.97 m², Lake & Ocean View. Layout: 5 bedrooms + den + service room. Sale price: $1,400,000.',

  // Playa Escondida — Torre 80
  229: 'Unit 1001 in Tower 80 at Playa Escondida. 338.27 m², Lake & Ocean View. Layout: 4 bedrooms + service room. Sale price: $911,400.',
  230: 'Unit 206 in Tower 80 at Playa Escondida. 137.03 m², Lake View. Layout: 3 bedrooms. Sale price: $423,423.',
  231: 'Unit 306 in Tower 80 at Playa Escondida. 137.03 m², Lake View. Layout: 3 bedrooms. Sale price: $423,423.',

  // Playa Escondida — Arenas Village Villas
  213: 'Villa 701 at Arenas Village (lower level). 300.00 m², layout: 4 bedrooms + den + pool. Sale price: $1,300,000.',
  214: 'Villa 703 at Arenas Village (upper level). 290.00 m², layout: 4 bedrooms + den + pool. Sale price: $1,170,000.',
  215: 'Villa 704 at Arenas Village (upper level). 290.00 m², layout: 4 bedrooms + den + pool. Sale price: $1,170,000.',
  216: 'Villa 902 at Arenas Village (lower level). 300.00 m², layout: 4 bedrooms + den + pool. Sale price: $1,300,000.',
  217: 'Villa 903 at Arenas Village (upper level). 290.00 m², layout: 4 bedrooms + den + pool. Sale price: $1,170,000.',
  218: 'Villa 904 at Arenas Village (upper level). 290.00 m², layout: 4 bedrooms + den + pool. Sale price: $1,170,000.',
  219: 'Villa 1001 at Arenas Village (lower level). 300.00 m², layout: 4 bedrooms + den + pool. Sale price: $1,300,000.',
  220: 'Villa 1002 at Arenas Village (lower level). 300.00 m², layout: 4 bedrooms + den + pool. Sale price: $1,300,000.',
  221: 'Villa 1003 at Arenas Village (upper level). 290.00 m², layout: 4 bedrooms + den + pool. Sale price: $1,170,000.',
  222: 'Villa 1004 at Arenas Village (upper level). 290.00 m², layout: 4 bedrooms + den + pool. Sale price: $1,170,000.',
  223: 'Villa 1101 at Arenas Village (lower level). 300.00 m², layout: 4 bedrooms + den + pool. Sale price: $1,300,000.',
  224: 'Villa 1102 at Arenas Village (lower level). 300.00 m², layout: 4 bedrooms + den + pool. Sale price: $1,300,000.',
  225: 'Villa 1103 at Arenas Village (upper level). 290.00 m², layout: 4 bedrooms + den + pool. Sale price: $1,170,000.',
  226: 'Villa 1104 at Arenas Village (upper level). 290.00 m², layout: 4 bedrooms + den + pool. Sale price: $1,170,000.',
  227: 'Villa 1203 at Arenas Village (upper level). 290.00 m², layout: 4 bedrooms + den + pool. Sale price: $1,170,000.',
  228: 'Villa 1304 at Arenas Village (upper level). 290.00 m², layout: 4 bedrooms + den + pool. Sale price: $1,170,000.',

  // Ocean View (San Francisco)
  264: 'Apartment 1103 at Ocean View (Tower 100). 260.83 m², 4 bedrooms + service room. Panoramic views in San Francisco. Price: $903,776.',
  265: 'Apartment 1202 at Ocean View (Tower 100). 148.75 m², 2 bedrooms + den + service room. Functional design in San Francisco. Price: $624,750.',
  266: 'Apartment 1002 at Ocean View (Tower 100). 194.71 m², 3 bedrooms + service room. City views in San Francisco. Price: $654,226.',
  267: 'Apartment 1004 at Ocean View (Tower 100). 111.45 m², 1 bedroom + den + service room. Ideal for investment or couples. Price: $421,281.',
}

// Read and parse
const raw = readFileSync(FILE, 'utf8')
const data = JSON.parse(raw)

let applied = 0
let skipped = 0

data.properties = data.properties.map(p => {
  const en = translations[p.id]
  if (!en) {
    skipped++
    return p
  }
  applied++
  return { ...p, description_en: en }
})

writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n', 'utf8')

console.log(`✓ Applied: ${applied} | Skipped (no translation): ${skipped}`)
console.log(`Total properties: ${data.properties.length}`)
