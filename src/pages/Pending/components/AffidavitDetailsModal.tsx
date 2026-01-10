import { useEffect, useState } from 'react';
import { LuX, LuPhone, LuMail, LuVideo, LuSignature } from "react-icons/lu";
import { getPreviewPdf } from '../../../services/affidavitService';
import type { AffidavitDetail } from "../../../types/affidavit.d";

interface AffidavitDetailsModalProps {
  affidavit: AffidavitDetail;
  isStamping: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onDecline: (id: string) => void;
  onPlayVideo: (id: string) => void;
}

const AffidavitDetailsModal = ({
  affidavit,
  isStamping,
  onClose,
  onApprove,
  onDecline,
  onPlayVideo,
}: AffidavitDetailsModalProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isPdfLoading, setIsPdfLoading] = useState(true);

  const signatureUrl = affidavit.signatureKey ? `${import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '')}/${affidavit.signatureKey}` : '#';

  useEffect(() => {
    const loadPdf = async () => {
      setIsPdfLoading(true);
      try {
        const pdfBlob = await getPreviewPdf(affidavit.id);
        const url = URL.createObjectURL(pdfBlob);
        setPdfUrl(url);
      } catch (error) {
        console.error("Failed to load PDF preview", error);
      } finally {
        setIsPdfLoading(false);
      }
    };
    loadPdf();

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [affidavit.id]);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl p-6 animate-fade-in-up">
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 bg-white/50 rounded-full p-1">
            <LuX size={28} />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-3/5 border rounded-lg overflow-hidden">
            {isPdfLoading ? (
              <div className="flex items-center justify-center h-full min-h-[60vh]">Loading PDF Preview...</div>
            ) : pdfUrl ? (
              <iframe src={pdfUrl} className="w-full h-full min-h-[60vh]" title="PDF Preview" />
            ) : (
              <div className="flex items-center justify-center h-full min-h-[60vh]">Failed to load PDF.</div>
            )}
          </div>

          <div className="md:w-2/5 flex flex-col">
            <div className="flex-grow space-y-6">
              <h2 className="text-2xl font-bold text-brand-text-primary">Applicant Information</h2>
              <div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="text-xl font-bold">{`${affidavit.user.profile.firstName} ${affidavit.user.profile.lastName}`}</p>
                    <p className="text-gray-500">{affidavit.template.name}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-gray-600">
                  {affidavit.user.phone && <p className="flex items-center gap-3"><LuPhone /> {affidavit.user.phone}</p>}
                  <p className="flex items-center gap-3"><LuMail /> {affidavit.user.email}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Uploaded Documents</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
                    <div className="flex items-center gap-3"><LuSignature className="text-gray-500" /><span>Signature</span></div>
                    <a href={signatureUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">View Details</a>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
                    <div className="flex items-center gap-3"><LuVideo className="text-gray-500" /><span>Video Recording</span></div>
                    <button onClick={() => onPlayVideo(affidavit.id)} className="font-medium text-blue-600 hover:underline">View Details</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 pt-6 border-t mt-6">
              <button
                onClick={() => onDecline(affidavit.id)}
                disabled={isStamping}
                className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400"
              >
                DECLINE
              </button>
              <button
                onClick={() => onApprove(affidavit.id)}
                disabled={isStamping}
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400"
              >
                {isStamping ? 'STAMPING...' : 'APPROVE & STAMP'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffidavitDetailsModal;
