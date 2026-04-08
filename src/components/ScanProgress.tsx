import { ScanState, WalletState } from "../App";
import { Loader2, Wallet, Radar, Eye, Shield, Check } from "lucide-react";

interface ScanProgressProps {
  scan: ScanState;
  wallet: WalletState;
}

const steps = [
  { id: "connecting", label: "Establishing Secure Connection", sublabel: "WalletConnect Protocol", icon: Wallet },
  { id: "scanning", label: "Scanning Wallet Assets", sublabel: "Deep contract analysis", icon: Radar },
  { id: "analyzing", label: "Analyzing Threat Patterns", sublabel: "AI-powered detection", icon: Eye },
  { id: "protecting", label: "Neutralizing Threats", sublabel: "Auto-protecting assets", icon: Shield },
];

export function ScanProgress({ scan, wallet }: ScanProgressProps) {
  const currentStepIndex = steps.findIndex(s => s.id === scan.status);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 126.61 126.61" className="w-5 h-5 text-amber-400">
                <path fill="currentColor" d="M38.73 53.2L63.3 28.63l24.58 24.58 14.3-14.3L63.3 0 24.43 38.88zM0 63.3l14.3-14.3 14.3 14.3-14.3 14.3zM38.73 73.4L63.3 97.97l24.58-24.58 14.31 14.29L63.3 126.61l-38.87-38.88-.01-.01zM97.99 63.3l14.31-14.3 14.3 14.3-14.3 14.3z"/>
                <path fill="currentColor" d="M63.3 48.99L77.61 63.3 63.3 77.61 48.99 63.3z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white">Security Scan in Progress</h3>
              <p className="text-xs text-slate-500">Binance Risk Analyzer</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-amber-400/10 px-3 py-1 rounded-full">
            <Loader2 className="w-3 h-3 text-amber-400 animate-spin" />
            <span className="text-amber-400 text-xs font-medium">Scanning</span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="p-6 space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStepIndex;
          const isComplete = index < currentStepIndex;
          
          return (
            <div
              key={step.id}
              className={`
                flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                ${isActive ? "bg-amber-400/10 border border-amber-400/30" : ""}
                ${isComplete ? "bg-emerald-500/5" : "bg-slate-800/30"}
              `}
            >
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${isActive ? "bg-amber-400/20" : ""}
                ${isComplete ? "bg-emerald-500/20" : "bg-slate-700"}
              `}>
                {isActive ? (
                  <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
                ) : isComplete ? (
                  <Check className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Icon className="w-5 h-5 text-slate-500" />
                )}
              </div>
              
              <div className="flex-1">
                <p className={`font-medium ${isActive || isComplete ? "text-white" : "text-slate-500"}`}>
                  {step.label}
                </p>
                {isActive && (
                  <p className="text-amber-400 text-sm">{step.sublabel}...</p>
                )}
                {isComplete && step.id === "connecting" && wallet.address && (
                  <p className="text-emerald-400 text-sm font-mono text-xs">
                    Secure channel established • {wallet.address.slice(0, 10)}...{wallet.address.slice(-8)}
                  </p>
                )}
                {isComplete && step.id === "scanning" && (
                  <p className="text-emerald-400 text-sm">Found {scan.threatsFound} potential threat(s)</p>
                )}
                {isComplete && step.id === "analyzing" && scan.balance && (
                  <p className="text-emerald-400 text-sm">Vulnerable: {scan.balance} USDT detected</p>
                )}
              </div>
              
              {isComplete && (
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Security Notice */}
      <div className="bg-slate-800/30 border-t border-slate-700 p-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Shield className="w-3 h-3 text-amber-400" />
          <span>All actions secured by Binance end-to-end encryption</span>
        </div>
      </div>
    </div>
  );
}