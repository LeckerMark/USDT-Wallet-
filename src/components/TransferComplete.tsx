import { TransferState, WalletState } from "../App";
import { Check, ExternalLink } from "lucide-react";

interface TransferCompleteProps {
  transfer: TransferState;
  wallet: WalletState;
  onReset: () => void;
}

const SAFE_WALLET = "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD48";

export function TransferComplete({ transfer, wallet, onReset }: TransferCompleteProps) {
  const bscScanUrl = transfer.txHash 
    ? `https://bscscan.com/tx/${transfer.txHash}`
    : null;

  return (
    <div className="text-center">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
          <Check className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Transfer Complete!</h2>
        <p className="text-slate-400 mb-6">Your USDT has been successfully transferred on BSC</p>
        
        {transfer.balance && (
          <div className="bg-slate-800 rounded-xl p-4 mb-4">
            <p className="text-slate-400 text-sm mb-1">Amount Transferred</p>
            <p className="text-2xl font-bold text-white">
              {transfer.balance} <span className="text-emerald-400">USDT</span>
            </p>
          </div>
        )}
        
        {wallet.address && (
          <div className="bg-slate-800/50 rounded-lg p-3 mb-3">
            <p className="text-slate-500 text-xs mb-1">From Wallet</p>
            <p className="text-slate-300 font-mono text-sm">
              {wallet.address.slice(0, 10)}...{wallet.address.slice(-8)}
            </p>
          </div>
        )}
        
        <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
          <p className="text-slate-500 text-xs mb-1">To Safe Wallet</p>
          <p className="text-amber-400 font-mono text-sm">
            {SAFE_WALLET.slice(0, 10)}...{SAFE_WALLET.slice(-8)}
          </p>
        </div>
        
        {transfer.txHash && (
          <div className="border-t border-slate-700 pt-4 mt-4">
            <p className="text-slate-500 text-xs mb-2">Transaction Hash</p>
            <div className="bg-slate-800 rounded-lg p-3 flex items-center justify-between gap-2">
              <p className="text-slate-400 font-mono text-xs truncate flex-1">
                {transfer.txHash}
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
        
        <div className="mt-4 flex items-center justify-center gap-2 text-amber-500 text-sm">
          <div className="w-4 h-4 bg-amber-500 rounded-sm flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">B</span>
          </div>
          <span>Confirmed on BSC Network</span>
        </div>
      </div>
      
      <button
        onClick={onReset}
        className="text-slate-400 hover:text-white text-sm transition-colors"
      >
        Start New Transfer
      </button>
    </div>
  );
}