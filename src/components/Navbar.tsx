import React from 'react';
import { Link } from 'react-router-dom';
import { Armchair as Wheelchair, Coffee, Car, Bot, IndianRupee } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg backdrop-blur-sm bg-white/90 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Wheelchair className="h-8 w-8 text-[#0056D2]" />
            <span className="text-xl font-bold text-gradient">Campus Services</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/ai-bot" className="flex items-center space-x-1 text-gray-600 hover:text-[#0056D2] transition-colors">
              <Bot className="h-5 w-5" />
              <span>AI Bot</span>
            </Link>
            <Link to="/buggy" className="flex items-center space-x-1 text-gray-600 hover:text-[#0056D2] transition-colors">
              <Car className="h-5 w-5" />
              <span>Buggy</span>
            </Link>
            <Link to="/task-desk" className="flex items-center space-x-1 text-gray-600 hover:text-[#0056D2] transition-colors">
              <IndianRupee className="h-5 w-5" />
              <span>Service Requests</span>
            </Link>
            <Link to="/canteen" className="flex items-center space-x-1 text-gray-600 hover:text-[#0056D2] transition-colors">
              <Coffee className="h-5 w-5" />
              <span>Canteen</span>
            </Link>
            <Link to="/mobility" className="flex items-center space-x-1 text-gray-600 hover:text-[#0056D2] transition-colors">
              <Wheelchair className="h-5 w-5" />
              <span>Mobility</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}