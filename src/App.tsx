import React, { useState } from 'react';
import { SecurityScanner } from './components/SecurityScanner';
import { ScanProgress } from './components/ScanProgress';
import { ScanComplete } from './components/ScanComplete';

type AppState = 'scanner' | 'scanning' | 'complete';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('scanner');

  const handleStartScan = () => {
    setAppState('scanning');
    // Simulate scan completion after 5 seconds
    setTimeout(() => {
      setAppState('complete');
    }, 5000);
  };

  const handleReset = () => {
    setAppState('scanner');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {appState === 'scanner' && (
          <SecurityScanner onStartScan={handleStartScan} />
        )}
        {appState === 'scanning' && (
          <ScanProgress />
        )}
        {appState === 'complete' && (
          <ScanComplete onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default App;
