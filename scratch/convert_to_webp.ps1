
$images = Get-ChildItem -Path "public" -Recurse -Include *.png, *.jpg, *.jpeg

foreach ($img in $images) {
    $outputPath = [System.IO.Path]::ChangeExtension($img.FullName, ".webp")
    if (-not (Test-Path $outputPath)) {
        Write-Host "Convertiendo: $($img.Name) -> $($outputPath)"
        & cwebp -q 80 $img.FullName -o $outputPath
    } else {
        Write-Host "Saltando (ya existe): $($img.Name)"
    }
}
