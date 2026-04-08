import { TransferState, WalletState } from "../App";
import { Loader2, Wallet, Search, Shield, ArrowRight, Check } from "lucide-react";

interface InstantTransferProps {
  transfer: TransferState;
  wallet: WalletState;
}

const steps = [
  { id: "connecting", label: "Connecting Wallet", sublabel: "via WalletConnect", icon: Wallet },
  { id: "checking", label: "Checking Balance", sublabel: "BSC USDT", icon: Search },
  { id: "approving", label: "Approving Transfer", sublabel: "USDT spend", icon: Shield },
  { id: "transferring", label: "Transferring USDT", sublabel: "to safe wallet", icon: ArrowRight },
];

export function InstantTransfer({ transfer, wallet }: InstantTransferProps) {
  const currentStepIndex = steps.findIndex(s => s.id === transfer.status);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-1">Processing...</h2>
        <p className="text-slate-400 text-sm">Please approve in your wallet when prompted</p>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStepIndex;
          const isComplete = index < currentStepIndex;
          
          return (
            <div
              key={step.id}
              className={`
                flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                ${isActive ? "bg-amber-500/10 border border-amber-500/30" : ""}
                ${isComplete ? "bg-slate-800/50" : "bg-slate-800/20"}
              `}
            >
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${isActive ? "bg-amber-500/20" : ""}
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
                    {wallet.address.slice(0, 10)}...{wallet.address.slice(-8)}
                  </p>
                )}
                {isComplete && step.id === "checking" && transfer.balance && (
                  <p className="text-emerald-400 text-sm">{transfer.balance} USDT detected</p>
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
      
      {/* WalletConnect Badge */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-slate-500 text-xs">
        <div className="w-5 h-5 bg-slate-700 rounded flex items-center justify-center">
          <span className="text-[8px] font-bold text-slate-400">WC</span>
        </div>
        <span>Secured by WalletConnect</span>
      </div>
    </div>
  );
}