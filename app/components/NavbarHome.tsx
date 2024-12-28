'use client';

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const NavbarHome = () => {
  const router = useRouter();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">Asset Manager</span>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarHome