const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ffmpegPath = require('ffmpeg-static');
const inputVideo = path.join(__dirname, '..', 'public', 'export-1787519527893.mp4');
const outputVideo = path.join(__dirname, '..', 'public', 'demo-optimized.mp4');
const mobileVideo = path.join(__dirname, '..', 'public', 'demo-mobile.mp4');

// Create 1080p high quality web optimized (CRF 26)
spawnSync(ffmpegPath, [
  '-y',
  '-i', inputVideo,
  '-c:v', 'libx264',
  '-crf', '26',
  '-preset', 'fast',
  '-pix_fmt', 'yuv420p',
  '-an',
  '-movflags', '+faststart',
  outputVideo
], { stdio: 'inherit' });

// Create 720p ultra-lightweight mobile stream (CRF 27)
spawnSync(ffmpegPath, [
  '-y',
  '-i', inputVideo,
  '-vf', 'scale=-2:720',
  '-c:v', 'libx264',
  '-crf', '27',
  '-preset', 'fast',
  '-pix_fmt', 'yuv420p',
  '-an',
  '-movflags', '+faststart',
  mobileVideo
], { stdio: 'inherit' });

console.log('Optimized 1080p size:', (fs.statSync(outputVideo).size / (1024*1024)).toFixed(2), 'MB');
console.log('Mobile 720p size:', (fs.statSync(mobileVideo).size / (1024*1024)).toFixed(2), 'MB');
