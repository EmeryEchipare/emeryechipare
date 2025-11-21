# Sync Artwork Script
# This script copies new artwork from your source folders and updates the website

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Emery Echipare - Artwork Sync Tool  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = "C:\Users\micha\Projects\emeryechipare"
$sourceFolder1 = "C:\Users\micha\Pictures\Epson V600 Scans\Converted to JPEG to SHARE\Uploaded to Emery Google Drive"
$sourceFolder2 = "C:\Users\micha\Pictures\Epson V600 Scans\Converted to JPEG to SHARE\Uploaded to Emery Google Drive\Posted to Instagram"
$destFolder = "$projectRoot\public\artwork"

Set-Location $projectRoot

# Check if source folders exist
if (-not (Test-Path $sourceFolder1)) {
    Write-Host "ERROR: Source folder not found: $sourceFolder1" -ForegroundColor Red
    pause
    exit 1
}

# Count existing artwork
$existingFiles = Get-ChildItem $destFolder -File | Measure-Object
Write-Host "Current artwork count: $($existingFiles.Count)" -ForegroundColor Yellow
Write-Host ""

# Copy from main folder
Write-Host "Copying from main folder..." -ForegroundColor Green
$copied1 = 0
Get-ChildItem $sourceFolder1 -File -Include *.jpg,*.png | ForEach-Object {
    Copy-Item $_.FullName -Destination $destFolder -Force
    $copied1++
}
Write-Host "  Copied/updated $copied1 files" -ForegroundColor Gray

# Copy from Instagram folder
Write-Host "Copying from Instagram folder..." -ForegroundColor Green
$copied2 = 0
if (Test-Path $sourceFolder2) {
    Get-ChildItem $sourceFolder2 -File -Include *.jpg,*.png | ForEach-Object {
        Copy-Item $_.FullName -Destination $destFolder -Force
        $copied2++
    }
    Write-Host "  Copied/updated $copied2 files" -ForegroundColor Gray
}

# Count new total
$newFiles = Get-ChildItem $destFolder -File | Measure-Object
Write-Host ""
Write-Host "New artwork count: $($newFiles.Count)" -ForegroundColor Yellow
$newCount = $newFiles.Count - $existingFiles.Count
if ($newCount -gt 0) {
    Write-Host "Added $newCount new artwork(s)!" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Tell Warp: 'Update lib/artworks.ts with new images'" -ForegroundColor White
Write-Host "2. Build and deploy:" -ForegroundColor White
Write-Host "   npm run build" -ForegroundColor Gray
Write-Host "   npx wrangler pages deploy out --project-name=emeryechipare --branch=main" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
pause
