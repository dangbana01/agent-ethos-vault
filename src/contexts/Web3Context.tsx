import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface Web3ContextType {
  account: string | null;
  provider: ethers.BrowserProvider | null;
  connecting: boolean;
  connectWallet: () => Promise<void>;
  disconnect: () => void;
  sendETH: (to: string, amount: string) => Promise<string>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);

      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    setConnecting(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      
      // Switch to Sepolia testnet
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }], // Sepolia testnet
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xaa36a7',
                chainName: 'Sepolia test network',
                rpcUrls: ['https://sepolia.infura.io/v3/'],
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://sepolia.etherscan.io'],
              },
            ],
          });
        }
      }

      setAccount(accounts[0]);
      setProvider(provider);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setProvider(null);
  };

  const sendETH = async (to: string, amount: string): Promise<string> => {
    if (!provider || !account) {
      throw new Error('Wallet not connected');
    }

    const signer = await provider.getSigner();
    const tx = await signer.sendTransaction({
      to,
      value: ethers.parseEther(amount),
    });

    return tx.hash;
  };

  const value = {
    account,
    provider,
    connecting,
    connectWallet,
    disconnect,
    sendETH,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};