# Script para organizar archivos sueltos en estructura estandar
# Autor: GitHub Copilot
# Fecha: 2026-03-16

param(
    [switch]$DryRun = $false
)

$baseDir = "c:\Users\HP 15\somosproperties-react\public\images\properties"

# Reglas de clasificacion semantica
$rules = @{
    # Hero images - imagenes principales/destacadas
    hero = @(
        "^hero",
        "^fachada-principal",
        "^fachada-frontal",
        "^fachada-torre",
        "^model\.","^model-[0-9]",
        "evolution-tower-frontal"
    )
    
    # Gallery - interiores, espacios internos
    gallery = @(
        "^lobby",
        "^pasillo",
        "^escalera",
        "^oficina",
        "^lounge",
        "^sala-juntas",
        "^recepcion",
        "^cocina",
        "^comedor"
    )
    
    # Floorplans - planos arquitectonicos
    floorplans = @(
        "^nivel-",
        "^plano-"
    )
    
    # Exterior - vistas externas, fachadas laterales
    exterior = @(
        "^fachada-costado",
        "^fachada-rali",
        "^acceso-principal",
        "^avenida-"
    )
    
    # Amenities - amenidades, areas comunes
    amenities = @(
        "^gym",
        "^piscina",
        "^co-working",
        "^terraza",
        "^totem"
    )
}

$stats = @{
    total = 0
    moved = 0
    errors = 0
}

function Get-DestinationFolder {
    param([string]$fileName)
    
    foreach ($folder in $rules.Keys) {
        foreach ($pattern in $rules[$folder]) {
            if ($fileName -match $pattern) {
                return $folder
            }
        }
    }
    
    # Default: si es hero-N.ext va a hero/
    if ($fileName -match "^hero-\d+\.") {
        return "hero"
    }
    
    return $null
}

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  ORGANIZACION DE ARCHIVOS SUELTOS" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
if ($DryRun) {
    Write-Host "MODO: DRY RUN (sin cambios reales)" -ForegroundColor Yellow
} else {
    Write-Host "MODO: EJECUCION REAL" -ForegroundColor Green
}
Write-Host ""

$properties = Get-ChildItem $baseDir -Directory

foreach ($prop in $properties) {
    $looseFiles = Get-ChildItem $prop.FullName -File | 
                  Where-Object { $_.Extension -match '\.(webp|png|jpg|jpeg)$' }
    
    if ($looseFiles.Count -eq 0) { continue }
    
    Write-Host ""
    Write-Host "[$($prop.Name)]" -ForegroundColor Yellow
    Write-Host "Archivos sueltos encontrados: $($looseFiles.Count)" -ForegroundColor Gray
    
    foreach ($file in $looseFiles) {
        $stats.total++
        $destination = Get-DestinationFolder $file.Name
        
        if ($destination) {
            $destPath = Join-Path $prop.FullName $destination
            $newPath = Join-Path $destPath $file.Name
            
            # Verificar si ya existe
            if (Test-Path $newPath) {
                Write-Host "  SKIP: $($file.Name) (ya existe en $destination/)" -ForegroundColor DarkYellow
                continue
            }
            
            Write-Host "  $($file.Name) -> $destination/" -ForegroundColor Green
            
            if (-not $DryRun) {
                try {
                    Move-Item -Path $file.FullName -Destination $newPath -ErrorAction Stop
                    $stats.moved++
                } catch {
                    Write-Host "  ERROR: $_" -ForegroundColor Red
                    $stats.errors++
                }
            } else {
                $stats.moved++
            }
        } else {
            Write-Host "  $($file.Name) -> NO SE PUDO CLASIFICAR" -ForegroundColor Red
            $stats.errors++
        }
    }
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "RESUMEN" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Total archivos encontrados: $($stats.total)" -ForegroundColor White
Write-Host "Archivos movidos/clasificados: $($stats.moved)" -ForegroundColor Green
Write-Host "Errores/No clasificados: $($stats.errors)" -ForegroundColor $(if ($stats.errors -gt 0) { "Red" } else { "Gray" })
Write-Host ""

if ($DryRun) {
    Write-Host "Para ejecutar cambios reales, ejecuta:" -ForegroundColor Yellow
    Write-Host "  .\scripts\organize-loose-files.ps1" -ForegroundColor White
}
