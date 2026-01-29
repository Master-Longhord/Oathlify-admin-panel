import { useEffect, useState } from 'react';
import StatsCard from './components/StatsCard';
import { LuClock, LuScan, LuFileCheck2 } from 'react-icons/lu';
import { getAdminStats, type AdminStats } from '../../services/dashboardService';
import { getPendingAffidavits } from '../../services/affidavitService';
import type { Affidavit } from '../../types/affidavit.d';

const Dashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentSubmissions, setRecentSubmissions] = useState<Affidavit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, pendingData] = await Promise.all([
          getAdminStats(),
          getPendingAffidavits(),
        ]);

        setStats(statsData);
        setRecentSubmissions(pendingData.slice(0, 5));
      } catch {
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div className="text-center p-8">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500 bg-red-100 rounded-lg">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-brand-text-secondary">Your daily tasks and pending reviews.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          data-tour="dashboard-card"
          title="Pending Affidavits"
          value={stats?.pendingAffidavits.toString() ?? '0'}
          icon={LuClock}
          iconBgColor="bg-brand-yellow"
        />
        <StatsCard
          title="Pending KYC"
          value={stats?.pendingKyc.toString() ?? '0'}
          icon={LuScan}
          iconBgColor="bg-blue-100"
        />
        <StatsCard
          title="Stamped Today"
          value={stats?.documentsStampedToday?.toString() ?? '0'}
          icon={LuFileCheck2}
          iconBgColor="bg-green-100"
        />
      </div>

      <div className="bg-brand-surface rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Recent Submission</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-brand-green-light text-brand-green-dark">
              <tr>
                <th className="p-4 font-semibold rounded-tl-lg">Applicant Name</th>
                <th className="p-4 font-semibold">Type of Affidavit</th>
                <th className="p-4 font-semibold">Date Submitted</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentSubmissions.length > 0 ? (
                recentSubmissions.map(affidavit => (
                  <tr key={affidavit.id} className="border-b last:border-b-0">
                    <td className="p-4">{`${affidavit.user.profile.firstName} ${affidavit.user.profile.lastName}`}</td>
                    <td className="p-4">{affidavit.template.name}</td>
                    <td className="p-4">{new Date(affidavit.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className="bg-brand-yellow text-yellow-800 font-medium px-3 py-1 rounded-full">Pending</span>
                    </td>
                    <td className="p-4 text-gray-400">...</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-8 text-brand-text-secondary">
                    No recent pending submissions.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
