import { LuX, LuMail, LuPhone } from "react-icons/lu";
import type { UserDetail } from "../../../types/user.d";

interface UserDetailsModalProps {
  user: UserDetail | null;
  isLoading: boolean;
  onClose: () => void;
  isDeleting: boolean;
  onDelete: (id: string) => void;
}

const UserDetailsModal = ({
  user,
  isLoading,
  onClose,
  isDeleting,
  onDelete,
}: UserDetailsModalProps) => {

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string | undefined) => {
    if (!status) return null;
    switch (status) {
      case 'ACTIVE':
        return <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">Active</span>;
      case 'PENDING_VERIFICATION':
        return <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">Pending</span>;
      case 'SUSPENDED':
        return <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">Suspended</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 space-y-6 animate-fade-in-up min-h-[300px]">
        
        {isLoading && <div className="flex items-center justify-center h-full">Loading user details...</div>}
        
        {!isLoading && user && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-brand-text-primary">User Details</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <LuX size={28} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-lg font-bold text-brand-text-primary">{user.email}</p>
                <p className="text-gray-500">{user.role}</p>
              </div>
              <div className="mt-4 space-y-2 text-gray-600">
                {user.phone && <p className="flex items-center gap-3"><LuPhone size={18} /> {user.phone}</p>}
                <p className="flex items-center gap-3"><LuMail size={18} /> {user.email}</p>
              </div>
            </div>

            <div className="border-t pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                {getStatusBadge(user.status)}
              </div>
              <div>
                <p className="text-sm text-gray-500">Date Joined</p>
                <p className="font-medium text-gray-800">{formatDate(user.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Login</p>
                <p className="font-medium text-gray-800">{formatDate(user.lastLoginAt)}</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 pt-6 border-t">
              <button 
                disabled={isDeleting}
                className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 disabled:bg-gray-400"
              >
                SUSPEND USER
              </button>
              <button 
                onClick={() => onDelete(user.id)}
                disabled={isDeleting}
                className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400"
              >
                {isDeleting ? 'DELETING...' : 'DELETE USER'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetailsModal;
