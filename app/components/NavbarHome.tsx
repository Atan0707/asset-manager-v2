'use client';

import React from 'react'
import Link from 'next/link'
import ConnectButton from './ConnectButton';

const NavbarHome = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">Asset Manager</span>
          </Link>

          <div className="flex items-center space-x-4">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarHome