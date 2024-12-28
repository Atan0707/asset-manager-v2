'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { ethers } from 'ethers';

interface UserContextType {
  userAddress: string | null;
  setUserAddress: (address: string | null) => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType>({
  userAddress: null,
  setUserAddress: () => {},
  isAuthenticated: false,
});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userAddress, setUserAddress] = useState<string | null>(null);

  useEffect(() => {
    const getUserAddress = async () => {
      try {
        if (window.web3auth && window.web3auth.connected) {
          const web3authProvider = await window.web3auth.provider;
          if (web3authProvider) {
            const ethersProvider = new ethers.BrowserProvider(web3authProvider);
            const signer = await ethersProvider.getSigner();
            const address = await signer.getAddress();
            setUserAddress(address);
          }
        } else {
          setUserAddress(null);
        }
      } catch (error) {
        console.error("Error getting user address:", error);
        setUserAddress(null);
      }
    };

    getUserAddress();

    // Set up event listeners for Web3Auth
    const handleConnected = () => getUserAddress();
    const handleDisconnected = () => setUserAddress(null);

    if (window.web3auth) {
      window.web3auth.on("connected", handleConnected);
      window.web3auth.on("disconnected", handleDisconnected);
    }

    return () => {
      if (window.web3auth) {
        window.web3auth.off("connected", handleConnected);
        window.web3auth.off("disconnected", handleDisconnected);
      }
    };
  }, []);

  return (
    <UserContext.Provider 
      value={{ 
        userAddress, 
        setUserAddress,
        isAuthenticated: !!userAddress 
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Type definition for window object
declare global {
  interface Window {
    web3auth?: Web3Auth;
  }
} 