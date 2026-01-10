const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-text-primary">Settings</h1>
        <p className="text-brand-text-secondary mt-1">Manage your account and application settings.</p>
      </div>

      <div className="bg-brand-surface rounded-xl shadow-sm p-6 md:p-8">
        <div className="space-y-8">

          {/* Admin Profile Section */}
          <div>
            <h2 className="text-xl font-bold text-brand-text-primary">Admin Profile</h2>
            <p className="text-brand-text-secondary mt-1">Update your personal information.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  defaultValue="Admin"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green-dark focus:border-brand-green-dark"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  defaultValue="User"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green-dark focus:border-brand-green-dark"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  defaultValue="admin@oathlify.com"
                  readOnly
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-brand-border"></div>

          {/* Password Section */}
          <div>
            <h2 className="text-xl font-bold text-brand-text-primary">Change Password</h2>
            <p className="text-brand-text-secondary mt-1">Update your account password.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green-dark focus:border-brand-green-dark"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green-dark focus:border-brand-green-dark"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-8 mt-8 border-t border-brand-border">
          <button
            type="button"
            className="py-2 px-6 bg-brand-green-dark text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
