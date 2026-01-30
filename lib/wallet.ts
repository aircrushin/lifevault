export type WalletType = 'metamask' | 'coinbase' | 'walletconnect';

export interface ConnectedWallet {
  address: string;
  walletType: WalletType;
}

// Check if MetaMask is installed
export function isMetaMaskInstalled(): boolean {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
}

// Connect to MetaMask
export async function connectMetaMask(): Promise<ConnectedWallet> {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
  }

  try {
    // Request account access
    const accounts = await window.ethereum!.request({
      method: 'eth_requestAccounts',
    });

    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found. Please connect at least one account.');
    }

    const address = accounts[0];
    return {
      address,
      walletType: 'metamask',
    };
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('Connection rejected. Please approve the connection request.');
    }
    throw new Error(error.message || 'Failed to connect to MetaMask');
  }
}

// Get current MetaMask account
export async function getCurrentAccount(): Promise<string | null> {
  if (!isMetaMaskInstalled()) {
    return null;
  }

  try {
    const accounts = await window.ethereum!.request({
      method: 'eth_accounts',
    });

    return accounts && accounts.length > 0 ? accounts[0] : null;
  } catch {
    return null;
  }
}

// Format wallet address for display
export function formatWalletAddress(address: string, chars = 6): string {
  if (!address) return '';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

// Validate Ethereum address
export function isValidEthAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Listen for account changes
export function onAccountsChanged(callback: (account: string | null) => void): () => void {
  if (!isMetaMaskInstalled()) {
    return () => {};
  }

  const handleAccountsChanged = (accounts: string[]) => {
    callback(accounts && accounts.length > 0 ? accounts[0] : null);
  };

  window.ethereum!.on('accountsChanged', handleAccountsChanged);

  // Return cleanup function
  return () => {
    window.ethereum!.removeListener('accountsChanged', handleAccountsChanged);
  };
}

// Listen for chain changes
export function onChainChanged(callback: (chainId: string) => void): () => void {
  if (!isMetaMaskInstalled()) {
    return () => {};
  }

  const handleChainChanged = (chainId: string) => {
    callback(chainId);
  };

  window.ethereum!.on('chainChanged', handleChainChanged);

  // Return cleanup function
  return () => {
    window.ethereum!.removeListener('chainChanged', handleChainChanged);
  };
}

// Get wallet type display name
export function getWalletTypeName(type: WalletType): string {
  const names: Record<WalletType, string> = {
    metamask: 'MetaMask',
    coinbase: 'Coinbase Wallet',
    walletconnect: 'WalletConnect',
  };
  return names[type] || type;
}

// Get wallet type color
export function getWalletTypeColor(type: WalletType): string {
  const colors: Record<WalletType, string> = {
    metamask: 'bg-orange-500/20 text-orange-500',
    coinbase: 'bg-blue-500/20 text-blue-500',
    walletconnect: 'bg-blue-600/20 text-blue-600',
  };
  return colors[type] || 'bg-gray-500/20 text-gray-500';
}

// Get wallet type initials
export function getWalletTypeInitials(type: WalletType): string {
  const initials: Record<WalletType, string> = {
    metamask: 'MM',
    coinbase: 'CB',
    walletconnect: 'WC',
  };
  return initials[type] || type.slice(0, 2).toUpperCase();
}

// Type declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}
