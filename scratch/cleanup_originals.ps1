
$images = Get-ChildItem -Path "public" -Recurse -Include *.png, *.jpg, *.jpeg
foreach ($img in $images) {
    $webpPath = [System.IO.Path]::ChangeExtension($img.FullName, ".webp")
    if (Test-Path $webpPath) {
        Write-Host "Eliminando original: $($img.FullName)"
        Remove-Item $img.FullName -Force
    }
}
