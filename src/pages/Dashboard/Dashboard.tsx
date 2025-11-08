import StatsCard from './components/StatsCard';
// CORRECTED: Import LuCircleCheck and LuCircleX from the react-icons/lu library
import { LuFileText, LuClock, LuCircleCheck, LuCircleX } from 'react-icons/lu';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-brand-text-primary">Dashboard Overview</h1>
        <p className="text-brand-text-secondary">Manage and review all affidavit submissions</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Applications"
          value="7"
          icon={LuFileText}
          iconBgColor="bg-brand-green-light"
        />
        <StatsCard
          title="Pending Review"
          value="4"
          icon={LuClock}
          iconBgColor="bg-brand-yellow"
        />
        <StatsCard
          title="Approved"
          value="5"
          icon={LuCircleCheck} // <-- CORRECTED
          iconBgColor="bg-brand-green-light"
        />
        <StatsCard
          title="Declined"
          value="1"
          icon={LuCircleX} // <-- CORRECTED
          iconBgColor="bg-brand-red"
        />
      </div>

      {/* Recent Submission Table Placeholder */}
      <div className="bg-brand-surface rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-brand-text-primary mb-4">Recent Submission</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
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
              {/* Table body would be populated with data */}
              <tr className="border-b border-brand-border">
                <td className="p-4">John Doe</td>
                <td className="p-4">Change of Name</td>
                <td className="p-4">2023-10-28</td>
                <td className="p-4">Approved</td>
                <td className="p-4 text-gray-400">...</td>
              </tr>
              <tr className="border-b border-brand-border">
                <td className="p-4">Jane Smith</td>
                <td className="p-4">Proof of Address</td>
                <td className="p-4">2023-10-27</td>
                <td className="p-4">Pending</td>
                <td className="p-4 text-gray-400">...</td>
              </tr>
              {/* Add more dummy rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
