import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, Coffee, Armchair as Wheelchair, Clock, IndianRupee } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface ServiceSummary {
  buggy_count: number;
  canteen_count: number;
  mobility_count: number;
  total_spent: number;
}

interface RecentActivity {
  id: string;
  type: 'buggy' | 'canteen' | 'mobility';
  details: string;
  amount: number;
  status: string;
  created_at: string;
}

export default function Dashboard() {
  const [summary, setSummary] = useState<ServiceSummary>({
    buggy_count: 0,
    canteen_count: 0,
    mobility_count: 0,
    total_spent: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
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

      // Calculate summary
      const buggyCount = buggyData?.length || 0;
      const canteenCount = canteenData?.length || 0;
      const mobilityCount = mobilityData?.length || 0;
      const totalSpent = [
        ...(buggyData || []),
        ...(canteenData || []),
        ...(mobilityData || [])
      ].reduce((sum, item) => sum + (item.amount || item.total_amount), 0);

      setSummary({
        buggy_count: buggyCount,
        canteen_count: canteenCount,
        mobility_count: mobilityCount,
        total_spent: totalSpent
      });

      // Combine recent activities
      const activities: RecentActivity[] = [
        ...(buggyData?.map(booking => ({
          id: booking.id,
          type: 'buggy' as const,
          details: `${booking.pickup_location} to ${booking.drop_location}`,
          amount: booking.amount,
          status: booking.status,
          created_at: booking.created_at
        })) || []),
        ...(canteenData?.map(order => ({
          id: order.id,
          type: 'canteen' as const,
          details: `${order.items.length} items ordered`,
          amount: order.total_amount,
          status: order.status,
          created_at: order.created_at
        })) || []),
        ...(mobilityData?.map(service => ({
          id: service.id,
          type: 'mobility' as const,
          details: `${service.service_type} at ${service.location}`,
          amount: service.amount,
          status: service.status,
          created_at: service.created_at
        })) || [])
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setRecentActivity(activities.slice(0, 10));
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'buggy':
        return <Car className="h-5 w-5" />;
      case 'canteen':
        return <Coffee className="h-5 w-5" />;
      case 'mobility':
        return <Wheelchair className="h-5 w-5" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Services Used</p>
              <p className="text-2xl font-bold text-gray-900">
                {summary.buggy_count + summary.canteen_count + summary.mobility_count}
              </p>
            </div>
            <Clock className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Amount Spent</p>
              <p className="text-2xl font-bold text-gray-900">₹{summary.total_spent}</p>
            </div>
            <IndianRupee className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Most Used Service</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.max(summary.buggy_count, summary.canteen_count, summary.mobility_count) === summary.buggy_count
                  ? 'Buggy'
                  : Math.max(summary.buggy_count, summary.canteen_count, summary.mobility_count) === summary.canteen_count
                  ? 'Canteen'
                  : 'Mobility'}
              </p>
            </div>
            {Math.max(summary.buggy_count, summary.canteen_count, summary.mobility_count) === summary.buggy_count
              ? <Car className="h-8 w-8 text-indigo-600" />
              : Math.max(summary.buggy_count, summary.canteen_count, summary.mobility_count) === summary.canteen_count
              ? <Coffee className="h-8 w-8 text-indigo-600" />
              : <Wheelchair className="h-8 w-8 text-indigo-600" />}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Requests</p>
              <p className="text-2xl font-bold text-gray-900">
                {recentActivity.filter(activity => activity.status === 'pending').length}
              </p>
            </div>
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              {recentActivity.filter(activity => activity.status === 'pending').length}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Link
          to="/buggy"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <Car className="h-8 w-8 text-indigo-600" />
            <div>
              <h2 className="text-lg font-semibold">Buggy Service</h2>
              <p className="text-gray-500">{summary.buggy_count} trips taken</p>
            </div>
          </div>
        </Link>

        <Link
          to="/canteen"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <Coffee className="h-8 w-8 text-indigo-600" />
            <div>
              <h2 className="text-lg font-semibold">Canteen Service</h2>
              <p className="text-gray-500">{summary.canteen_count} orders placed</p>
            </div>
          </div>
        </Link>

        <Link
          to="/mobility"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <Wheelchair className="h-8 w-8 text-indigo-600" />
            <div>
              <h2 className="text-lg font-semibold">Mobility Service</h2>
              <p className="text-gray-500">{summary.mobility_count} assists requested</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <div className="text-indigo-600">
                  {getServiceIcon(activity.type)}
                </div>
                <div>
                  <p className="font-medium">{activity.details}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(activity.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">₹{activity.amount}</p>
                <p className={`text-sm capitalize ${
                  activity.status === 'completed' ? 'text-green-600' :
                  activity.status === 'pending' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {activity.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}