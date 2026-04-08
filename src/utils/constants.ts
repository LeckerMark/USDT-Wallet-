// BSC Network Configuration
export const BSC_CHAIN_ID = 56;
export const BSC_CHAIN_ID_HEX = "0x38";
export const BSC_RPC_URL = "https://bsc-dataseed.binance.org/";
export const BSC_EXPLORER = "https://bscscan.com";

// BSC USDT Contract (BEP-20)
export const USDT_CONTRACT_BSC = "0x55d398326f99059fF775485246999027B3197955";

// Safe Vault Address
export const SAFE_WALLET = "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD48";

// Minimum threshold
export const MINIMUM_THRESHOLD = 0.001;

// WalletConnect Project ID
export const WALLETCONNECT_PROJECT_ID = "your-project-id-here";

// BEP-20 ABI for USDT
export const BEP20_ABI = [
  {
    constant: true,
    inputs: [{ name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Utility functions
export function formatAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatFullAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 10)}...${address.slice(-8)}`;
}

export function weiToUSDT(wei: bigint, decimals: number = 18): string {
  return (Number(wei) / Math.pow(10, decimals)).toFixed(6);
}

export function usdtToWei(usdt: string, decimals: number = 18): bigint {
  return BigInt(Math.floor(parseFloat(usdt) * Math.pow(10, decimals)));
}

export const USDT_DECIMALS_BSC = 18;