import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { useAuth } from '../hooks/useAuth';
import { driver } from "driver.js";
import { completeOnboarding } from '../services/profileService';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user && !user.hasCompletedOnboarding) {
      const driverObj = driver({
        showProgress: true,
        steps: [
          { 
            popover: { 
              title: 'Welcome to Oathlify Admin', 
              description: 'Let\'s take a quick tour of your new dashboard.' 
            } 
          },
          { 
            element: '[data-tour="dashboard-card"]', 
            popover: { 
              title: 'Dashboard Overview', 
              description: 'See your key statistics like total users and pending affidavits at a glance.' 
            } 
          },
          { 
            element: 'nav a[href="/pending"]', 
            popover: { 
              title: 'Review Submissions', 
              description: 'Go here to review, approve, and stamp new affidavits.' 
            } 
          },
          { 
            element: 'nav a[href="/users"]', 
            popover: { 
              title: 'Manage Users', 
              description: 'View and manage your entire user base from this page.' 
            } 
          },
          { 
            popover: { 
              title: 'You\'re All Set!', 
              description: 'You\'re ready to get started. You won\'t see this tour again.' 
            } 
          }
        ],
        onDestroyed: () => {
          // This is called when the tour is closed or finished
          try {
            completeOnboarding();
          } catch {
            console.error("Could not save onboarding completion status.");
          }
        },
      });

      driverObj.drive();
    }
  }, [user]);

  return (
    <div className="relative flex h-screen bg-brand-background">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar openSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
