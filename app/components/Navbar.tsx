'use client';

import React from 'react'
import Link from 'next/link'
import ConnectButton from './ConnectButton'

const Navbar = () => {
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
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar