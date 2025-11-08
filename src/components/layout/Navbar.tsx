import { LuSearch, LuBell } from 'react-icons/lu';

const Navbar = () => {
  return (
    <header className="h-20 bg-brand-surface flex items-center justify-between px-8 border-b border-brand-border">
      {/* Search Bar */}
      <div className="relative w-full max-w-sm">
        <input
          type="text"
          placeholder="Search Application"
          className="w-full h-12 pl-12 pr-4 rounded-full bg-brand-background border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-green-light"
        />
        <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {/* Admin Profile Section */}
      <div className="flex items-center gap-x-6">
        <button className="relative text-gray-500 hover:text-black">
          <LuBell size={26} />
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-x-3">
          <div className="w-10 h-10 rounded-full bg-brand-green-dark flex items-center justify-center text-white font-bold">
            AD
          </div>
          <span className="font-semibold text-brand-text-primary">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
