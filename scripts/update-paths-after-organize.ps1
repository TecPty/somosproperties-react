# Script para actualizar rutas en properties.json despues de organizar archivos
# Autor: GitHub Copilot
# Fecha: 2026-03-16

$jsonPath = "c:\Users\HP 15\somosproperties-react\data\properties.json"
$backupDir = "c:\Users\HP 15\somosproperties-react\backups"

# Crear backup
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupPath = Join-Path $backupDir "properties-organize-$timestamp.json"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
Copy-Item $jsonPath $backupPath -Force
Write-Host "Backup creado: $backupPath" -ForegroundColor Green

# Leer JSON
$jsonContent = Get-Content $jsonPath -Raw -Encoding UTF8
$originalLength = $jsonContent.Length

# Mapeo de archivos movidos (propiedad -> archivo -> carpeta destino)
$movements = @{
    "boulevard-plaza" = @{
        "hero-1.webp" = "hero"
        "hero-2.webp" = "hero"
        "hero-3.webp" = "hero"
        "hero-4.webp" = "hero"
        "hero-5.webp" = "hero"
        "hero-6.webp" = "hero"
    }
    "central-plaza" = @{
        "hero-1080.png" = "hero"
        "hero-1600.png" = "hero"
        "hero-500.png" = "hero"
        "hero-800.png" = "hero"
        "hero.png" = "hero"
    }
    "evolution-tower" = @{
        "co-working-1.webp" = "amenities"
        "co-working-2.webp" = "amenities"
        "co-working-3.webp" = "amenities"
        "cocina.webp" = "gallery"
        "comedor.webp" = "gallery"
        "escalera.webp" = "gallery"
        "evolution-tower-frontal-aereo.webp" = "hero"
        "evolution-tower-frontal.webp" = "hero"
        "gym.webp" = "amenities"
        "oficina.webp" = "gallery"
        "pasillo.webp" = "gallery"
        "piscina.webp" = "amenities"
        "recepcion.webp" = "gallery"
        "terraza.webp" = "amenities"
    }
    "kings-park" = @{
        "hero-full.png" = "hero"
        "hero.png" = "hero"
        "model-1080.jpeg" = "hero"
        "model-500.jpeg" = "hero"
        "model-800.jpeg" = "hero"
        "model.jpeg" = "hero"
        "plano-modelo-a.png" = "floorplans"
        "plano-modelo-b.png" = "floorplans"
    }
    "plaza-guayacanes" = @{
        "hero-1.webp" = "hero"
        "hero-2.webp" = "hero"
        "hero-3.webp" = "hero"
    }
    "rali" = @{
        "fachada-rali-avenida-balboa.webp" = "exterior"
        "fachada-rali-street-view.webp" = "exterior"
        "lobby-escaleras-anillo-luz.webp" = "gallery"
        "lounge-muro-verde.webp" = "gallery"
        "lounge-vista-mar.webp" = "gallery"
        "oficina-shell-38m2.webp" = "gallery"
        "oficina-shell-78m2.webp" = "gallery"
        "pasillo-acceso-glass.webp" = "gallery"
        "sala-juntas-ejecutiva.webp" = "gallery"
    }
    "sunset-strip" = @{
        "acceso-principal-estacionamiento.webp" = "exterior"
        "avenida-bella-vista-skyline.webp" = "exterior"
        "escaleras-electricas-lobby.webp" = "gallery"
        "fachada-costado-estacionamiento.webp" = "exterior"
        "fachada-frontal-strip-mall.webp" = "hero"
        "fachada-principal-via-israel.webp" = "hero"
        "fachada-torre-bella-vista.webp" = "hero"
        "lobby-recepcion-cowork.webp" = "gallery"
        "lobby-vidrio-acceso-locales.webp" = "gallery"
        "nivel-00.webp" = "floorplans"
        "nivel-100.webp" = "floorplans"
        "nivel-200.webp" = "floorplans"
        "pasillo-comercial-interior.webp" = "gallery"
        "terraza-externa-jardin.webp" = "amenities"
        "totem-sunset-strip-logo.webp" = "amenities"
    }
}

$replacements = 0

foreach ($property in $movements.Keys) {
    foreach ($fileName in $movements[$property].Keys) {
        $folder = $movements[$property][$fileName]
        
        # Patron: /images/properties/PROPERTY/FILENAME
        # Reemplazar por: /images/properties/PROPERTY/FOLDER/FILENAME
        $oldPath = "/images/properties/$property/$fileName"
        $newPath = "/images/properties/$property/$folder/$fileName"
        
        if ($jsonContent -match [regex]::Escape($oldPath)) {
            $jsonContent = $jsonContent -replace [regex]::Escape($oldPath), $newPath
            Write-Host "  $property/$fileName -> $folder/" -ForegroundColor Gray
            $replacements++
        }
    }
}

Write-Host ""
Write-Host "Total de rutas actualizadas: $replacements" -ForegroundColor Cyan

# Guardar JSON actualizado (manteniendo UTF-8 sin BOM)
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($jsonPath, $jsonContent, $utf8NoBom)

Write-Host "JSON actualizado correctamente" -ForegroundColor Green
Write-Host "Tamaño: $originalLength -> $($jsonContent.Length) bytes" -ForegroundColor Gray
