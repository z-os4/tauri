/**
 * Bundled zOS - For offline/self-hosted usage
 * Same code that runs on the web, just bundled locally
 */

import React, { useState } from 'react';

// These are 100% browser packages - no native dependencies
import { ZDesktop, ZDock, ZMenuBar, BootSequence, LockScreen } from '@z-os/desktop';
import { ZWindow } from '@z-os/ui';
import {
  ZCalculator,
  ZTerminal,
  ZNotes,
  ZAppStore,
  ZCalendar,
  ZClock,
  ZWeather,
  ZMusic,
  ZPhotos,
  ZStickies,
  ZSystemPreferences
} from '@z-os/apps';

type AppId = keyof typeof apps;

const apps = {
  calculator: { title: 'Calculator', icon: '🧮', component: ZCalculator },
  terminal: { title: 'Terminal', icon: '⬛', component: ZTerminal },
  notes: { title: 'Notes', icon: '📝', component: ZNotes },
  appstore: { title: 'App Store', icon: '🏪', component: ZAppStore },
  calendar: { title: 'Calendar', icon: '📅', component: ZCalendar },
  clock: { title: 'Clock', icon: '🕐', component: ZClock },
  weather: { title: 'Weather', icon: '🌤️', component: ZWeather },
  music: { title: 'Music', icon: '🎵', component: ZMusic },
  photos: { title: 'Photos', icon: '🖼️', component: ZPhotos },
  stickies: { title: 'Stickies', icon: '📌', component: ZStickies },
  settings: { title: 'Settings', icon: '⚙️', component: ZSystemPreferences },
} as const;

interface OpenWindow {
  id: string;
  appId: AppId;
}

export default function BundledZOS() {
  const [booting, setBooting] = useState(true);
  const [locked, setLocked] = useState(false);
  const [windows, setWindows] = useState<OpenWindow[]>([]);

  const openApp = (appId: AppId) => {
    if (!windows.some(w => w.appId === appId)) {
      setWindows(prev => [...prev, { id: `${appId}-${Date.now()}`, appId }]);
    }
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  if (booting) {
    return <BootSequence onComplete={() => setBooting(false)} duration={1500} />;
  }

  if (locked) {
    return <LockScreen isLocked onUnlock={() => setLocked(false)} userName="User" />;
  }

  return (
    <ZDesktop>
      <ZMenuBar appName="Finder" />

      {windows.map(win => {
        const app = apps[win.appId];
        const Component = app.component;
        return (
          <ZWindow
            key={win.id}
            title={app.title}
            onClose={() => closeWindow(win.id)}
            initialPosition={{ x: 100 + Math.random() * 200, y: 50 + Math.random() * 100 }}
            initialSize={{ width: 800, height: 600 }}
          >
            <Component />
          </ZWindow>
        );
      })}

      <ZDock
        items={Object.entries(apps).map(([id, app]) => ({
          id,
          name: app.title,
          icon: app.icon,
          onClick: () => openApp(id as AppId),
          isRunning: windows.some(w => w.appId === id),
        }))}
      />
    </ZDesktop>
  );
}
