
$icons = "android-chrome-192x192", "android-chrome-512x512", "apple-touch-icon", "favicon-16x16", "favicon-32x32", "favicon"
foreach ($icon in $icons) {
    $webp = "public/$icon.webp"
    $png = "public/$icon.png"
    if (Test-Path $webp) {
        Write-Host "Restaurando PNG: $png"
        & ffmpeg -i $webp $png -y
    }
}
