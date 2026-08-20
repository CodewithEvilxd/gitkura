<div align="center">

# 🏯 GitKura (Git蔵)
### Disaster-Proof Git Repository Vault & Multi-Cloud Replication Engine

*Preserve 100% of your GitHub ecosystem in air-gapped local vaults, Telegram channels, Google Drive, and S3-compatible cloud storage.*

[![Electron](https://img.shields.io/badge/Electron-41.0-47848F?style=for-the-badge&logo=electron&logoColor=white)](https://electronjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-06B6D4?style=for-the-badge)](LICENSE)

<br/>

<img src="./public/diagram.jpg" alt="GitKura System Architecture &amp; Workflow" width="100%" style="border-radius: 16px; border: 2px solid #2d2d2d; box-shadow: 4px 4px 0px #2d2d2d;" />

</div>

---

## 📖 Table of Contents

- [⛩️ The Lore: Why GitKura?](#️-the-lore-why-gitkura)
- [✨ Key Capabilities](#-key-capabilities)
- [🏛️ System Architecture](#️-system-architecture)
- [☁️ Multi-Cloud &amp; Telegram Replication](#️-multi-cloud--telegram-replication)
- [🚀 Quick Start &amp; Installation](#-quick-start--installation)
- [📦 Packaging &amp; Distribution](#-packaging--distribution)
- [🛡️ Security, Cryptography &amp; Privacy](#️-security-cryptography--privacy)
- [🚨 Disaster Recovery Manual](#-disaster-recovery-manual)
- [🧹 Cache &amp; Storage Maintenance](#-cache--storage-maintenance)
- [👨‍💻 Author &amp; License](#-author--license)

---

## ⛩️ The Lore: Why GitKura?

In traditional Japanese architecture, a **Kura (蔵)** is a fortified, fireproof storehouse constructed alongside residences to protect a family's most sacred heirlooms, legal deeds, and treasures from fires, earthquakes, and disasters.

Centralizing all your source code on a single cloud vendor introduces severe operational risks:
- 🚫 **Account Lockouts & Billing Flagging**
- ⚡ **Upstream Cloud Outages & Network Partitions**
- 💥 **Accidental Repository Deletions & Force-Push Disasters**
- 🔒 **Loss of Code Sovereignty**

**GitKura (Git蔵)** acts as your digital Kura: an autonomous, air-gapped vault that continuously mirrors your raw Git repositories to your local filesystem and asynchronously broadcasts point-in-time encrypted snapshot archives across diverse cloud storage providers.

---

## ✨ Key Capabilities

| Feature | Description |
| :--- | :--- |
| **🐙 Complete Scope Discovery** | Query and filter personal owned repos, enterprise organizations, starred repositories, and forks with granular inclusion checkboxes. |
| **⚡ Differential Git Engine** | Powered by `simple-git`. Executes fast differential pulls (`git fetch --all --prune --tags`) so only updated commits and branches are downloaded. |
| **📦 Point-in-Time GZIP Packaging** | Packages complete working directories into compressed `.tar.gz` snapshot archives with atomic rename guards. |
| **✈️ Telegram Channel Broadcast** | Direct multipart push to Telegram Bot API with Markdown commit summaries and smart `-100` supergroup auto-resolution. |
| **🔺 Google Drive V3 Resumable** | Native dual-mode auth supporting Google Service Account JSON (with RSA-SHA256 JWT signing) or standard OAuth2 tokens. |
| **🪣 AWS S3, Cloudflare R2 &amp; MinIO** | Official AWS SDK v3 multi-part streaming support with zero-egress bucket compatibility and custom endpoints. |
| **⏱️ Background Cron Daemon** | Armed with `node-cron` and a Windows/macOS System Tray controller for daily, weekly, or monthly unattended backups. |
| **🚀 Parallel Concurrency Queue** | Thread pool concurrency limiter (1 to 10 threads via `p-limit`) to prevent API rate-limiting while maximizing bandwidth. |
| **🧹 Cache &amp; Storage Maintenance** | One-click purging of local network buffers, cached repository metadata, and temporary staging snapshots. |

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        RENDERER PROCESS (REACT 19)                      │
│                                                                         │
│   [ Setup Page ]    [ Repos Page ]    [ Backup Page ]   [ Docs Page ]   │
│   Token & Vault      Filter Scopes     Live Terminal     Handwritten    │
│   Cloud Selection    Selection Grid    Progress Streams   Field Manual  │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ Secure ContextBridge (Preload.ts)
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        MAIN PROCESS (ELECTRON & NODE)                   │
│                                                                         │
│   ┌───────────────────────┐   ┌─────────────────────────────────────┐   │
│   │   GitHub REST API     │   │      Simple-Git Mirror Engine       │   │
│   │   (@octokit/rest)     │   │  (git clone --mirror / git fetch)   │   │
│   └───────────┬───────────┘   └──────────────────┬──────────────────┘   │
│               │                                  │                      │
│               ▼                                  ▼                      │
│   ┌───────────────────────┐   ┌─────────────────────────────────────┐   │
│   │  AES Encrypted Store  │   │     Point-in-Time Snapshot Engine   │   │
│   │   (electron-store)    │   │      (node-tar .tar.gz packaging)   │   │
│   └───────────────────────┘   └──────────────────┬──────────────────┘   │
│                                                  │                      │
│                                                  ▼                      │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                   Cloud Replication Dispatcher                  │   │
│   │  • Telegram Bot API    • Google Drive V3    • AWS S3 / R2 / MinIO│   │
│   └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## ☁️ Multi-Cloud & Telegram Replication

GitKura supports 6 independent replication backends:

1. **Local Vault Only (`none`)**
   - Saves uncompressed Git repositories with full commit histories and standalone `.tar.gz` snapshots in `.archives/`.
2. **Telegram Channel Vault (`telegram`)**
   - Transmits snapshot archives directly into your private channel or group via Bot API `sendDocument`.
   - Built-in smart channel ID resolver automatically adjusts standard chat IDs to supergroup `-100` formats.
3. **Google Drive (`gdrive`)**
   - Dual-Mode Authentication: Service Account JSON (native RSA-SHA256 JWT generation) or direct OAuth2 token.
   - Resumable Chunked Upload API into targeted Folder IDs.
4. **Amazon S3 (`s3`)**
   - Official AWS SDK S3 client with multi-part stream uploading and storage class selection.
5. **Cloudflare R2 (`r2`)**
   - Zero-egress fee S3-compatible cloud storage with custom bucket prefixes.
6. **Self-Hosted MinIO & Wasabi (`custom`)**
   - Dedicated support for private MinIO instances and Wasabi with `forcePathStyle: true`.

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **Git**: Installed and accessible in your system `PATH`
- **GitHub Personal Access Token (PAT)**: Requires `repo`, `read:org`, `read:user` scopes

### Step 1: Clone Repository
```bash
git clone https://github.com/nishantgaurav/gitbackup.git
cd gitbackup
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Launch in Development Mode
```bash
npm run dev
```

---

## 📦 Packaging & Distribution

To create standalone, distributable installers for your operating system:

```bash
# Verify TypeScript & compile bundle
npm run build

# Package for current host platform
npm run package

# Build platform-specific binaries:
npm run package:win     # Windows Portable & NSIS Installer (.exe)
npm run package:mac     # macOS Universal DMG (.dmg)
npm run package:linux   # Linux AppImage & Debian Package (.AppImage, .deb)
```

---

## 🛡️ Security, Cryptography & Privacy

- 🔒 **Zero Telemetry**: No analytics, no tracking beacons, no Sentry, and no intermediary servers.
- 🔐 **AES-256 Disk Encryption**: All PAT tokens, Telegram tokens, and Service Account JSON credentials are encrypted on your local hard drive via `electron-store`.
- 🛡️ **Strict IPC Sandboxing**: The renderer process runs with `contextIsolation: true` and `nodeIntegration: false`. Only whitelisted IPC channels can communicate with Node.js.
- 🧹 **Header Sanitization**: Authorization headers and credentials are scrubbed from local logs immediately upon execution.

---

## 🚨 Disaster Recovery Manual

If GitHub experiences an outage or a repository is deleted, you can restore your codebase in seconds:

### Method 1: Instant Local Workspace Access
Your local vault already holds uncompressed Git repositories:
```bash
cd "C:/Your-Vault-Path/owner/repository-name"
git status
git log --oneline -n 10
```

### Method 2: Extracting from `.tar.gz` Snapshot
```bash
# Extract snapshot archive
tar -xzf owner__repository-name.tar.gz

# Enter restored directory
cd owner/repository-name
git branch -a
git remote -v
```

### Method 3: Republishing to a New Host (GitLab / Bitbucket / Self-Hosted)
```bash
cd owner/repository-name

# Update remote URL
git remote set-url origin https://gitlab.com/new-org/new-repo.git

# Push all branches and tags
git push --all origin
git push --tags origin
```

---

## 🧹 Cache & Storage Maintenance

In **Preferences (Settings)**, GitKura provides a real-time storage monitor:
- **Cached Repositories**: Instant offline loading of repository lists.
- **Network Buffers**: Temporary Chromium & Electron HTTP memory.
- **Clear Cache Button**: Purges cached metadata and transient staging archives without touching saved tokens or local vault directories.

---

## 👨‍💻 Author & License

- **Author & Architect**: [Nishant Gaurav](https://github.com/nishantgaurav)
- **Project**: GitKura (Git蔵) • Version 1.0.0
- **License**: Released under the [MIT License](LICENSE).

---

<div align="center">
  <b>Built with passion for data sovereignty, open-source resilience, and craftsmanship. ⛩️✨</b>
</div>
