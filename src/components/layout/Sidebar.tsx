import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // <-- IMPORT THE BRAIN
import {
  LuLayoutDashboard,
  LuClock,
  LuCircleCheck,
  LuCircleX,
  LuSettings,
  LuUsers,
  LuFileText, // <-- Import Template Icon for Super Admin
  LuX,
} from "react-icons/lu";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { user } = useAuth(); // <-- Get the logged-in user

  // Define links with logic for who can see them and where they go
  const allNavLinks = [
    { 
      name: "Dashboard", 
      // If Super Admin -> Go to /super-admin, Else -> Go to /
      path: user?.role === 'SUPER_ADMIN' ? '/super-admin' : '/', 
      icon: LuLayoutDashboard, 
      roles: ['ADMIN', 'SUPER_ADMIN'] 
    },
    { 
      name: "Users", 
      // If Super Admin -> Go to /super-admin/users, Else -> Go to /users
      path: user?.role === 'SUPER_ADMIN' ? '/super-admin/users' : '/users', 
      icon: LuUsers, 
      roles: ['ADMIN', 'SUPER_ADMIN'] 
    },
    { 
      name: "Pending", 
      path: "/pending", 
      icon: LuClock, 
      roles: ['ADMIN'] // Only Lawyers see this
    },
    { 
      name: "Approved", 
      path: "/approved", 
      icon: LuCircleCheck, 
      roles: ['ADMIN'] // Only Lawyers see this
    },
    { 
      name: "Declined", 
      path: "/declined", 
      icon: LuCircleX, 
      roles: ['ADMIN'] // Only Lawyers see this
    },
    { 
      name: "Templates", 
      path: "/super-admin/templates", 
      icon: LuFileText, 
      roles: ['SUPER_ADMIN'] // Only Super Admin sees this
    },
    { 
      name: "Settings", 
      path: "/settings", 
      icon: LuSettings, 
      roles: ['ADMIN', 'SUPER_ADMIN'] 
    },
  ];

  // Filter the links based on the user's role
  const navLinks = allNavLinks.filter(link => user && link.roles.includes(user.role));

  return (
    <>
      <aside
        className={`absolute top-0 left-0 h-full w-64 text-white p-6 flex flex-col gap-y-12 z-20 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#1C3A3A" }}
      >
        <div className="flex justify-between items-center pl-2">
          <h1 className="text-white text-3xl font-bold">Oathlify</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <LuX size={24} />
          </button>
        </div>
        <nav className="flex flex-col space-y-2">
          {navLinks.map((link) => {
            const IconComponent = link.icon;
            // Check if this link is currently active
            // We need custom logic because '/super-admin' is a sub-path
            const isHome = link.path === '/' || link.path === '/super-admin';
            
            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                end={isHome} // Only exact match for dashboard pages
                className={({ isActive }) =>
                  `flex items-center gap-x-4 p-3 rounded-full text-lg transition-colors ${
                    isActive ? "font-semibold" : "hover:bg-white/10"
                  }`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#D4F7A5" : "transparent",
                  color: isActive ? "#1C3A3A" : "white",
                })}
              >
                <IconComponent size={24} />
                {link.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
