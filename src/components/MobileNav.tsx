import { useState } from "react";
import { X, Menu } from "lucide-react";
import NavLinks from "./NavLinks";

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* <Button > */}
      <button
        onClick={toggleMenu}
        className="border hover:bg-gray-400 p-2 rounded-sm block lg:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>
      <div className="hidden p-2 rounded-sm  lg:block">
        <NavLinks
          showLabels
          // showIcons
          className="flex flex-row gap-6"
          // hover="text-gray-950 hover:text-brand"
        />
      </div>
      {/* </Button> */}

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } z-50`}
        onClick={toggleMenu}
      />

      {/* Off-Canvas Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-74 bg-white shadow-sm z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between p-4">
          BRAND
          {/* <Brand className="text-brand font-bold font-mono text-2xl p-3" /> */}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-sm text-gray-950 hover:bg-brand focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div
          className="flex flex-col p-8 gap-6 justify-around"
          onClick={toggleMenu}
        >
          <NavLinks
            showLabels
            showIcons
            className="flex flex-col gap-6"
            hover="hover:text-gray-400"
          />
        </div>

        <div className="fixed bottom-0 left-0 w-full p-8" onClick={toggleMenu}>
          {/* <SocialLinks className="text-gray-950 hover:text-brand" /> */}
          social links
        </div>
      </aside>
    </>
  );
}

export default MobileNav;
