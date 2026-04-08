// Type definitions for the USDT Vault application

export interface WalletInfo {
  address: string;
  chainId: number;
  connected: boolean;
}

export interface TokenBalance {
  symbol: string;
  balance: string;
  decimals: number;
  contractAddress: string;
}

export interface TransferStatus {
  status: "idle" | "approving" | "approved" | "transferring" | "success" | "error";
  txHash?: string;
  error?: string;
}

export interface NetworkInfo {
  chainId: number;
  name: string;
  symbol: string;
  rpcUrl: string;
  explorerUrl: string;
}

export interface TransactionPayload {
  to: string;
  from: string;
  value: string;
  data?: string;
  gasLimit?: string;
  gasPrice?: string;
}