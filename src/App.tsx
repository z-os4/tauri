/**
 * zOS Tauri Shell - Thin wrapper for web-based zOS
 *
 * This is NOT the zOS app - it's just a lightweight shell.
 * All zOS code runs 100% in the browser via @z-os/* packages.
 * Tauri provides: native window chrome, system tray, and file system bridge.
 */

import React, { useEffect } from 'react';

// The actual zOS runs entirely in the browser
// This shell just provides native window management
const HOSTED_ZOS_URL = 'https://zos.hanzo.ai';

function App() {
  useEffect(() => {
    // Optional: Bridge native features to web context
    // But zOS works 100% without these
    if (window.__TAURI__) {
      console.log('Running in Tauri shell - native features available');
    }
  }, []);

  // Option 1: Load hosted zOS (smallest bundle, always latest)
  // Option 2: Bundle zOS packages (offline support)

  const useHosted = import.meta.env.VITE_USE_HOSTED !== 'false';

  if (useHosted) {
    return (
      <iframe
        src={HOSTED_ZOS_URL}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
        }}
        allow="clipboard-read; clipboard-write; fullscreen"
      />
    );
  }

  // Fallback: Dynamic import of web packages (for offline)
  return <BundledZOS />;
}

// Lazy-loaded bundled version for offline support
const BundledZOS = React.lazy(() => import('./BundledZOS'));

export default App;
