import { LuX } from "react-icons/lu";

interface VideoPlayerModalProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoPlayerModal = ({ videoUrl, onClose }: VideoPlayerModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-4 animate-fade-in-up">
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <LuX size={28} />
          </button>
        </div>
        <video controls autoPlay width="100%" src={videoUrl}>
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
