import { useEffect, useState } from 'react';
import { LuEye } from 'react-icons/lu';
import { getPendingAffidavits, getAffidavitById, stampAffidavit } from '../../services/affidavitService';
import type { Affidavit, AffidavitDetail } from '../../types/affidavit.d';
import AffidavitDetailsModal from './components/AffidavitDetailsModal';

const Pending = () => {
  const [affidavits, setAffidavits] = useState<Affidavit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedAffidavit, setSelectedAffidavit] = useState<AffidavitDetail | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStamping, setIsStamping] = useState(false);

  useEffect(() => {
    const fetchAffidavits = async () => {
      try {
        const data = await getPendingAffidavits();
        setAffidavits(data);
      } catch {
        setError('Failed to load pending applications.');
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
    } catch {
      console.error("Failed to load affidavit details");
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAffidavit(null);
  };
  
  const handleApprove = async (id: string) => {
    setIsStamping(true);
    try {
      await stampAffidavit(id);
      setAffidavits(currentAffidavits => currentAffidavits.filter(aff => aff.id !== id));
      handleCloseModal();
    } catch {
      alert('Failed to approve and stamp the affidavit.');
    } finally {
      setIsStamping(false);
    }
  };
  
  const handleDecline = (id: string) => {
    console.log("Declining affidavit:", id);
    handleCloseModal();
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Pending Applications</h1>
          <p className="text-brand-text-secondary mt-1">View and manage pending applications</p>
        </div>
        <div className="bg-brand-surface rounded-xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-brand-green-light text-brand-green-dark">
                <tr>
                  <th className="p-4 font-semibold rounded-tl-xl">Applicant Name</th>
                  <th className="p-4 font-semibold">Type of Affidavit</th>
                  <th className="p-4 font-semibold">Date Submitted</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold rounded-tr-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {affidavits.map((affidavit) => (
                  <tr key={affidavit.id} className="border-b last:border-b-0">
                    <td className="p-4">{`${affidavit.user.profile.firstName} ${affidavit.user.profile.lastName}`}</td>
                    <td className="p-4">{affidavit.template.name}</td>
                    <td className="p-4">{new Date(affidavit.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className="bg-brand-yellow text-yellow-800 font-medium px-3 py-1 rounded-full">Pending</span>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleViewDetails(affidavit.id)}
                        className="flex items-center gap-x-2 text-blue-600 hover:underline"
                      >
                        <LuEye size={16} /> View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AffidavitDetailsModal
          affidavit={selectedAffidavit}
          isLoading={isModalLoading}
          isStamping={isStamping}
          onClose={handleCloseModal}
          onApprove={handleApprove}
          onDecline={handleDecline}
        />
      )}
    </>
  );
};

export default Pending;
