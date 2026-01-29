import { useEffect, useState } from 'react';
import { LuEye } from 'react-icons/lu';
// UPDATED: Importing the Platform specific functions
import { getPlatformUsers, getPlatformUserById, deletePlatformUser } from '../../services/userService';
import type { User, UserDetail } from '../../types/user.d';
import UserDetailsModal from '../../pages/Users/components/UserDetailsModal';

const SuperAdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // UPDATED: Using getPlatformUsers
        const data = await getPlatformUsers();
        setUsers(data);
      } catch {
        setError('Failed to load platform users.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleViewDetails = async (id: string) => {
    setIsModalOpen(true);
    setIsModalLoading(true);
    try {
      const details = await getPlatformUserById(id);
      setSelectedUser(details);
    } catch (error) {
      console.error("Failed to load user details", error);
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this user?")) return;
    setIsDeleting(true);
    try {
      await deletePlatformUser(id);
      setUsers(currentUsers => currentUsers.filter(user => user.id !== id));
      handleCloseModal();
    } catch  {
      alert('Failed to delete the user.');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">Active</span>;
      case 'PENDING_VERIFICATION': return <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">Pending</span>;
      case 'SUSPENDED': return <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">Suspended</span>;
      default: return <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">{status}</span>;
    }
  };

  if (isLoading) return <div className="text-center p-8">Loading users...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Super Admin User Management</h1>
          <p className="text-brand-text-secondary mt-1">View, manage, suspend, and delete all registered users.</p>
        </div>
        <div className="bg-brand-surface rounded-xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead className="bg-brand-green-light text-brand-green-dark">
                <tr>
                  <th className="p-4 font-semibold rounded-tl-xl">Email Address</th>
                  <th className="p-4 font-semibold">Phone Number</th>
                  <th className="p-4 font-semibold">Role</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Date Joined</th>
                  <th className="p-4 font-semibold rounded-tr-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b last:border-b-0">
                    <td className="p-4 font-medium">{user.email}</td>
                    <td className="p-4">{user.phone || 'N/A'}</td>
                    <td className="p-4">{user.role}</td>
                    <td className="p-4">{getStatusBadge(user.status)}</td>
                    <td className="p-4">{formatDate(user.createdAt)}</td>
                    <td className="p-4">
                      <button onClick={() => handleViewDetails(user.id)} className="flex items-center gap-x-2 text-blue-600 hover:underline">
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
        <UserDetailsModal
          user={selectedUser}
          isLoading={isModalLoading}
          isDeleting={isDeleting}
          onClose={handleCloseModal}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default SuperAdminUsers;
