Write-Host "`n===================================================================`n"
Write-Host "ANALISIS DE FORMATOS DE IMAGEN - SOMOS PROPERTIES`n"
Write-Host "===================================================================`n"

$basePath = "public\images\properties"
$allImages = Get-ChildItem -Path $basePath -Recurse -File -Include *.png,*.jpg,*.jpeg,*.webp,*.gif,*.svg

Write-Host "RESUMEN GENERAL:`n"
Write-Host "Total de imagenes: $($allImages.Count)`n"

$byExt = $allImages | Group-Object Extension | Sort-Object Count -Descending
foreach($group in $byExt) {
    $pct = [math]::Round((($group.Count / $allImages.Count) * 100), 1)
    Write-Host "$($group.Name.ToUpper()): $($group.Count) archivos ($pct%)"
}

Write-Host "`n===================================================================`n"
Write-Host "DESGLOSE POR PROYECTO:`n"
Write-Host "===================================================================`n"

$projects = @('balboa-boutique','boulevard-plaza','central-plaza','evolution-tower','kings-park','new-west','pacific-point','playa-escondida','plaza-guayacanes','praderas-de-arraijan','rali','sunset-strip','the-towers-business-plaza','the-towers-residences')

foreach($project in $projects) {
    $path = Join-Path $basePath $project
    if(Test-Path $path) {
        $files = Get-ChildItem -Path $path -Recurse -File -Include *.png,*.jpg,*.jpeg,*.webp,*.gif,*.svg
        
        $png = ($files | Where-Object {$_.Extension -eq '.png'}).Count
        $jpg = ($files | Where-Object {$_.Extension -eq '.jpg'}).Count
        $jpeg = ($files | Where-Object {$_.Extension -eq '.jpeg'}).Count
        $webp = ($files | Where-Object {$_.Extension -eq '.webp'}).Count
        
        Write-Host "$($project.ToUpper())"
        Write-Host "  Total: $($files.Count) imagenes"
        
        $formats = @()
        if($png -gt 0) { $formats += "PNG=$png" }
        if($jpg -gt 0) { $formats += "JPG=$jpg" }
        if($jpeg -gt 0) { $formats += "JPEG=$jpeg" }
        if($webp -gt 0) { $formats += "WEBP=$webp" }
        
        Write-Host "  Formatos: $($formats -join ', ')`n"
    }
}

Write-Host "===================================================================`n"
Write-Host "Analisis completado.`n"
