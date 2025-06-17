import React, { useState } from 'react';
import { Armchair as Wheelchair } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MobilityService() {
  const [serviceType, setServiceType] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('60');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const durationMinutes = parseInt(duration);
    if (isNaN(durationMinutes) || durationMinutes <= 0) {
      toast.error('Please enter a valid duration');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/request_service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceType: serviceType,
          location: location,
          duration: duration,
        }),
      });

      if (response.ok) {
        toast.success('Service requested successfully');
        setServiceType('');
        setLocation('');
        setDuration('60');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to request service: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error requesting service:', error);
      toast.error('Failed to request service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Wheelchair className="h-8 w-8 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold">Mobility Assistance</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
              Service Type
            </label>
            <select
              id="serviceType"
              required
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Select a service</option>
              <option value="wheelchair">Wheelchair Assistance</option>
              <option value="walking_stick">Walking Stick</option>
              <option value="personal_assistant">Personal Assistant</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter your location"
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              min="30"
              step="30"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Requesting...' : 'Request Service'}
          </button>
        </form>
      </div>
    </div>
  );
}