'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
      isMetaMask?: boolean;
      on: (eventName: string, handler: (accounts: string[]) => void) => void;
      removeListener: (eventName: string, handler: (accounts: string[]) => void) => void;
    };
  }
}

const ConnectButton = () => {
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setAddress(accounts[0].address);
          setIsConnected(true);
        }
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    }
  };

  const handleClick = async () => {
    if (isConnected) {
      // Disconnect wallet
      setAddress('');
      setIsConnected(false);
      return;
    }

    setLoading(true);
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask to connect your wallet!');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = await provider.getSigner();
      const connectedAddress = await signer.getAddress();
      
      setAddress(connectedAddress);
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
      ) : (
        <>
          {isConnected ? (
            <span>
              {address.slice(0, 6)}...{address.slice(-4)} (Disconnect)
            </span>
          ) : (
            'Connect Wallet'
          )}
        </>
      )}
    </button>
  );
};

export default ConnectButton; 