'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
// import ConnectButton from '@/app/components/ConnectButton';

const Welcome = () => {
  const [address, setAddress] = useState<string>('');
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

  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
      } else {
        setAddress('');
        setIsConnected(false);
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Welcome to Asset Manager
          </h1>
          

          {isConnected && (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Connected Wallet
              </h2>
              <p className="text-gray-600">
                Your wallet address:
              </p>
              <p className="text-blue-600 font-mono mt-2">
                {address}
              </p>
            </div>
          )}

          {!isConnected && (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Get Started
              </h2>
              <p className="text-gray-600">
                Connect your wallet to start managing your assets
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;