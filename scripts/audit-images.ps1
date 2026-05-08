# Script PowerShell para auditar imagenes de propiedades
# Genera un reporte detallado de imagenes faltantes

$propertiesJson = Get-Content "data/properties.json" -Raw | ConvertFrom-Json
$publicFolder = "public"
$missingImages = @()
$existingImages = @()
$totalProperties = $propertiesJson.properties.Count
$propertiesWithMissingImages = @()

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AUDITORIA DE IMAGENES - PROPIEDADES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Total de propiedades: $totalProperties" -ForegroundColor Yellow
Write-Host ""

foreach ($property in $propertiesJson.properties) {
    $propertyMissingImages = @()
    
    # Verificar imagen principal
    if ($property.image) {
        $imagePath = Join-Path $publicFolder $property.image.TrimStart('/')
        if (-Not (Test-Path $imagePath)) {
            $missingImages += [PSCustomObject]@{
                PropertyId = $property.id
                PropertyTitle = $property.title
                ImageType = "Principal"
                ImagePath = $property.image
            }
            $propertyMissingImages += "Principal: $($property.image)"
        } else {
            $existingImages += $imagePath
        }
    } else {
        $missingImages += [PSCustomObject]@{
            PropertyId = $property.id
            PropertyTitle = $property.title
            ImageType = "Principal (NO DEFINIDA)"
            ImagePath = "N/A"
        }
        $propertyMissingImages += "Principal: NO DEFINIDA"
    }
    
    # Verificar galeria de imagenes
    if ($property.images) {
        foreach ($img in $property.images) {
            $imagePath = Join-Path $publicFolder $img.TrimStart('/')
            if (-Not (Test-Path $imagePath)) {
                $missingImages += [PSCustomObject]@{
                    PropertyId = $property.id
                    PropertyTitle = $property.title
                    ImageType = "Galeria"
                    ImagePath = $img
                }
                $propertyMissingImages += "Galeria: $img"
            } else {
                $existingImages += $imagePath
            }
        }
    }
    
    # Verificar planos
    if ($property.planos) {
        foreach ($plano in $property.planos) {
            $planoPath = Join-Path $publicFolder $plano.TrimStart('/')
            if (-Not (Test-Path $planoPath)) {
                $missingImages += [PSCustomObject]@{
                    PropertyId = $property.id
                    PropertyTitle = $property.title
                    ImageType = "Plano"
                    ImagePath = $plano
                }
                $propertyMissingImages += "Plano: $plano"
            } else {
                $existingImages += $planoPath
            }
        }
    }
    
    # Si esta propiedad tiene imagenes faltantes, agregar al reporte
    if ($propertyMissingImages.Count -gt 0) {
        $propertiesWithMissingImages += [PSCustomObject]@{
            Id = $property.id
            Title = $property.title
            Type = $property.type
            Operation = $property.operation
            MissingCount = $propertyMissingImages.Count
            MissingImages = $propertyMissingImages
        }
    }
}

# Mostrar resumen en consola
Write-Host "================================" -ForegroundColor Green
Write-Host "  RESULTADO DE LA AUDITORIA" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Imagenes existentes: $($existingImages.Count)" -ForegroundColor Green
Write-Host "Imagenes faltantes: $($missingImages.Count)" -ForegroundColor Red
Write-Host "Propiedades afectadas: $($propertiesWithMissingImages.Count) de $totalProperties" -ForegroundColor Yellow
Write-Host ""

# Exportar resultados a JSON para procesamiento posterior
$auditResults = @{
    Fecha = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    TotalPropiedades = $totalProperties
    PropiedadesConImagenesFaltantes = $propertiesWithMissingImages.Count
    TotalImagenesFaltantes = $missingImages.Count
    TotalImagenesExistentes = $existingImages.Count
    CoberturaImagenes = [math]::Round(($existingImages.Count / ($existingImages.Count + $missingImages.Count)) * 100, 2)
    PropiedadesAfectadas = $propertiesWithMissingImages
    ImagenesFaltantes = $missingImages
}

$auditResults | ConvertTo-Json -Depth 10 | Out-File "docs/images-audit-results.json" -Encoding UTF8

Write-Host "Resultados exportados a: docs/images-audit-results.json" -ForegroundColor Cyan
Write-Host ""

# Mostrar top 10 propiedades con mas imagenes faltantes
if ($propertiesWithMissingImages.Count -gt 0) {
    Write-Host "TOP 10 PROPIEDADES CON MAS IMAGENES FALTANTES:" -ForegroundColor Red
    Write-Host ""
    $top10 = $propertiesWithMissingImages | Sort-Object -Property MissingCount -Descending | Select-Object -First 10
    foreach ($prop in $top10) {
        Write-Host "   ID $($prop.Id): $($prop.Title)" -ForegroundColor Yellow
        Write-Host "   Imagenes faltantes: $($prop.MissingCount)" -ForegroundColor Red
        Write-Host ""
    }
}
