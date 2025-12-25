# zOS Desktop Shell v4.2.0

Minimal native wrapper for [zOS](https://github.com/z-os4) - a web-based operating system.

## Architecture

```
┌─────────────────────────────────────┐
│           Tauri Shell (~2MB)        │  ← Native window container
├─────────────────────────────────────┤
│                                     │
│     zOS (100% Browser/Web)          │  ← All logic runs here
│                                     │
│  ┌─────────┐ ┌─────────┐ ┌───────┐  │
│  │@z-os/ui │ │@z-os/   │ │@z-os/ │  │
│  │         │ │  apps   │ │desktop│  │
│  └─────────┘ └─────────┘ └───────┘  │
│                                     │
└─────────────────────────────────────┘
```

**zOS runs 100% in the browser.** Tauri is just a thin shell providing:
- Native window frame
- Desktop icon/launcher
- Native API bridge (file system, notifications, clipboard, etc.)
- System tray integration
- Auto-updates

## Download

- **macOS**: [zOS.dmg](https://github.com/z-os4/tauri/releases/latest)
- **Windows**: [zOS.msi](https://github.com/z-os4/tauri/releases/latest)
- **Linux**: [zOS.AppImage](https://github.com/z-os4/tauri/releases/latest)

## Run in Browser (No Download)

zOS works fully in any modern browser:
```
https://zos.hanzo.ai
```

## Build from Source

```bash
# Prerequisites: Node.js 18+, Rust 1.70+

npm install
npm run tauri:build
```

Binary size: ~2-5MB (vs Electron's 150MB+)

## Development

```bash
npm run tauri:dev   # With native shell
npm run dev         # Browser only (recommended)
```

## Web-First Philosophy

All zOS packages are pure web/browser code:
- `@z-os/sdk` - App SDK (React hooks)
- `@z-os/ui` - Window, Dock components
- `@z-os/apps` - Calculator, Terminal, etc.
- `@z-os/desktop` - Desktop environment

No native dependencies. Works in any browser. Tauri is optional.

## License

MIT
