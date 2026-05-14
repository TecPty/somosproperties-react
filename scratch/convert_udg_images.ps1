
$images = Get-ChildItem -Path "public/images/properties/new-west/modelo-*.jpg"
foreach ($img in $images) {
    $webpPath = [System.IO.Path]::ChangeExtension($img.FullName, ".webp")
    Write-Host "Convertiendo: $($img.Name) -> $($webpPath)"
    & cwebp -q 80 $img.FullName -o $webpPath
    Remove-Item $img.FullName
}
