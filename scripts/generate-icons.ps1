Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Nishant Gaurav\Downloads\6bb7cfea-ce3d-4fcf-a374-157309fbe912-Photoroom.png"
if (-not (Test-Path $srcPath)) {
    Write-Error "Source image not found at $srcPath"
    exit 1
}

$srcImg = [System.Drawing.Bitmap]::FromFile($srcPath)

New-Item -ItemType Directory -Force -Path "public" | Out-Null
New-Item -ItemType Directory -Force -Path "build" | Out-Null
New-Item -ItemType Directory -Force -Path "src\assets" | Out-Null

function Resize-ImageFile([System.Drawing.Bitmap]$source, [int]$width, [int]$height, [string]$targetPath) {
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
    $destImage = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $destImage.SetResolution($source.HorizontalResolution, $source.VerticalResolution)
    $graphics = [System.Drawing.Graphics]::FromImage($destImage)
    $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.DrawImage($source, $destRect, 0, 0, $source.Width, $source.Height, [System.Drawing.GraphicsUnit]::Pixel)
    $graphics.Dispose()
    
    # Ensure directory exists
    $parentDir = [System.IO.Path]::GetDirectoryName($targetPath)
    if ($parentDir -and -not (Test-Path $parentDir)) {
        New-Item -ItemType Directory -Force -Path $parentDir | Out-Null
    }
    
    $destImage.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $destImage.Dispose()
    Write-Host "Created $targetPath ($($width)x$($height))"
}

Resize-ImageFile $srcImg 1024 1024 "public\logo.png"
Resize-ImageFile $srcImg 512 512 "public\icon.png"
Resize-ImageFile $srcImg 512 512 "build\icon.png"
Resize-ImageFile $srcImg 512 512 "src\assets\logo.png"
Resize-ImageFile $srcImg 256 256 "public\icon-256.png"
Resize-ImageFile $srcImg 128 128 "public\icon-128.png"
Resize-ImageFile $srcImg 64 64 "public\icon-64.png"
Resize-ImageFile $srcImg 48 48 "public\icon-48.png"
Resize-ImageFile $srcImg 32 32 "public\favicon-32x32.png"
Resize-ImageFile $srcImg 24 24 "public\tray-icon.png"
Resize-ImageFile $srcImg 16 16 "public\favicon-16x16.png"

$srcImg.Dispose()
Write-Host "All icon resolutions generated successfully!"
