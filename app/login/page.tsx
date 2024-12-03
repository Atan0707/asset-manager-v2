'use client';

import React, { useEffect, useState } from 'react';
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { ethers, JsonRpcSigner } from "ethers";

const Login = () => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: "BBHOVbA7NXfTvBDD_AGBESowQ7Eu9dR_2ZnXX71ktS6k6iJf6xi-DXdW0cP5Y-6OSiEldR8x2ZhlV_DIDvA2LGU", // Get this from Web3Auth Dashboard
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1", // Ethereum mainnet
            rpcTarget: "https://rpc.ankr.com/eth",
          },
        });

        await web3auth.initModal();
        setWeb3auth(web3auth);
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("Web3Auth not initialized");
      return;
    }
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      if (web3authProvider) {
        const ethersProvider = new ethers.BrowserProvider(web3authProvider);
        const signer: JsonRpcSigner = await ethersProvider.getSigner();
        const userAddress = await signer.getAddress();
        setAddress(userAddress);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("Web3Auth not initialized");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setAddress("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to Asset Manager
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in with your Web3 wallet
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          {!address ? (
            <button
              onClick={login}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login with Web3Auth
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-sm text-gray-600">
                Connected Address: {address}
              </p>
              <button
                onClick={logout}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;