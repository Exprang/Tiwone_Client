import React from "react";
import { NavLink } from "react-router-dom";
import { Home, MapPinHouse, LayoutDashboard } from "lucide-react";

interface NavLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  showIcons?: boolean;
  showLabels?: boolean;
  className?: string;
  hover?: string;
  activeClassName?: string;
}

function NavLinks({
  showIcons = false,
  showLabels = true,
  className = "flex gap-6",
  hover = "hover:text-white",
  activeClassName = "text-brand font-bold",
}: NavLinksProps) {
  const navItems: { name: string; link: string; icon?: React.ReactNode }[] = [
    { name: "Home", link: "/", icon: <Home className="w-5 h-5" /> },
    {
      name: "Explor",
      link: "/explore",
      icon: <MapPinHouse className="w-5 h-5" />,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
  ];

  return (
    <nav className={className}>
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.link}
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 ${hover} ${
              isActive ? activeClassName : ""
            }`
          }
        >
          {showIcons && item.icon}
          {showLabels && (
            <span className="text-sm font-medium">{item.name}</span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavLinks;
