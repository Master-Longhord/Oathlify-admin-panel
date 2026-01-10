import { useEffect, useState } from 'react';
import { LuEye } from 'react-icons/lu';
import { getApprovedAffidavits, getAffidavitById } from '../../services/affidavitService';
import type { Affidavit, AffidavitDetail } from '../../types/affidavit.d';
import ApprovedAffidavitModal from './components/ApprovedAffidavitModal';

const Approved = () => {
  const [affidavits, setAffidavits] = useState<Affidavit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedAffidavit, setSelectedAffidavit] = useState<AffidavitDetail | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAffidavits = async () => {
      try {
        const data = await getApprovedAffidavits();
        setAffidavits(data);
      } catch {
        setError('Failed to load approved applications.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAffidavits();
  }, []);

  const handleViewDetails = async (id: string) => {
    setIsModalOpen(true);
    setIsModalLoading(true);
    try {
      const details = await getAffidavitById(id);
      setSelectedAffidavit(details);
    } catch (error) {
      console.error("Failed to load affidavit details", error);
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAffidavit(null);
  };

  const handleViewContent = (id: string) => {
    console.log("Viewing content for affidavit:", id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (isLoading) {
    return <div className="text-center p-8 text-brand-text-secondary">Loading approved applications...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600 bg-red-100 rounded-lg">{error}</div>;
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-text-primary">Approved Applications</h1>
          <p className="text-brand-text-secondary mt-1">View all stamped and approved applications</p>
        </div>

        <div className="bg-brand-surface rounded-xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-brand-green-light text-brand-green-dark">
                <tr>
                  <th className="p-4 font-semibold rounded-tl-xl">Applicant Name</th>
                  <th className="p-4 font-semibold">Type of Affidavit</th>
                  <th className="p-4 font-semibold">Date Approved</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold rounded-tr-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {affidavits.length > 0 ? (
                  affidavits.map((affidavit) => (
                    <tr key={affidavit.id} className="border-b border-brand-border last:border-b-0">
                      <td className="p-4 whitespace-nowrap">
                        {`${affidavit.user.profile.firstName} ${affidavit.user.profile.lastName}`}
                      </td>
                      <td className="p-4 whitespace-nowrap">{affidavit.template.name}</td>
                      <td className="p-4 whitespace-nowrap">{formatDate(affidavit.createdAt)}</td>
                      <td className="p-4">
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                          Approved
                        </span>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => handleViewDetails(affidavit.id)}
                          className="flex items-center gap-x-2 text-blue-600 hover:underline font-medium"
                        >
                          <LuEye size={16} />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-brand-text-secondary">
                      No approved applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ApprovedAffidavitModal
          affidavit={selectedAffidavit}
          isLoading={isModalLoading}
          onClose={handleCloseModal}
          onViewContent={handleViewContent}
        />
      )}
    </>
  );
};

export default Approved;
