import { useEffect, useState } from 'react';
import StatsCard from '../Dashboard/components/StatsCard';
import { LuUsers, LuWallet, LuClipboardList } from 'react-icons/lu';
import { getPlatformStats, type PlatformStats } from '../../services/platformService';

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlatformData = async () => {
      try {
        const statsData = await getPlatformStats();
        setStats(statsData);
      } catch {
        setError("Failed to load platform dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlatformData();
  }, []);

  if (isLoading) {
    return <div className="text-center p-8">Loading Dashboard...</div>;
  }
  
  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatsCard
        title="Total Revenue"
        value={`₦${(stats?.totalRevenue ?? 0).toLocaleString()}`}
        icon={LuWallet}
        iconBgColor="bg-green-100"
      />
      <StatsCard
        title="Total Users"
        value={stats?.totalUsers.toString() ?? '0'}
        icon={LuUsers}
        iconBgColor="bg-blue-100"
      />
      <StatsCard
        title="Waitlist Count"
        value={stats?.waitlistCount.toString() ?? '0'}
        icon={LuClipboardList}
        iconBgColor="bg-gray-100"
      />
    </div>
  );
};

export default SuperAdminDashboard;
