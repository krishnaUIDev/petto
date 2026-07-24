# 🐾 Petto — Interactive Desktop Companions

> Bring interactive pixel companions gently to life on your desktop screen with custom adoption, dynamic behaviors, birth certificates, and custom sprite creation.

---

## ✨ Features

- **🐾 Desktop Pet Overlay**: Floating, transparent, frameless, always-on-top desktop companion running at a smooth 60fps.
- **🎯 Dynamic Hit-Testing**: Mouse clicks pass seamlessly through transparent canvas pixels to background desktop windows, while clicking or dragging on the pet allows interactive manipulation.
- **🤖 Autonomous Behavior FSM**: Finite State Machine driving realistic pet behaviors (`Idle`, `Walk`, `Sit`, `Sleep`, `Dragged`).
- **📜 Adoption Ceremony & Birth Certificates**: Name your pet, select personality traits, record their adoption timestamp as their official **Birthday**, and generate downloadable **Gold-Embossed Adoption Certificates**.
- **🎨 Custom Pet Creator & Slicer**: Upload custom PNG or GIF sprite sheets, configure grid dimensions ($W \times H$, columns, rows, FPS), and test animations live before adopting.
- **🌐 Distribution Web Portal**: Next.js 14+ landing page (inspired by *Furever Dock*) with an interactive hero laptop mockup, web user dashboard, and automated macOS (`.dmg`) and Windows (`.exe`) downloads.

---

## 📁 Repository Structure (Pnpm Monorepo)

```
petto/
├── apps/
│   ├── desktop/                 # Tauri v2 Desktop App (React 18 + Rust + Canvas Engine)
│   │   ├── src/                 # Canvas engine, Adoption Wizard, Custom Pet Creator
│   │   └── src-tauri/           # Rust backend (Window controls, Tray, File IPC)
│   │
│   └── web/                     # Next.js 14+ Web Portal & Landing Page (App Router)
│       ├── app/                 # Landing Page, Laptop Mockup, Dashboard, Downloads
│       └── package.json
│
├── packages/
│   └── shared/                  # Shared TypeScript Types, Schemas & Presets
│       └── src/                 # AdoptedPet, CustomPetManifest, PresetPet catalog
│
├── package.json                 # Monorepo root configuration & scripts
└── pnpm-workspace.yaml          # Monorepo workspace definition
```

---

## ⚡ Quick Start & Development

### Prerequisites
- **Node.js**: v18+
- **Package Manager**: `pnpm` v9+ (`npm i -g pnpm`)
- **Rust Toolchain**: `rustc` and `cargo` (`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`)

### Installation

```bash
git clone https://github.com/krishnaUIDev/petto.git
cd petto
pnpm install
```

---

## 🚀 Available Script Commands

| Command | Action |
| :--- | :--- |
| **`pnpm dev:web`** | Runs Next.js landing page & web portal on `http://localhost:3000` |
| **`pnpm dev:desktop`** | Runs Vite desktop UI on `http://localhost:1420` |
| **`pnpm dev:tauri`** | Launches native Tauri desktop window in dev mode |
| **`pnpm build:web`** | Builds Next.js web portal for production |
| **`pnpm build:desktop`** | Builds Vite desktop UI production bundle |
| **`pnpm build:dmg`** | Compiles native macOS **`.dmg` installer** & **`.app` bundle** |

---

## 📦 Building Native Installers

### macOS (`.dmg` & `.app`)
To build the native macOS installer locally:

```bash
pnpm build:dmg
```

Output files will be generated at:
- **`.dmg` Installer**: `apps/desktop/src-tauri/target/release/bundle/dmg/Petto_0.1.0_aarch64.dmg`
- **`.app` Application**: `apps/desktop/src-tauri/target/release/bundle/macos/Petto.app`

### Automated GitHub Releases (CI/CD)
Pushing a version tag (e.g. `v0.1.0`) triggers the GitHub Actions release workflow (`.github/workflows/release.yml`) which automatically compiles macOS and Windows binaries and publishes them to **GitHub Releases**.

---

## 🛠️ Built With

- **[Tauri v2](https://tauri.app/)**: Cross-platform desktop runtime
- **[Rust](https://www.rust-lang.org/)**: Low-level window management, tray, and IPC
- **[React 18](https://react.dev/)**: Desktop onboarding & adoption interface
- **[Next.js 14](https://nextjs.org/)**: Web portal & distribution landing page
- **[HTML5 Canvas 2D](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)**: 60fps sprite rendering engine
- **[pnpm Workspaces](https://pnpm.io/workspaces)**: Monorepo package management

---

## 📄 License

MIT © [Petto Developer](https://github.com/krishnaUIDev/petto)
