# Image Structure Migration Script
# SOMOS Properties - March 2026

param(
    [switch]$DryRun = $false,
    [switch]$Backup = $true
)

$ErrorActionPreference = "Stop"
$basePath = "c:\Users\HP 15\somosproperties-react\public\images\properties"
$jsonPath = "c:\Users\HP 15\somosproperties-react\data\properties.json"

Write-Host "========================================"
Write-Host "IMAGE STRUCTURE MIGRATION" -ForegroundColor Cyan
Write-Host "========================================"
Write-Host ""

if ($DryRun) {
    Write-Host "[DRY RUN MODE] - No changes will be made" -ForegroundColor Yellow
    Write-Host ""
}

# BACKUP
if ($Backup -and -not $DryRun) {
    Write-Host "[1/5] Creating backup..." -ForegroundColor Green
    
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $backupPath = "c:\Users\HP 15\somosproperties-react\backups\images-$timestamp"
    $jsonBackupPath = "c:\Users\HP 15\somosproperties-react\backups\properties-$timestamp.json"
    
    New-Item -ItemType Directory -Path "c:\Users\HP 15\somosproperties-react\backups" -Force | Out-Null
    Copy-Item -Path $basePath -Destination $backupPath -Recurse -Force
    Copy-Item -Path $jsonPath -Destination $jsonBackupPath -Force
    
    Write-Host "  OK Images backed up to: $backupPath"
    Write-Host "  OK JSON backed up to: $jsonBackupPath"
    Write-Host ""
}

# MIGRATION RULES
$migrationRules = @{
    "planos" = "floorplans"
    "locales-comerciales" = "gallery"
    "interiores" = "gallery"
    "general" = "hero"
    "flyers" = "promotional"
    "exteriores" = "exterior"
    "vistas" = "exterior"
}

$pathReplacements = @{}

# SCAN & PLAN
Write-Host "[2/5] Scanning current structure..." -ForegroundColor Green

$properties = Get-ChildItem -Path $basePath -Directory
$totalFolders = 0
$changes = @()

foreach ($property in $properties) {
    $propertyName = $property.Name
    $propertyPath = $property.FullName
    
    Write-Host "  Property: $propertyName" -ForegroundColor Cyan
    
    $subfolders = Get-ChildItem -Path $propertyPath -Directory -ErrorAction SilentlyContinue
    
    foreach ($folder in $subfolders) {
        $folderName = $folder.Name
        $currentPath = $folder.FullName
        
        if ($migrationRules.ContainsKey($folderName)) {
            $newName = $migrationRules[$folderName]
            $newPath = Join-Path $propertyPath $newName
            
            $change = @{
                Property = $propertyName
                OldFolder = $folderName
                NewFolder = $newName
                OldPath = $currentPath
                NewPath = $newPath
            }
            $changes += $change
            
            $oldJsonPath = "/images/properties/$propertyName/$folderName/"
            $newJsonPath = "/images/properties/$propertyName/$newName/"
            $pathReplacements[$oldJsonPath] = $newJsonPath
            
            Write-Host "    MIGRATE: $folderName -> $newName" -ForegroundColor Yellow
            $totalFolders++
        } else {
            Write-Host "    KEEP: $folderName" -ForegroundColor Gray
        }
    }
}

Write-Host ""
Write-Host "Total folders to migrate: $totalFolders"
Write-Host ""

if ($totalFolders -eq 0) {
    Write-Host "No migration needed!" -ForegroundColor Green
    exit 0
}

# EXECUTE MIGRATION
Write-Host "[3/5] Executing folder migrations..." -ForegroundColor Green

$migratedCount = 0

