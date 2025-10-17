import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useAuth";
import { User, Settings, LogOut } from "lucide-react";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useUser();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar / Profile Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold shadow-lg hover:ring-2 hover:ring-blue-400 transition focus:outline-none"
      >
        {/* Replace initials with avatar if you want */}U
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-200 z-30 overflow-hidden ">
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setIsOpen(false)}
          >
            <User size={18} /> Profile
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setIsOpen(false)}
          >
            <Settings size={18} /> Settings
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
          >
            <LogOut size={18} color="red" /> Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
