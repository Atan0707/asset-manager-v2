'use client';

import React, { useEffect, useState } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { useRouter } from 'next/navigation';

const WelcomePage = () => {
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAddress = async () => {
      const web3auth = (window as any).web3auth; // Access the Web3Auth instance from the window object
      if (web3auth && web3auth.connected) {
        const provider = await web3auth.getProvider();
        const accounts = await provider.request({ method: 'eth_accounts' });
        setUserAddress(accounts[0]);
      } else {
        // router.push('/login'); // Redirect to login if not connected
        console.log("account not connected")
        
      }
    };

    fetchUserAddress();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
        {userAddress ? (
          <p className="text-lg">Your address: <span className="font-mono">{userAddress}</span></p>
        ) : (
          <p className="text-lg">Loading your address...</p>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;