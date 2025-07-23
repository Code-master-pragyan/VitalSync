import React, { useState } from 'react';
import { X, User, Calendar, FileText, Settings, Activity, Heart, Phone, LogOut, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;             // add user info prop
  setUser: (user: any) => void;
  toast: any;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose,user,setUser,toast,onLogout }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleLogout = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(null);  // ✅ clear user state
          toast.success("Logged out successfully");  // ✅ show popup
        } else {
          toast.error(data.message || "Logout failed");
        }
      })
      .catch(() => {
        toast.error("Logout error");
      });
  };

  const confirmLogout = () => {
    onLogout();  // 🟢 Call the logout function passed from App.tsx
    setShowLogoutConfirm(false);
    onClose();
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    // Add navigation logic here
    console.log(`Navigating to: ${itemId}`);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {user ? user.fullName : 'Guest'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user ? user.email : 'Not logged in'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-4 space-y-2">
              <SidebarItem
                icon={User}
                label="Profile"
                itemId="profile"
                isActive={activeItem === 'profile'}
                onClick={handleItemClick}
              />
              <SidebarItem
                icon={Calendar}
                label="Appointments"
                badge="2"
                itemId="appointments"
                isActive={activeItem === 'appointments'}
                onClick={handleItemClick}
              />
              <SidebarItem
                icon={FileText}
                label="Medical History"
                itemId="medical-history"
                isActive={activeItem === 'medical-history'}
                onClick={handleItemClick}
              />
              <SidebarItem
                icon={Activity}
                label="Health Tracking"
                itemId="health-tracking"
                isActive={activeItem === 'health-tracking'}
                onClick={handleItemClick}
              />
              <SidebarItem
                icon={Heart}
                label="Saved Symptoms"
                itemId="saved-symptoms"
                isActive={activeItem === 'saved-symptoms'}
                onClick={handleItemClick}
              />
              <SidebarItem
                icon={Phone}
                label="Emergency Contacts"
                itemId="emergency-contacts"
                isActive={activeItem === 'emergency-contacts'}
                onClick={handleItemClick}
              />
              <SidebarItem
                icon={Settings}
                label="Settings"
                itemId="settings"
                isActive={activeItem === 'settings'}
                onClick={handleItemClick}
              />
            </nav>

            {/* Quick Stats */}
            <div className="mx-4 mt-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Health Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Next Appointment</span>
                  <span className="font-medium text-gray-900 dark:text-white">Dec 15</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Medications</span>
                  <span className="font-medium text-gray-900 dark:text-white">3 Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Health Score</span>
                  <span className="font-medium text-green-600 dark:text-green-400">Excellent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with Logout */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <button className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-3 px-4 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200 font-medium border border-red-200 dark:border-red-800">
              Emergency Support
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2 border border-gray-200 dark:border-gray-700"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Confirm Logout</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Are you sure you want to logout? You'll need to sign in again to access your account.</p>
            <div className="flex space-x-3">
              <button
                onClick={cancelLogout}
                className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 font-medium border border-gray-200 dark:border-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: string;
  itemId: string;
  isActive: boolean;
  onClick: (itemId: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, badge, itemId, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(itemId)}
      className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-all duration-200 group ${isActive
        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
        : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
        }`}
    >
      <div className="flex items-center space-x-3">
        <Icon className={`h-5 w-5 transition-colors duration-200 ${isActive
          ? 'text-blue-600 dark:text-blue-400'
          : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
          }`} />
        <span className={`transition-colors duration-200 ${isActive
          ? 'text-blue-600 dark:text-blue-400 font-medium'
          : 'group-hover:text-gray-900 dark:group-hover:text-white'
          }`}>
          {label}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        {badge && (
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${isActive
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
            : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
            }`}>
            {badge}
          </span>
        )}
        <ChevronRight className={`h-4 w-4 transition-all duration-200 ${isActive
          ? 'text-blue-600 dark:text-blue-400 transform rotate-90'
          : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400'
          }`} />
      </div>
    </button>
  );
};

export default Sidebar;