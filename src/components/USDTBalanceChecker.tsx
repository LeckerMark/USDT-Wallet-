import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { WalletState, USDTBalance } from "../App";
import { useState } from "react";
import { Check, X } from "lucide-react";

interface USDTBalanceCheckerProps {
  wallet: WalletState;
  onBalanceUpdate: (balance: string) => void;
  balance: USDTBalance | null;
}

export function USDTBalanceChecker({ wallet, onBalanceUpdate, balance }: USDTBalanceCheckerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const checkBalance = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock balance - in production, query the blockchain
    const mockBalance = (Math.random() * 10).toFixed(6);
    onBalanceUpdate(mockBalance);
    setIsLoading(false);
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
            <span className="text-emerald-400 text-sm font-bold">$</span>
          </div>
          USDT Balance
        </CardTitle>
        <CardDescription className="text-slate-400">
          Check your current USDT balance on Ethereum
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {balance ? (
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Available Balance</p>
                <p className="text-3xl font-bold text-white">
                  {parseFloat(balance.balance).toLocaleString()} <span className="text-emerald-400 text-lg">USDT</span>
                </p>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                balance.hasMinimum 
                  ? "bg-emerald-500/20 text-emerald-400" 
                  : "bg-red-500/20 text-red-400"
              }`}>
                {balance.hasMinimum ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Eligible</span>
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4" />
                    <span className="text-sm font-medium">Below threshold</span>
                  </>
                )}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700">
              <p className="text-slate-500 text-xs">
                Minimum threshold: 0.001 USDT required for transfer
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/50 rounded-xl p-6 border-2 border-dashed border-slate-700 text-center">
            <p className="text-slate-500">Click below to check your balance</p>
          </div>
        )}
        
        <Button
          onClick={checkBalance}
          disabled={isLoading}
          variant="outline"
          className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Checking...
            </span>
          ) : (
            "Check Balance"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}