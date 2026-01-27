Write-Host "`n==================================================================="
Write-Host "    ANÁLISIS DE FORMATOS DE IMAGEN - SOMOS PROPERTIES"
Write-Host "===================================================================`n"

$basePath = "public\images\properties"

# Obtener todas las imágenes
$allImages = Get-ChildItem -Path $basePath -Recurse -File -Include *.png,*.jpg,*.jpeg,*.webp,*.gif,*.svg

Write-Host "📊 RESUMEN GENERAL:`n"
Write-Host "Total de imágenes: $($allImages.Count)`n"

# Agrupar por extensión
$byExt = $allImages | Group-Object Extension | Sort-Object Count -Descending
foreach($group in $byExt) {
    $pct = [math]::Round(($group.Count / $allImages.Count) * 100, 1)
    $ext = $group.Name.ToUpper()
    $count = $group.Count
    Write-Host "$ext : $count archivos ($pct porciento)"
}

Write-Host "`n`n==================================================================="
Write-Host "📁 DESGLOSE POR PROYECTO:"
Write-Host "===================================================================`n"

# Proyectos
$projects = @(
    'balboa-boutique',
    'boulevard-plaza',
    'central-plaza',
    'evolution-tower',
    'kings-park',
    'new-west',
    'pacific-point',
    'playa-escondida',
    'plaza-guayacanes',
    'praderas-de-arraijan',
    'rali',
    'sunset-strip',
    'the-towers-business-plaza',
    'the-towers-residences'
)

$projectData = @()

foreach($project in $projects) {
    $path = Join-Path $basePath $project
    if(Test-Path $path) {
        $files = Get-ChildItem -Path $path -Recurse -File -Include *.png,*.jpg,*.jpeg,*.webp,*.gif,*.svg
        
        $png = ($files | Where-Object {$_.Extension -eq '.png'}).Count
        $jpg = ($files | Where-Object {$_.Extension -eq '.jpg'}).Count
        $jpeg = ($files | Where-Object {$_.Extension -eq '.jpeg'}).Count
        $webp = ($files | Where-Object {$_.Extension -eq '.webp'}).Count
        
        $projectData += [PSCustomObject]@{
            Proyecto = $project
            Total = $files.Count
            PNG = $png
            JPG = $jpg
            JPEG = $jpeg
            WEBP = $webp
        }
        
        Write-Host "$($project.ToUpper())"
        Write-Host "  Total: $($files.Count) imágenes"
        
        $formats = @()
        if($png -gt 0) { $formats += "PNG: $png" }
        if($jpg -gt 0) { $formats += "JPG: $jpg" }
        if($jpeg -gt 0) { $formats += "JPEG: $jpeg" }
        if($webp -gt 0) { $formats += "WEBP: $webp" }
        
        Write-Host "  Formatos: $($formats -join ', ')"
        Write-Host ""
    }
}

Write-Host "`n==================================================================="
Write-Host "⚠️  RECOMENDACIONES:"
Write-Host "===================================================================`n"

# Proyectos con formatos mezclados
$mixed = $projectData | Where-Object { 
    ($_.PNG -gt 0 -and ($_.JPG -gt 0 -or $_.JPEG -gt 0 -or $_.WEBP -gt 0)) -or
    ($_.JPG -gt 0 -and ($_.JPEG -gt 0 -or $_.WEBP -gt 0)) -or
    ($_.JPEG -gt 0 -and $_.WEBP -gt 0)
}

if($mixed.Count -gt 0) {
    Write-Host "🔸 Proyectos con formatos mezclados:`n"
    foreach($proj in $mixed) {
        $formats = @()
        if($proj.PNG -gt 0) { $formats += "PNG: $($proj.PNG)" }
        if($proj.JPG -gt 0) { $formats += "JPG: $($proj.JPG)" }
        if($proj.JPEG -gt 0) { $formats += "JPEG: $($proj.JPEG)" }
        if($proj.WEBP -gt 0) { $formats += "WEBP: $($proj.WEBP)" }
        Write-Host "  $($proj.Proyecto): $($formats -join ', ')"
    }
}

Write-Host "`nMejor practica:"
Write-Host "  WebP: Mejor compresion y calidad (recomendado para web)"
Write-Host "  PNG: Imagenes con transparencia"
Write-Host "  JPEG/JPG: Fotos (unificar a JPEG preferiblemente)`n"

Write-Host "✅ Análisis completado.`n"
