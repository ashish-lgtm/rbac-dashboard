import React, { useState } from 'react';
import { Users, Shield, Key, X } from 'lucide-react';

// Modify navigation to be more mobile-friendly
const MobileMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen, setActiveTab, activeTab }) => {
    return (
      <div className={`
        fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col">
          <button
            onClick={() => {
              setActiveTab('users');
              setIsMobileMenuOpen(false);
            }}
            className={`p-4 text-left ${
              activeTab === 'users' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
          >
            <Users className="h-5 w-5 mr-2 inline" /> Users
          </button>
          <button
            onClick={() => {
              setActiveTab('roles');
              setIsMobileMenuOpen(false);
            }}
            className={`p-4 text-left ${
              activeTab === 'roles' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
          >
            <Shield className="h-5 w-5 mr-2 inline" /> Roles
          </button>
          <button
            onClick={() => {
              setActiveTab('permissions');
              setIsMobileMenuOpen(false);
            }}
            className={`p-4 text-left ${
              activeTab === 'permissions' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
          >
            <Key className="h-5 w-5 mr-2 inline" /> Permissions
          </button>
        </div>
      </div>
    );
};

export default MobileMenu
