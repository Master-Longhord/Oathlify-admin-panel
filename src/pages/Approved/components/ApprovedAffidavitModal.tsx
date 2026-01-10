import { LuX, LuEye, LuVideo } from "react-icons/lu";
import type { AffidavitDetail } from "../../../types/affidavit.d";

interface ApprovedAffidavitModalProps {
  affidavit: AffidavitDetail | null;
  isLoading: boolean;
  onClose: () => void;
  onViewContent: (id: string) => void;
}

const ApprovedAffidavitModal = ({
  affidavit,
  isLoading,
  onClose,
  onViewContent,
}: ApprovedAffidavitModalProps) => {

  const documents = affidavit ? [
    { name: 'Video Recording', key: affidavit.videoRecordingKey, icon: LuVideo },
  ].filter(doc => doc.key) : [];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 space-y-6 animate-fade-in-up min-h-[300px]">
        
        {isLoading && <div className="flex items-center justify-center h-full">Loading details...</div>}
        
        {!isLoading && affidavit && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-brand-text-primary">Approved Affidavit Details</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <LuX size={28} />
              </button>
            </div>

            <div>
              <p className="text-lg font-bold">{`${affidavit.user.profile.firstName} ${affidavit.user.profile.lastName}`}</p>
              <p className="text-gray-500">{affidavit.template.name}</p>
            </div>

            <div className="border-t pt-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Attached Files</p>
                <div className="space-y-2">
                  {documents.map((doc, index) => (
                     <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
                       <div className="flex items-center gap-3"><doc.icon className="text-gray-500" /><span>{doc.name}</span></div>
                       <a href="#" className="font-medium text-blue-600 hover:underline">View</a>
                     </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 pt-6 border-t">
              <button
                onClick={() => onViewContent(affidavit.id)}
                className="w-full py-3 flex items-center justify-center gap-2 bg-brand-green-dark text-white font-semibold rounded-lg hover:opacity-90"
              >
                <LuEye size={20} />
                VIEW AFFIDAVIT CONTENT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApprovedAffidavitModal;
