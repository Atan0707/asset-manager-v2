'use client';

import React, { useEffect, useState } from 'react';
import { Web3Auth } from '@web3auth/modal';

interface AuthButtonProps {
  web3auth: Web3Auth | null;
}

const AuthButton = ({ web3auth }: AuthButtonProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (web3auth) {
      setIsConnected(web3auth.connected);
    }
  }, [web3auth]);

  const handleAuth = async () => {
    if (!web3auth) return;
    
    setLoading(true);
    try {
      if (isConnected) {
        await web3auth.logout();
        setIsConnected(false);
      } else {
        await web3auth.connect();
        setIsConnected(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAuth}
      disabled={loading || !web3auth}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
      ) : (
        <>
          {isConnected ? 'Disconnect' : 'Connect Wallet'}
        </>
      )}
    </button>
  );
};

export default AuthButton; 