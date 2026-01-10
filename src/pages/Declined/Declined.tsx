import { LuConstruction } from 'react-icons/lu';

const Declined = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-text-primary">Declined Applications</h1>
        <p className="text-brand-text-secondary mt-1">View all declined affidavit submissions.</p>
      </div>

      <div className="flex flex-col items-center justify-center h-96 bg-brand-surface rounded-xl shadow-sm border-2 border-dashed">
        <LuConstruction size={48} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-500">Coming Soon</h2>
        <p className="text-gray-400">This feature is currently under development.</p>
      </div>
    </div>
  );
};

export default Declined;