foreach ($change in $changes) {
    $oldPath = $change.OldPath
    $newPath = $change.NewPath
    $propertyName = $change.Property
    $oldFolder = $change.OldFolder
    $newFolder = $change.NewFolder
    
    if (Test-Path $oldPath) {
        if (-not $DryRun) {
            if (Test-Path $newPath) {
                Write-Host "  MERGE: $propertyName/$newFolder exists, merging..." -ForegroundColor Yellow
                
                $files = Get-ChildItem -Path $oldPath -File -Recurse
                foreach ($file in $files) {
                    $relativePath = $file.FullName.Substring($oldPath.Length + 1)
                    $targetPath = Join-Path $newPath $relativePath
                    $targetDir = Split-Path $targetPath -Parent
                    
                    if (-not (Test-Path $targetDir)) {
                        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
                    }
                    
                    Copy-Item -Path $file.FullName -Destination $targetPath -Force
                }
                
                Remove-Item -Path $oldPath -Recurse -Force
            } else {
                Rename-Item -Path $oldPath -NewName $newFolder -Force
            }
            
            Write-Host "  OK Migrated: $propertyName/$oldFolder -> $newFolder" -ForegroundColor Green
        } else {
            Write-Host "  [DRY RUN] Would migrate: $propertyName/$oldFolder -> $newFolder" -ForegroundColor Yellow
        }
        
        $migratedCount++
    }
}

Write-Host ""
Write-Host "Migrated: $migratedCount folders"
Write-Host ""

# UPDATE properties.json
Write-Host "[4/5] Updating properties.json..." -ForegroundColor Green

if (-not $DryRun) {
    $jsonContent = Get-Content -Path $jsonPath -Raw
    $replacementCount = 0
    
    foreach ($oldPath in $pathReplacements.Keys) {
        $newPath = $pathReplacements[$oldPath]
        $beforeCount = ([regex]::Matches($jsonContent, [regex]::Escape($oldPath))).Count
        $jsonContent = $jsonContent -replace [regex]::Escape($oldPath), $newPath
        $afterCount = ([regex]::Matches($jsonContent, [regex]::Escape($oldPath))).Count
        $replaced = $beforeCount - $afterCount
        
        if ($replaced -gt 0) {
            Write-Host "  OK $oldPath -> $newPath (replaced $replaced times)" -ForegroundColor Green
            $replacementCount += $replaced
        }
    }
    
    $jsonContent | Set-Content -Path $jsonPath -Encoding UTF8 -NoNewline
    
    Write-Host ""
    Write-Host "Total replacements: $replacementCount"
    Write-Host ""
} else {
    Write-Host "  [DRY RUN] Would update properties.json" -ForegroundColor Yellow
    foreach ($oldPath in $pathReplacements.Keys) {
        Write-Host "    $oldPath -> $($pathReplacements[$oldPath])"
    }
    Write-Host ""
}

# CREATE STANDARD FOLDERS
Write-Host "[5/5] Creating standard folder structure..." -ForegroundColor Green

$standardFolders = @("hero", "gallery", "amenities", "floorplans", "promotional", "exterior")

foreach ($property in $properties) {
    $propertyPath = $property.FullName
    
    foreach ($folder in $standardFolders) {
        $folderPath = Join-Path $propertyPath $folder
        
        if (-not (Test-Path $folderPath)) {
            if (-not $DryRun) {
                New-Item -ItemType Directory -Path $folderPath -Force | Out-Null
                New-Item -ItemType File -Path (Join-Path $folderPath ".gitkeep") -Force | Out-Null
            }
        }
    }
}

Write-Host "  OK Standard folders created"
Write-Host ""

# SUMMARY
Write-Host "========================================"
Write-Host "MIGRATION COMPLETE" -ForegroundColor Cyan
Write-Host "========================================"
Write-Host ""

if (-not $DryRun) {
    Write-Host "Folders migrated: $migratedCount" -ForegroundColor Green
    Write-Host "JSON updated successfully" -ForegroundColor Green
    Write-Host "Standard structure created" -ForegroundColor Green
    
    if ($Backup) {
        Write-Host ""
        Write-Host "Backup location:" -ForegroundColor Yellow
        Write-Host "  $backupPath"
    }
    
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Run: npm run build"
    Write-Host "  2. Test image loading in browser"
    Write-Host "  3. Verify promotional flyers work"
} else {
    Write-Host "This was a DRY RUN. No changes were made." -ForegroundColor Yellow
    Write-Host "Run without -DryRun flag to execute migration." -ForegroundColor Yellow
}

Write-Host ""
