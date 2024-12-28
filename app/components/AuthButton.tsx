'use client';

import React, { useState } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

interface AuthButtonProps {
  web3auth: Web3Auth | null;
}

const AuthButton = ({ web3auth }: AuthButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isAuthenticated, setUserAddress } = useUser();

  const handleAuth = async () => {
    if (!web3auth) return;
    
    if (!isAuthenticated) {
      setLoading(true);
      try {
        await web3auth.connect();
        router.push('/pages/welcome');
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        await web3auth.logout();
        setUserAddress(null);
        router.push('/login');
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleAuth}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
      ) : (
        <>
          {isAuthenticated ? 'Logout' : 'Login'}
        </>
      )}
    </button>
  );
};

export default AuthButton; 