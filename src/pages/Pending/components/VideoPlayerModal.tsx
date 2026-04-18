import { LuX } from "react-icons/lu";

interface VideoPlayerModalProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoPlayerModal = ({ videoUrl, onClose }: VideoPlayerModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-fade-in-up">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-brand-text-primary">Video Evidence Playback</h3>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <LuX size={24} className="text-gray-500" />
          </button>
        </div>
        <div className="bg-black aspect-video flex items-center justify-center">
          <video 
            controls 
            autoPlay 
            className="w-full h-full"
            src={videoUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="p-4 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-brand-green-dark text-white rounded-lg font-semibold"
            style={{ backgroundColor: '#1C3A3A' }}
          >
            Close Player
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
