const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ffmpegPath = require('ffmpeg-static');
const inputVideo = path.join(__dirname, '..', 'public', 'export-1787519527893.mp4');
const outputVideo = path.join(__dirname, '..', 'public', 'demo-optimized.mp4');

console.log('Using ffmpeg from:', ffmpegPath);
console.log('Input:', inputVideo);
console.log('Output:', outputVideo);

if (fs.existsSync(outputVideo)) {
  fs.unlinkSync(outputVideo);
}

const args = [
  '-i', inputVideo,
  '-c:v', 'libx264',
  '-crf', '23',
  '-preset', 'fast',
  '-pix_fmt', 'yuv420p',
  '-c:a', 'aac',
  '-b:a', '128k',
  '-movflags', '+faststart',
  outputVideo
];

console.log('Starting compression...');
const res = spawnSync(ffmpegPath, args, { stdio: 'inherit' });
if (res.status === 0) {
  const inStat = fs.statSync(inputVideo);
  const outStat = fs.statSync(outputVideo);
  console.log(`Success! Original: ${(inStat.size / (1024*1024)).toFixed(2)} MB -> Optimized: ${(outStat.size / (1024*1024)).toFixed(2)} MB`);
} else {
  console.error('Compression failed with code:', res.status);
}
