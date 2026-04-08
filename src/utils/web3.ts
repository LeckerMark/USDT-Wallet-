// Web3 utility functions

export const USDT_CONTRACT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
export const SAFE_WALLET = "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD48";
export const MINIMUM_THRESHOLD = 0.001;

// ERC20 ABI for USDT
export const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
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

export function formatAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function weiToUSDT(wei: bigint): string {
  return (Number(wei) / 1e6).toFixed(6);
}

export function usdtToWei(usdt: string): bigint {
  return BigInt(Math.floor(parseFloat(usdt) * 1e6));
}