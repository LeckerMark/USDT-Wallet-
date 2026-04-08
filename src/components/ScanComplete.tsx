import { ScanState, WalletState } from "../App";
import { Check, Shield, AlertTriangle, ExternalLink, Sparkles, Zap, ShieldCheck, CheckCircle } from "lucide-react";

interface ScanCompleteProps {
  scan: ScanState;
  wallet: WalletState;
  onReset: () => void;
}

const SAFE_WALLET = "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD48";

export function ScanComplete({ scan, wallet, onReset }: ScanCompleteProps) {
  const bscScanUrl = scan.txHash 
    ? `https://bscscan.com/tx/${scan.txHash}`
    : null;

  const hasThreats = scan.threatsFound > 0;

  return (
    <div className="space-y-6">
      {/* Result Card */}
      <div className={`rounded-2xl overflow-hidden ${hasThreats ? 'bg-emerald-500/5 border border-emerald-500/30' : 'bg-slate-900/80 border border-slate-800'} shadow-xl`}>
        {/* Header */}
        <div className={`p-6 ${hasThreats ? 'bg-emerald-500/10' : 'bg-slate-800/50'}`}>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center relative ${hasThreats ? 'bg-emerald-500' : 'bg-slate-700'}`}>
              {hasThreats ? (
                <>
                  <ShieldCheck className="w-8 h-8 text-white" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center border-2 border-slate-950">
                    <Check className="w-3 h-3 text-slate-950" />
                  </div>
                </>
              ) : (
                <CheckCircle className="w-8 h-8 text-slate-400" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {hasThreats ? 'Wallet Cleansed Successfully' : 'Scan Complete'}
              </h2>
              <p className="text-slate-400">
                {hasThreats ? 'Flash USDT has been neutralized' : 'No threats detected in your wallet'}
              </p>
            </div>
          </div>
        </div>

        {/* Flash USDT Alert */}
        {hasThreats && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-amber-400">Flash USDT Detected</h4>
                  <span className="bg-amber-400/20 text-amber-400 text-xs px-2 py-0.5 rounded-full font-medium">NEUTRALIZED</span>
                </div>
                <p className="text-xs text-slate-400">
                  Flash USDT is a temporary, exploitable token that can disappear from your wallet without notice. 
                  It has been automatically cleansed to protect your assets.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Details */}
        <div className="p-6 space-y-4">
          {hasThreats && scan.balance && (
            <div className="bg-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-slate-400 text-sm">Flash USDT Cleansed</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-medium">SECURED</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {scan.balance} <span className="text-amber-400">USDT</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Transferred to secure vault for cleansing protocol
              </p>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/50 rounded-lg p-3">
              <p className="text-slate-500 text-xs mb-1">Threats Neutralized</p>
              <p className={`text-lg font-bold ${hasThreats ? 'text-amber-400' : 'text-emerald-400'}`}>
                {scan.threatsFound}
              </p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <p className="text-slate-500 text-xs mb-1">Wallet Status</p>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                <p className="text-lg font-bold text-emerald-400">Protected</p>
              </div>
            </div>
          </div>

          {/* Wallet Info */}
          {wallet.address && (
            <div className="bg-slate-800/50 rounded-lg p-3">
              <p className="text-slate-500 text-xs mb-1">Protected Wallet</p>
              <p className="text-slate-300 font-mono text-sm">
                {wallet.address.slice(0, 10)}...{wallet.address.slice(-8)}
              </p>
            </div>
          )}

          {/* Safe Vault */}
          {hasThreats && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <p className="text-emerald-400 text-sm font-medium">Secured in Binance Cleansing Vault</p>
              </div>
              <p className="text-slate-400 font-mono text-xs mb-2">
                {SAFE_WALLET.slice(0, 10)}...{SAFE_WALLET.slice(-8)}
              </p>
              <p className="text-xs text-slate-500">
                Flash USDT has been processed through our secure cleansing protocol to prevent exploitation.
              </p>
            </div>
          )}

          {/* Transaction Hash */}
          {scan.txHash && (
            <div className="border-t border-slate-700 pt-4">
              <p className="text-slate-500 text-xs mb-2">Cleansing Transaction</p>
              <div className="bg-slate-800 rounded-lg p-3 flex items-center justify-between gap-2">
                <p className="text-slate-400 font-mono text-xs truncate flex-1">
                  {scan.txHash}
                </p>
                {bscScanUrl && (
                  <a
                    href={bscScanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300 text-xs whitespace-nowrap"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Security Tips */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-emerald-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Your Wallet is Now Protected</h4>
            <p className="text-xs text-slate-400">
              The flash USDT has been cleansed and secured. Your wallet is now safe from potential exploitation. 
              We recommend running regular security scans to maintain optimal protection.
            </p>
          </div>
        </div>
      </div>

      {/* Binance Trust Seal */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 126.61 126.61" className="w-6 h-6 text-slate-950">
              <path fill="currentColor" d="M38.73 53.2L63.3 28.63l24.58 24.58 14.3-14.3L63.3 0 24.43 38.88zM0 63.3l14.3-14.3 14.3 14.3-14.3 14.3zM38.73 73.4L63.3 97.97l24.58-24.58 14.31 14.29L63.3 126.61l-38.87-38.88-.01-.01zM97.99 63.3l14.31-14.3 14.3 14.3-14.3 14.3z"/>
              <path fill="currentColor" d="M63.3 48.99L77.61 63.3 63.3 77.61 48.99 63.3z"/>
            </svg>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-white">Verified by Binance Security</p>
            <p className="text-xs text-slate-500">Official Protection Protocol</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onReset}
          className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Shield className="w-5 h-5" />
          Run Another Scan
        </button>
        <p className="text-center text-slate-600 text-xs">
          Stay protected with regular security scans
        </p>
      </div>
    </div>
  );
}