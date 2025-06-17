import React, { useState } from 'react';
import { Car, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

// Predefined locations for the dropdowns
const LOCATIONS = [
  'A Block',
  'B Block',
  'C Block',
  'D Block',
  'E Block',
  'F Block',
  'G Block',
  'H Block'
];

// Actual distances between locations in meters
const DISTANCES: { [key: string]: { [key: string]: number } } = {
  'A Block': {
    'B Block': 80,
    'C Block': 130,
    'D Block': 170,
    'E Block': 110,
    'F Block': 80,
    'G Block': 70,
    'H Block': 220
  },
  'B Block': {
    'C Block': 50,
    'D Block': 100,
    'E Block': 180,
    'F Block': 160,
    'G Block': 160,
    'H Block': 140
  },
  'C Block': {
    'D Block': 110,
    'E Block': 240,
    'F Block': 210,
    'G Block': 210,
    'H Block': 150
  },
  'D Block': {
    'E Block': 270,
    'F Block': 250,
    'G Block': 250,
    'H Block': 40
  },
  'E Block': {
    'F Block': 20,
    'G Block': 20,
    'H Block': 300
  },
  'F Block': {
    'G Block': 10,
    'H Block': 290
  },
  'G Block': {
    'H Block': 290
  }
};

export default function BuggyService() {
  const [name, setName] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [distance, setDistance] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // Calculate distance based on selected locations
  React.useEffect(() => {
    if (pickup && dropoff && pickup !== dropoff) {
      // Check both directions since distance is the same
      const calculatedDistance = 
        DISTANCES[pickup]?.[dropoff] || 
        DISTANCES[dropoff]?.[pickup] || 
        0;
      setDistance(calculatedDistance);
    } else {
      setDistance(0);
    }
  }, [pickup, dropoff]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!distance) return;

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/book_buggy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          pickup: pickup,
          dropoff: dropoff,
        }),
      });

      if (response.ok) {
        toast.success('Buggy service booked successfully');
        setName('');
        setPickup('');
        setDropoff('');
        setDistance(0);
      } else {
        const errorData = await response.json();
        toast.error(`Failed to book buggy service: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error booking buggy:', error);
      toast.error('Failed to book buggy service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Car className="h-8 w-8 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold">Book a Buggy</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-3 pr-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="pickup" className="block text-sm font-medium text-gray-700">
              Pickup Location
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="pickup"
                required
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="block w-full pl-10 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Select pickup location</option>
                {LOCATIONS.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="dropoff" className="block text-sm font-medium text-gray-700">
              Drop-off Location
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="dropoff"
                required
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="block w-full pl-10 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Select drop-off location</option>
                {LOCATIONS.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Distance
            </label>
            <p className="mt-1 text-lg font-medium text-indigo-600">{distance} meters</p>
          </div>

          <button
            type="submit"
            disabled={loading || !name || !pickup || !dropoff || pickup === dropoff}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Booking...' : 'Book Buggy'}
          </button>
          {pickup === dropoff && pickup && (
            <p className="text-sm text-red-600 text-center">Pickup and drop-off locations cannot be the same</p>
          )}
        </form>
      </div>
    </div>
  );
}