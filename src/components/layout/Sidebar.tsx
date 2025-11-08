import { NavLink } from 'react-router-dom';
import { LuLayoutDashboard, LuClock, LuCircleCheck, LuCircleX, LuSettings } from 'react-icons/lu';

const Sidebar = () => {
    const navLinks = [
        { name: 'Dashboard', path: '/', icon: LuLayoutDashboard },
        { name: 'Pending', path: '/pending', icon: LuClock },
        { name: 'Approved', path: '/approved', icon: LuCircleCheck },
        { name: 'Declined', path: '/declined', icon: LuCircleX },
        { name: 'Settings', path: '/settings', icon: LuSettings },
    ];

    return (
        <aside 
            className="w-64 p-6 flex flex-col gap-y-12" 
            style={{ 
                backgroundColor: '#1C3A3A',
                color: 'white',
                minHeight: '100vh'
            }}
        >
            <div className="pl-2">
                <h1 className="text-white text-3xl font-bold">Oathlify</h1>
            </div>
            <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            end={link.path === '/'}
                            className={({ isActive }) =>
                                `flex items-center gap-x-4 p-3 rounded-full text-lg transition-colors ${
                                    isActive
                                        ? 'font-semibold'
                                        : 'hover:bg-white/10'
                                }`
                            }
                            style={({ isActive }) => ({
                                backgroundColor: isActive ? '#D4F7A5' : 'transparent',
                                color: isActive ? '#1C3A3A' : 'white'
                            })}
                        >
                            <IconComponent size={24} />
                            {link.name}
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
