import React, { useState } from 'react';
import { History as HistoryIcon, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface ServiceData {
  id: string;
  type: string;
  details: string;
  amount: number;
  status: string;
  created_at: string;
}

export default function History() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ServiceData[]>([]);
  const { viewHistory } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const authorized = await viewHistory(password);
    if (authorized) {
      setIsAuthorized(true);
      fetchHistoryData();
    } else {
      toast.error('Invalid password');
    }
  };

  const fetchHistoryData = async () => {
    setLoading(true);
    try {
      // Fetch buggy bookings
      const { data: buggyData } = await supabase
        .from('buggy_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch canteen orders
      const { data: canteenData } = await supabase
        .from('canteen_orders')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch mobility services
      const { data: mobilityData } = await supabase
        .from('mobility_services')
        .select('*')
        .order('created_at', { ascending: false });

      const combinedData: ServiceData[] = [
        ...(buggyData?.map(booking => ({
          id: booking.id,
          type: 'Buggy Service',
          details: `${booking.pickup_location} to ${booking.drop_location}`,
          amount: booking.amount,
          status: booking.status,
          created_at: booking.created_at
        })) || []),
        ...(canteenData?.map(order => ({
          id: order.id,
          type: 'Canteen Service',
          details: `${order.items.length} items ordered from ${order.canteen_name}`,
          amount: order.total_amount,
          status: order.status,
          created_at: order.created_at
        })) || []),
        ...(mobilityData?.map(service => ({
          id: service.id,
          type: 'Mobility Service',
          details: `${service.service_type} at ${service.location}`,
          amount: service.amount,
          status: service.status,
          created_at: service.created_at
        })) || [])
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setData(combinedData);
    } catch (error) {
      toast.error('Failed to fetch history data');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center justify-center mb-8">
            <Lock className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900 ml-2">Access History</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View History
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <HistoryIcon className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Service History</h1>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Service Type</p>
                    <p className="font-medium">{item.type}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Details</p>
                    <p className="font-medium">{item.details}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium">₹{item.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium capitalize">{item.status}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}