Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Nishant Gaurav\Downloads\6bb7cfea-ce3d-4fcf-a374-157309fbe912-Photoroom.png"
$srcImg = [System.Drawing.Bitmap]::FromFile($srcPath)

$minX = $srcImg.Width
$maxX = 0
$minY = $srcImg.Height
$maxY = 0

for ($y = 0; $y -lt $srcImg.Height; $y += 2) {
    for ($x = 0; $x -lt $srcImg.Width; $x += 2) {
        $pixel = $srcImg.GetPixel($x, $y)
        # Check non-transparent
        if ($pixel.A -gt 15) {
            # Check not pure white background
            if (-not ($pixel.R -gt 250 -and $pixel.G -gt 250 -and $pixel.B -gt 250)) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
}

Write-Host "Detected bounds: X=[$minX, $maxX], Y=[$minY, $maxY]"

$cropWidth = $maxX - $minX
$cropHeight = $maxY - $minY

# Make it square centered
$cropSize = [Math]::Max($cropWidth, $cropHeight)
$centerX = [int]($minX + ($cropWidth / 2))
$centerY = [int]($minY + ($cropHeight / 2))

# Small padding 2%
$pad = [int]($cropSize * 0.03)
$cropSize += ($pad * 2)

$startX = [Math]::Max(0, [int]($centerX - ($cropSize / 2)))
$startY = [Math]::Max(0, [int]($centerY - ($cropSize / 2)))

if ($startX + $cropSize -gt $srcImg.Width) { $cropSize = $srcImg.Width - $startX }
if ($startY + $cropSize -gt $srcImg.Height) { $cropSize = $srcImg.Height - $startY }

Write-Host "Cropping square region: ($startX, $startY) size: $cropSize x $cropSize"

$cropRect = New-Object System.Drawing.Rectangle($startX, $startY, $cropSize, $cropSize)
$croppedImg = $srcImg.Clone($cropRect, $srcImg.PixelFormat)

function Resize-And-Save([System.Drawing.Bitmap]$source, [int]$width, [int]$height, [string]$targetPath) {
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
    
    $destImage.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $destImage.Dispose()
    Write-Host "Saved tightly cropped: $targetPath ($($width)x$($height))"
}

Resize-And-Save $croppedImg 1024 1024 "public\logo.png"
Resize-And-Save $croppedImg 512 512 "public\icon.png"
Resize-And-Save $croppedImg 512 512 "build\icon.png"
Resize-And-Save $croppedImg 512 512 "src\assets\logo.png"
Resize-And-Save $croppedImg 256 256 "public\icon-256.png"
Resize-And-Save $croppedImg 128 128 "public\icon-128.png"
Resize-And-Save $croppedImg 64 64 "public\icon-64.png"
Resize-And-Save $croppedImg 48 48 "public\icon-48.png"
Resize-And-Save $croppedImg 32 32 "public\favicon-32x32.png"
Resize-And-Save $croppedImg 24 24 "public\tray-icon.png"
Resize-And-Save $croppedImg 16 16 "public\favicon-16x16.png"

$croppedImg.Dispose()
$srcImg.Dispose()

Write-Host "Done tight cropping and icon generation!"
