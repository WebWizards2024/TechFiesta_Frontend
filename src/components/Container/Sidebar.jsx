import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import profileimg from "../../assets/profileimg.png";
import {
  Home,
  User,
  LayoutDashboard,
  FileText,
  Lightbulb,
  Users,
  Download,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Tailwind styles
const styles = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .sidebar-icon {
    @apply relative flex items-center justify-center 
    h-12 w-12 mt-2 mb-2 mx-auto shadow-lg
    bg-gray-100 hover:bg-blue-100 dark:bg-gray-800 
    text-blue-600 hover:text-blue-700
    hover:rounded-xl rounded-3xl
    transition-all duration-300 ease-linear
    cursor-pointer;
  }

  .sidebar-tooltip {
    @apply absolute w-auto p-2 m-2 min-w-max left-14
    rounded-md shadow-md
    text-white bg-gray-900 
    text-xs font-bold
    transition-all duration-100 scale-0 origin-left;
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Community Help");
  const navigate = useNavigate(); // React Router navigation

  const queryClient = useQueryClient();
  const myState = queryClient.getQueryData(["user"]);

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: User, label: "Profile", path: "profile" },
    { icon: LayoutDashboard, label: "Dashboard", path: "dashboard" },
    { icon: FileText, label: "Diagnostic Data Info", path: "diagnostic" },
    { icon: Lightbulb, label: "Solution", path: "solution" },
    { icon: Users, label: "Community Help", path: "community" },
    { icon: Download, label: "Export Data", path: "/export" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleItemClick = (label, path) => {
    setActiveItem(label);
    navigate(path); // Navigate to the correct path
  };

  const sidebarVariants = {
    open: {
      width: "256px",
      transition: { type: "spring", stiffness: 200, damping: 24 },
    },
    closed: {
      width: "88px",
      transition: { type: "spring", stiffness: 200, damping: 24 },
    },
  };

  const textVariants = {
    open: { opacity: 1, x: 0, display: "block", transition: { delay: 0.1 } },
    closed: { opacity: 0, x: -10, transitionEnd: { display: "none" } },
  };

  const iconContainerVariants = {
    open: {
      width: "100%",
      transition: { type: "spring", stiffness: 200, damping: 24 },
    },
    closed: {
      width: "48px",
      transition: { type: "spring", stiffness: 200, damping: 24 },
    },
  };

  return (
    <>
      {/* Add styles to the document */}
      <style>{styles}</style>

      <div className="flex min-h-screen bg-gray-50">
        <motion.div
          initial="open"
          animate={isOpen ? "open" : "closed"}
          variants={sidebarVariants}
          className="relative bg-white border-r border-gray-200 overflow-hidden"
        >
          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1.5 hover:bg-gray-50 z-50"
          >
            {isOpen ? (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            )}
          </button>

          <div className="p-6">
            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                variants={iconContainerVariants}
                className="flex items-center"
              >
                <img
                  src={profileimg}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <motion.span
                  variants={textVariants}
                  className="font-medium ml-3 whitespace-nowrap"
                >
                 {/* {myState.fullName} */}
                </motion.span>
              </motion.div>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.label;

                return (
                  <motion.div
                    key={item.label}
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      onClick={() => handleItemClick(item.label, item.path)}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors relative group cursor-pointer
                        ${
                          isActive
                            ? "text-blue-600"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                      <motion.div
                        variants={iconContainerVariants}
                        className="flex items-center"
                      >
                        <Icon className="w-5 h-5 min-w-[20px]" />
                        <motion.span
                          variants={textVariants}
                          className="whitespace-nowrap ml-3"
                        >
                          {item.label}
                        </motion.span>
                      </motion.div>

                      {/* Tooltip for collapsed state */}
                      {!isOpen && (
                        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-gray-900 text-white text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                          {item.label}
                        </div>
                      )}
                    </motion.div>
                    {isActive && (
                      <motion.div
                        layoutId="active-bg"
                        className="absolute inset-0 bg-blue-100 rounded-lg -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 24,
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </nav>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Sidebar;
