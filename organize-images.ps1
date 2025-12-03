# Script para organizar imagenes de propiedades
$imagesPath = "public\images"
$propertiesPath = "$imagesPath\properties"

if (-not (Test-Path $propertiesPath)) {
    New-Item -ItemType Directory -Path $propertiesPath | Out-Null
}

$projects = @(
    "kings-park", "central-plaza", "new-west", "playa-escondida",
    "praderas-de-arraijan", "pacific-point-400", "the-towers-50th-street",
    "evolution-tower", "balboa-boutiques", "plaza-los-guayacanes",
    "the-towers-business-plaza", "sunset-strip"
)

Write-Host "Creando carpetas..." -ForegroundColor Cyan
foreach ($project in $projects) {
    $projectPath = "$propertiesPath\$project"
    if (-not (Test-Path $projectPath)) {
        New-Item -ItemType Directory -Path $projectPath | Out-Null
        Write-Host "  OK $project" -ForegroundColor Green
    }
}

Write-Host "`nMoviendo imagenes..." -ForegroundColor Cyan

$kingsFiles = @{
    "kings-park-hero-aerial.png" = "properties\kings-park\hero.png"
    "kings-park-hero-aerial-full.png" = "properties\kings-park\hero-full.png"
    "kings-park-plano-1.png" = "properties\kings-park\plano-1.png"
    "kings-park-plano-2.png" = "properties\kings-park\plano-2.png"
    "Plano-Modelo-A-kings-Park.png" = "properties\kings-park\plano-modelo-a.png"
    "Plano-Modelo-B-kings-Park.png" = "properties\kings-park\plano-modelo-b.png"
    "model.jpeg" = "properties\kings-park\model.jpeg"
}

foreach ($file in $kingsFiles.GetEnumerator()) {
    $source = "$imagesPath\$($file.Key)"
    $dest = "$imagesPath\$($file.Value)"
    if (Test-Path $source) {
        Move-Item -Path $source -Destination $dest -Force
        Write-Host "  OK $($file.Key)" -ForegroundColor Green
    }
}

$centralFiles = @{
    "Central-Plaza-Arraijan.png" = "properties\central-plaza\hero.png"
}

foreach ($file in $centralFiles.GetEnumerator()) {
    $source = "$imagesPath\$($file.Key)"
    $dest = "$imagesPath\$($file.Value)"
    if (Test-Path $source) {
        Move-Item -Path $source -Destination $dest -Force
        Write-Host "  OK $($file.Key)" -ForegroundColor Green
    }
}

Write-Host "`nCompletado!" -ForegroundColor Green
