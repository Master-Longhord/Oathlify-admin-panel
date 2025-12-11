import { useEffect, useState } from 'react';
import StatsCard from './components/StatsCard';
import { LuFileText, LuClock, LuCircleCheck, LuCircleX } from 'react-icons/lu';
import { getPendingAffidavits, getApprovedAffidavits, getDeclinedAffidavits } from '../../services/affidavitService';
import type { Affidavit } from '../../types/affidavit.d';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, declined: 0 });
  const [recentSubmissions, setRecentSubmissions] = useState<Affidavit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [pending, approved, declined] = await Promise.all([
          getPendingAffidavits(),
          getApprovedAffidavits(),
          getDeclinedAffidavits(),
        ]);

        setStats({
          pending: pending.length,
          approved: approved.length,
          declined: declined.length,
          total: pending.length + approved.length + declined.length,
        });

        setRecentSubmissions(pending.slice(0, 5));
      } catch {
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div className="text-center p-8 text-brand-text-secondary">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600 bg-red-100 rounded-lg">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-brand-text-primary">Dashboard Overview</h1>
        <p className="text-brand-text-secondary">Manage and review all affidavit submissions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Applications"
          value={stats.total.toString()}
          icon={LuFileText}
          iconBgColor="bg-brand-green-light"
        />
        <StatsCard
          title="Pending Review"
          value={stats.pending.toString()}
          icon={LuClock}
          iconBgColor="bg-brand-yellow"
        />
        <StatsCard
          title="Approved"
          value={stats.approved.toString()}
          icon={LuCircleCheck}
          iconBgColor="bg-brand-green-light"
        />
        <StatsCard
          title="Declined"
          value={stats.declined.toString()}
          icon={LuCircleX}
          iconBgColor="bg-brand-red"
        />
      </div>

      <div className="bg-brand-surface rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-brand-text-primary mb-4">Recent Submission</h2>
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
                  <tr key={affidavit.id} className="border-b border-brand-border last:border-b-0">
                    <td className="p-4">{`${affidavit.user.profile.firstName} ${affidavit.user.profile.lastName}`}</td>
                    <td className="p-4">{affidavit.template.name}</td>
                    <td className="p-4">{new Date(affidavit.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
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
