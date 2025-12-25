# zOS Desktop App v4.2.0

Download and run zOS as a native desktop application built with [Tauri](https://tauri.app).

## Download

Download the latest release for your platform:
- **macOS**: [zOS.app.dmg](https://github.com/z-os4/tauri/releases/latest)
- **Windows**: [zOS.msi](https://github.com/z-os4/tauri/releases/latest)
- **Linux**: [zOS.AppImage](https://github.com/z-os4/tauri/releases/latest)

## Build from Source

### Prerequisites
- Node.js 18+
- Rust 1.70+
- [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)

### Install & Run
```bash
npm install
npm run tauri:dev
```

### Build Release
```bash
npm run tauri:build
```

Built binaries will be in `src-tauri/target/release/bundle/`.

## Features
- Native performance with Tauri/Rust backend
- Small bundle size (~5MB vs Electron's 150MB+)
- Full zOS desktop environment
- Native system tray integration
- Native file system access
- Auto-updates support

## Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Rust + Tauri 2.0
- **UI**: @z-os/desktop, @z-os/ui, @z-os/apps, @z-os/sdk

## License
MIT
