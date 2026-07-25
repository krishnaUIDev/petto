# 🐾 Petto — Interactive Desktop Companions

> Bring interactive animated pixel companions gently to life on your desktop screen with custom adoption, care HUD, speech bubble chat AI, environmental weather sync, birth certificates, and custom sprite creation.

---

## ✨ Features Overview

### 🖥️ Desktop Companion Experience (`apps/desktop`)
- **🐾 Desktop Pet Overlay**: Floating, transparent, frameless, always-on-top desktop companion running at a smooth 60fps.
- **🎯 Dynamic Hit-Testing**: Mouse clicks pass seamlessly through transparent canvas pixels to background desktop windows, while clicking or dragging on the pet allows interactive manipulation.
- **🍖 Interactive Pet Care HUD (`PetCareWidget`)**: Track live companion **Happiness (❤️)**, **Fullness (🍖)**, and **Energy (⚡)** stats. Feed treats (🍕), play fetch (⚽), and take cozy naps (💤)!
- **💬 Companion Chat Bubble AI (`PetChatBubble`)**: Talk directly to your desktop pet with quick-prompt chips or custom chat text and receive animated speech bubble responses!
- **🔊 Web Audio Sound Synthesizer (`SoundFx`)**: Cute 8-bit retro pet sounds (**Meow**, **Woof**, **Feed Crunch**, **Joy Chime**) synthesized in real-time via HTML5 Web Audio.
- **🌦️ Weather & Time Sync (`WeatherSync`)**: Real-time daytime/nightfall modes and environmental weather effects (**Sunny ☀️**, **Rainy 🌧️**, **Snowy ❄️**).
- **🏞️ Companion Habitats (`HabitatThemes`)**: Switch desktop background habitat ambiances (**Cozy Room**, **Enchanted Forest**, **Cyberpunk City**, **Space Station**).
- **🕹️ Treat Catcher Arcade (`TreatCatcherGame`)**: Mini arcade game to catch drifting treats and earn **Pet Coins**!
- **📖 Companion Journal & Milestones (`PetJournal`)**: Track caregiver milestone badges, adoption age, and care streaks.
- **📜 Adoption Ceremony & Birth Certificates**: Customize pet name, personality, birthday, and generate high-res downloadable **Gold-Embossed Adoption Certificates** (`.png`).
- **🎨 Custom Pet Creator & Slicer**: Drag-and-drop custom PNG/GIF sprite sheets, configure grid parameters ($W \times H$, columns, rows, FPS), and test animations live before adopting.
- **🔐 NextAuth.js User Sign-In (`AuthModal`)**: Connect your Google or GitHub account to sync adopted pets across devices.

### 🌐 Next.js Web Distribution Portal (`apps/web`)
- **🚀 Ultra-Fast Landing Page**: Next.js 14+ dark onyx glassmorphism landing page with laptop canvas mockup.
- **🎮 Live Web Pet Sandbox (`WebPetSandbox`)**: Interactive online companion simulator right on the website.
- **📜 Live Certificate Previewer (`CertificatePreviewer`)**: Customize and preview your adoption certificate in real-time before downloading.
- **🎨 Web Style & Accessory Studio (`PetCustomizerStudio`)**: Try party hats, crowns, glasses, and glowing auras live.
- **💻 Auto OS Setup Guide (`OSInstallerGuide`)**: Auto-detects visitor's OS (macOS vs Windows) with 1-click installer setup instructions.
- **⚡ 1-Click Direct Downloads**: Web download buttons host direct `.dmg` (macOS) and `.exe` (Windows) binary installer downloads.

---

## 📁 Repository Structure (Pnpm Monorepo)

```
petto/
├── apps/
│   ├── desktop/                 # Tauri v2 Desktop App (React 18 + Rust + Canvas Engine)
│   │   ├── src/                 # Canvas engine, Adoption Wizard, Pet Care HUD, Chat Bubble
│   │   └── src-tauri/           # Rust backend (Transparent overlay window, Tray, IPC)
│   │
│   └── web/                     # Next.js 14+ Web Portal & Distribution Landing Page
│       ├── app/                 # Next.js App Router, Web Sandbox, Style Studio, Downloads
│       └── public/downloads/    # Direct installer binary hosting (Petto.dmg / Petto-setup.exe)
│
├── packages/
│   └── shared/                  # Shared TypeScript Types, Schemas & Presets
│       └── src/                 # AdoptedPet, PetCareStats, CustomPetManifest catalogs
│
├── vercel.json                  # Vercel deployment configuration
├── package.json                 # Monorepo root scripts
└── pnpm-workspace.yaml          # Monorepo workspace configuration
```

---

## ⚡ Quick Start & Commands

### Prerequisites
- **Node.js**: v18+ or v22 LTS
- **Package Manager**: `pnpm` v9+ (`npm i -g pnpm`)
- **Rust Toolchain**: `rustc` and `cargo` (`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`)

### Installation

```bash
git clone https://github.com/krishnaUIDev/petto.git
cd petto
pnpm install
```

### 🚀 Simplified Script Commands

| Script Command | Action |
| :--- | :--- |
| **`pnpm dev:website`** | Runs Next.js web portal on `http://localhost:3000` |
| **`pnpm dev:ui`** | Runs Vite desktop companion UI on `http://localhost:1420` |
| **`pnpm dev:app`** | Launches native Tauri desktop window in development mode |
| **`pnpm build:website`** | Builds Next.js web portal for production |
| **`pnpm build:app`** | Compiles native desktop binaries (`Petto.dmg` & `Petto-setup.exe`) |

---

## 🤖 Continuous Integration & CD Pipeline

- **Vercel Web Deployment**: Automatically deploys `apps/web` on every push to `main` branch.
- **GitHub Actions Release Pipeline (`release.yml`)**: On pushes to `main` involving desktop code, the GitHub Action Bot automatically increments versions (`package.json`, `tauri.conf.json`), creates git tags, compiles native `.dmg` (macOS) and `.exe` (Windows) binaries, and publishes them directly to **GitHub Releases**.
- **Vercel Skip CI**: Automated bot version bump commits (`chore(release): v* [skip ci]`) automatically skip redundant web deployments.

---

## 🛠️ Built With

- **[Tauri v2](https://tauri.app/)**: Cross-platform desktop runtime
- **[Rust](https://www.rust-lang.org/)**: Low-level window management, tray, and transparent overlay IPC
- **[React 18](https://react.dev/)**: Desktop companion UI & care dashboard
- **[Next.js 14](https://nextjs.org/)**: Web portal & distribution landing page
- **[NextAuth.js](https://next-auth.js.org/)**: Google & GitHub authentication
- **[HTML5 Canvas 2D](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)**: 60fps sprite rendering engine
- **[pnpm Workspaces](https://pnpm.io/workspaces)**: High-performance monorepo package manager

---

## 📄 License

MIT License © 2026 Petto Team
