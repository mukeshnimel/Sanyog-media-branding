// optimize-videos.mjs
// Usage (project root me):  node optimize-videos.mjs
//
// Kya karta hai:
//  1. public/images/video-reel/ ki saari .mp4 ka backup banata hai -> video-reel-originals/ (public ke BAHAR)
//  2. Har video ko 720p + CRF 28 + faststart me compress karke wapas public me rakhta hai
//  3. Har video ka poster (pehla frame, .jpg) public/images/video-reel/posters/ me banata hai
//
// Requirement: ffmpeg installed ho (terminal me `ffmpeg -version` chalke check karo)
// Script dobara chalane par safe hai: hamesha original backup se hi compress karta hai.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const VIDEO_DIR = path.join("public", "images", "video-reel");
const BACKUP_DIR = "video-reel-originals"; // public ke bahar, taaki deploy me na jaye
const POSTER_DIR = path.join(VIDEO_DIR, "posters");

const MAX_HEIGHT = 720; // reels ke liye kaafi hai
const CRF = 28; // 23 = better quality/bigger, 30 = smaller/lower quality

// ---- checks ----
try {
  execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
} catch {
  console.error("ffmpeg nahi mila. Pehle install karo: https://ffmpeg.org/download.html");
  process.exit(1);
}

if (!fs.existsSync(VIDEO_DIR)) {
  console.error(`Folder nahi mila: ${VIDEO_DIR}. Script project root se chalao.`);
  process.exit(1);
}

fs.mkdirSync(BACKUP_DIR, { recursive: true });
fs.mkdirSync(POSTER_DIR, { recursive: true });

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2) + " MB";

// ---- step 1: backup (sirf pehli baar, existing backup overwrite nahi hota) ----
const files = fs.readdirSync(VIDEO_DIR).filter((f) => f.toLowerCase().endsWith(".mp4"));

if (files.length === 0) {
  console.log("Koi .mp4 nahi mili.");
  process.exit(0);
}

for (const f of files) {
  const backup = path.join(BACKUP_DIR, f);
  if (!fs.existsSync(backup)) {
    fs.copyFileSync(path.join(VIDEO_DIR, f), backup);
  }
}

// ---- step 2 & 3: compress + poster ----
let totalBefore = 0;
let totalAfter = 0;

for (const f of files) {
  const name = path.parse(f).name;
  const original = path.join(BACKUP_DIR, f);
  const output = path.join(VIDEO_DIR, f);
  const tmp = path.join(VIDEO_DIR, `${name}.tmp.mp4`);
  const poster = path.join(POSTER_DIR, `${name}.jpg`);

  const before = fs.statSync(original).size;
  console.log(`\n▶ ${f}  (original: ${mb(before)})`);

  try {
    // compress
    execFileSync(
      "ffmpeg",
      [
        "-y",
        "-loglevel", "error",
        "-i", original,
        // sirf tab chhota karo jab video 720p se badi ho; upscale kabhi nahi
        "-vf", `scale=-2:'min(${MAX_HEIGHT},ih)'`,
        "-c:v", "libx264",
        "-crf", String(CRF),
        "-preset", "slow",
        "-pix_fmt", "yuv420p", // sab browsers/phones me chale
        "-c:a", "aac",
        "-b:a", "96k",
        "-movflags", "+faststart", // poori file aane se pehle play shuru
        tmp,
      ],
      { stdio: "inherit" }
    );

    // agar compress karke badi ho gayi, toh original hi rakho
    const compressed = fs.statSync(tmp).size;
    if (compressed < before) {
      fs.renameSync(tmp, output);
    } else {
      fs.unlinkSync(tmp);
      fs.copyFileSync(original, output);
      console.log("  (compress se fayda nahi hua, original rakha)");
    }

    // poster: 1 second ke frame se (pehla frame aksar black hota hai)
    execFileSync(
      "ffmpeg",
      [
        "-y",
        "-loglevel", "error",
        "-ss", "1",
        "-i", original,
        "-vframes", "1",
        "-q:v", "4",
        "-vf", "scale=480:-2",
        poster,
      ],
      { stdio: "inherit" }
    );

    // agar video 1 second se chhoti hai toh poster nahi banta, pehle frame se try karo
    if (!fs.existsSync(poster)) {
      execFileSync(
        "ffmpeg",
        ["-y", "-loglevel", "error", "-i", original, "-vframes", "1", "-q:v", "4", "-vf", "scale=480:-2", poster],
        { stdio: "inherit" }
      );
    }

    const after = fs.statSync(output).size;
    totalBefore += before;
    totalAfter += after;
    console.log(`  ✓ ${mb(before)} → ${mb(after)}  |  poster: posters/${name}.jpg`);
  } catch (err) {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    console.error(`  ✗ ${f} fail hui:`, err.message);
  }
}

console.log("\n==============================");
console.log(`Total pehle : ${mb(totalBefore)}`);
console.log(`Total ab    : ${mb(totalAfter)}`);
if (totalBefore > 0) {
  console.log(`Bachat      : ${(100 - (totalAfter / totalBefore) * 100).toFixed(0)}%`);
}
console.log(`Originals backup: ./${BACKUP_DIR}/  (isko .gitignore me daal dena)`);
console.log("==============================");
