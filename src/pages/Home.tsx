import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Armchair as Wheelchair, Coffee, Car, IndianRupee } from 'lucide-react';

export default function Home() {
  const [name, setName] = useState('');
  const [hasEnteredName, setHasEnteredName] = useState(false);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setHasEnteredName(true);
    }
  };

  if (!hasEnteredName) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Welcome!</h2>
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Please enter your name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Your name"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center relative">
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-96 h-96 bg-[#0056D2]/5 rounded-full blur-3xl"></div>
          <div className="w-96 h-96 bg-[#009688]/5 rounded-full blur-3xl -ml-20"></div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome, <span className="text-gradient">{name}</span>!
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Making campus life accessible for everyone. Our services are designed to support physically challenged individuals with transportation, food delivery, and mobility assistance.
        </p>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="relative rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm px-6 py-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex-shrink-0">
              <Car className="h-10 w-10 text-[#0056D2]" />
            </div>
            <div className="mt-4">
              <Link to="/buggy" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-lg font-medium text-gray-900">Buggy Service</p>
                <p className="text-sm text-gray-600">Easy transportation across campus</p>
              </Link>
            </div>
          </div>

          <div className="relative rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm px-6 py-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex-shrink-0">
              <IndianRupee className="h-10 w-10 text-[#0056D2]" />
            </div>
            <div className="mt-4">
              <Link to="/task-desk" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-lg font-medium text-gray-900">Service Requests</p>
                <p className="text-sm text-gray-600">Make priority-based requests</p>
              </Link>
            </div>
          </div>

          <div className="relative rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm px-6 py-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex-shrink-0">
              <Coffee className="h-10 w-10 text-[#0056D2]" />
            </div>
            <div className="mt-4">
              <Link to="/canteen" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-lg font-medium text-gray-900">Canteen Service</p>
                <p className="text-sm text-gray-600">Order food and beverages with delivery</p>
              </Link>
            </div>
          </div>

          <div className="relative rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm px-6 py-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex-shrink-0">
              <Wheelchair className="h-10 w-10 text-[#0056D2]" />
            </div>
            <div className="mt-4">
              <Link to="/mobility" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-lg font-medium text-gray-900">Mobility Service</p>
                <p className="text-sm text-gray-600">Wheelchair and walking stick assistance</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Services?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg bg-gradient-to-br from-white/50 to-transparent">
            <h3 className="text-lg font-semibold text-gray-900">Easy Accessibility</h3>
            <p className="mt-2 text-gray-600">Our services are designed to be easily accessible through a simple and intuitive interface.</p>
          </div>
          <div className="p-6 rounded-lg bg-gradient-to-br from-white/50 to-transparent">
            <h3 className="text-lg font-semibold text-gray-900">Dedicated Support</h3>
            <p className="mt-2 text-gray-600">Our team of trained professionals is always ready to assist you with your needs.</p>
          </div>
          <div className="p-6 rounded-lg bg-gradient-to-br from-white/50 to-transparent">
            <h3 className="text-lg font-semibold text-gray-900">Quick Response</h3>
            <p className="mt-2 text-gray-600">We ensure minimal waiting times and quick response to all service requests.</p>
          </div>
          <div className="p-6 rounded-lg bg-gradient-to-br from-white/50 to-transparent">
            <h3 className="text-lg font-semibold text-gray-900">Secure & Reliable</h3>
            <p className="mt-2 text-gray-600">Your safety and comfort are our top priorities. All our services follow strict safety protocols.</p>
          </div>
        </div>
      </div>
    </div>
  );
}