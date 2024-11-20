import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">Asset Manager</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              Home
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              Dashboard
            </Link>
            <Link href="/assets" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              Assets
            </Link>
            <Link href="/settings" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar