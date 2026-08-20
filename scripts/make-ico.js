const fs = require('fs')
const path = require('path')

function createIco(pngPaths, outPath) {
  const pngBuffers = pngPaths.map(p => fs.readFileSync(p))
  const count = pngBuffers.length

  // Header: 6 bytes
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // Reserved
  header.writeUInt16LE(1, 2) // Type 1 = ICO
  header.writeUInt16LE(count, 4) // Number of images

  let offset = 6 + (16 * count)
  const dirEntries = []

  pngBuffers.forEach((buf, i) => {
    const entry = Buffer.alloc(16)
    // Read dimensions from PNG IHDR (bytes 16..24)
    const width = buf.readUInt32BE(16)
    const height = buf.readUInt32BE(20)

    entry.writeUInt8(width >= 256 ? 0 : width, 0)
    entry.writeUInt8(height >= 256 ? 0 : height, 1)
    entry.writeUInt8(0, 2) // Color count
    entry.writeUInt8(0, 3) // Reserved
    entry.writeUInt16LE(1, 4) // Color planes
    entry.writeUInt16LE(32, 6) // Bits per pixel
    entry.writeUInt32LE(buf.length, 8) // Image size in bytes
    entry.writeUInt32LE(offset, 12) // Offset

    dirEntries.push(entry)
    offset += buf.length
  })

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...pngBuffers])
  fs.writeFileSync(outPath, icoBuffer)
  console.log(`Generated ICO: ${outPath} (${count} frames, ${icoBuffer.length} bytes)`)
}

const buildIcoSizes = [
  'public/icon-256.png',
  'public/icon-128.png',
  'public/icon-64.png',
  'public/icon-48.png',
  'public/favicon-32x32.png',
  'public/favicon-16x16.png',
]

const faviconIcoSizes = [
  'public/favicon-32x32.png',
  'public/favicon-16x16.png',
]

createIco(buildIcoSizes, 'build/icon.ico')
createIco(faviconIcoSizes, 'public/favicon.ico')
