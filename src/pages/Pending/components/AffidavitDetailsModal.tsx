import { LuX, LuPhone, LuMail, LuFileText, LuVideo } from "react-icons/lu";
import type { AffidavitDetail } from "../../../types/affidavit.d";

interface AffidavitDetailsModalProps {
  affidavit: AffidavitDetail | null;
  isLoading: boolean;
  isStamping: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onDecline: (id: string) => void;
}

const AffidavitDetailsModal = ({
  affidavit,
  isLoading,
  isStamping,
  onClose,
  onApprove,
  onDecline,
}: AffidavitDetailsModalProps) => {
  const documents = affidavit ? [
    { name: 'Signature', key: affidavit.signatureKey, icon: LuFileText },
    { name: 'Video Recording', key: affidavit.videoRecordingKey, icon: LuVideo },
  ].filter(doc => doc.key) : [];

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8 space-y-6 animate-fade-in-up min-h-[300px]">
        
        {isLoading && <div className="flex items-center justify-center h-full">Loading details...</div>}
        
        {!isLoading && affidavit && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-brand-text-primary">
                Applicant Information
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <LuX size={28} />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 shrink-0"></div>
                <div>
                  <p className="text-xl font-bold text-brand-text-primary">{`${affidavit.user.profile.firstName} ${affidavit.user.profile.lastName}`}</p>
                  <p className="text-gray-500">{affidavit.template.name}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-gray-600">
                {affidavit.user.phone && (
                  <p className="flex items-center gap-3">
                    <LuPhone size={18} /> {affidavit.user.phone}
                  </p>
                )}
                <p className="flex items-center gap-3">
                  <LuMail size={18} /> {affidavit.user.email}
                </p>
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Submission Details</p>
                <p className="font-bold text-lg text-brand-text-primary">
                  {new Date(affidavit.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Uploaded Documents</p>
                <div className="space-y-2">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <doc.icon className="text-gray-500" />
                        <span className="font-medium text-gray-700">{doc.name}</span>
                      </div>
                      <a href="#" className="font-medium text-blue-600 hover:underline">View Details</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 pt-6 border-t">
              <button
                onClick={() => onApprove(affidavit.id)}
                disabled={isStamping}
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isStamping ? 'STAMPING...' : 'APPROVE & STAMP'}
              </button>
              <button
                onClick={() => onDecline(affidavit.id)}
                disabled={isStamping}
                className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                DECLINE
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AffidavitDetailsModal;
