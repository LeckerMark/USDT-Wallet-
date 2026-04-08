import { Button } from "./ui/button";
import { WalletState, FlowState } from "../App";
import { useState } from "react";
import { Wallet, Check, AlertCircle } from "lucide-react";

interface WalletConnectorProps {
  wallet: WalletState;
  flow: FlowState;
  onConnect: (address: string, chainId: number) => void;
  onDisconnect: () => void;
}

export function WalletConnector({ wallet, flow, onConnect, onDisconnect }: WalletConnectorProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock wallet connection
    const mockAddress = "0x" + Array.from({ length: 40 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    
    onConnect(mockAddress, 1);
    setIsConnecting(false);
  };

  if (wallet.connected && wallet.address) {
    const getStatusColor = () => {
      if (flow.step === "complete") return "bg-emerald-500";
      if (flow.step === "error") return "bg-red-500";
      if (flow.step === "transferring" || flow.step === "checking") return "bg-amber-500 animate-pulse";
      return "bg-emerald-500 animate-pulse";
    };

    const getStatusIcon = () => {
      if (flow.step === "complete") return <Check className="w-3 h-3" />;
      if (flow.step === "error") return <AlertCircle className="w-3 h-3" />;
      return null;
    };

    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-lg border border-slate-700">
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
          <span className="text-sm font-mono text-slate-300">
            {formatAddress(wallet.address)}
          </span>
          {getStatusIcon() && (
            <div className="w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center">
              {getStatusIcon()}
            </div>
          )}
        </div>
        {flow.step === "complete" || flow.step === "error" ? (
          <Button
            variant="outline"
            size="sm"
            onClick={onDisconnect}
            className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white text-xs"
          >
            Disconnect
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold px-6 shadow-lg shadow-emerald-500/25"
    >
      {isConnecting ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Connecting...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </span>
      )}
    </Button>
  );
}