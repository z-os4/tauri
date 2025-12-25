import React, { useState, useEffect } from 'react';
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

type AppId = 'calculator' | 'terminal' | 'notes' | 'appstore' | 'calendar' |
             'clock' | 'weather' | 'music' | 'photos' | 'stickies' | 'settings';

interface Window {
  id: string;
  appId: AppId;
  title: string;
}

const appComponents: Record<AppId, React.FC<{ onClose: () => void }>> = {
  calculator: ({ onClose }) => <ZCalculator onClose={onClose} />,
  terminal: ({ onClose }) => <ZTerminal onClose={onClose} />,
  notes: ({ onClose }) => <ZNotes onClose={onClose} />,
  appstore: ({ onClose }) => <ZAppStore onClose={onClose} />,
  calendar: ({ onClose }) => <ZCalendar onClose={onClose} />,
  clock: ({ onClose }) => <ZClock onClose={onClose} />,
  weather: ({ onClose }) => <ZWeather onClose={onClose} />,
  music: ({ onClose }) => <ZMusic onClose={onClose} />,
  photos: ({ onClose }) => <ZPhotos onClose={onClose} />,
  stickies: ({ onClose }) => <ZStickies onClose={onClose} />,
  settings: ({ onClose }) => <ZSystemPreferences onClose={onClose} />,
};

const dockItems = [
  { id: 'finder', name: 'Finder', icon: '📁' },
  { id: 'appstore', name: 'App Store', icon: '🏪' },
  { id: 'terminal', name: 'Terminal', icon: '⬛' },
  { id: 'calculator', name: 'Calculator', icon: '🧮' },
  { id: 'notes', name: 'Notes', icon: '📝' },
  { id: 'calendar', name: 'Calendar', icon: '📅' },
  { id: 'music', name: 'Music', icon: '🎵' },
  { id: 'photos', name: 'Photos', icon: '🖼️' },
  { id: 'settings', name: 'Settings', icon: '⚙️' },
];

function App() {
  const [booting, setBooting] = useState(true);
  const [locked, setLocked] = useState(false);
  const [windows, setWindows] = useState<Window[]>([]);

  const openApp = (appId: AppId) => {
    const existing = windows.find(w => w.appId === appId);
    if (existing) {
      // Focus existing window
      return;
    }
    setWindows(prev => [...prev, {
      id: `${appId}-${Date.now()}`,
      appId,
      title: appId.charAt(0).toUpperCase() + appId.slice(1)
    }]);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  if (booting) {
    return <BootSequence onComplete={() => setBooting(false)} duration={2000} />;
  }

  if (locked) {
    return <LockScreen isLocked={locked} onUnlock={() => setLocked(false)} userName="User" />;
  }

  return (
    <ZDesktop wallpaper="/wallpaper.jpg">
      <ZMenuBar appName="Finder" />

      {/* Windows */}
      {windows.map(win => {
        const AppComponent = appComponents[win.appId];
        return (
          <ZWindow
            key={win.id}
            title={win.title}
            onClose={() => closeWindow(win.id)}
            initialPosition={{ x: 100 + Math.random() * 200, y: 50 + Math.random() * 100 }}
            initialSize={{ width: 800, height: 600 }}
          >
            <AppComponent onClose={() => closeWindow(win.id)} />
          </ZWindow>
        );
      })}

      <ZDock
        items={dockItems.map(item => ({
          ...item,
          onClick: () => openApp(item.id as AppId),
          isRunning: windows.some(w => w.appId === item.id)
        }))}
        position="bottom"
        magnification
      />
    </ZDesktop>
  );
}

export default App;
