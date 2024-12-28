'use client';

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base"
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal"
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider"
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter"
import AuthButton from './AuthButton'

const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"


const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
}

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
}

const Navbar = () => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth(web3AuthOptions);
        const adapters = await getDefaultExternalAdapters({ options: web3AuthOptions });
        adapters.forEach((adapter) => {
          web3auth.configureAdapter(adapter);
        });
        await web3auth.initModal();
        setWeb3auth(web3auth);
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">Asset Manager</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/pages/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              Dashboard
            </Link>
            <Link href="/pages/assets" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              Assets
            </Link>
            <Link href="/pages/family" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              Manage Family
            </Link>
            <AuthButton web3auth={web3auth} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar