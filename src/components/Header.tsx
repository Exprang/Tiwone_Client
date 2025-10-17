import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import { useUser } from "../hooks/useAuth";
import UserMenu from "./UserMenu";

function Header() {
  const { loading, isAuthenticated } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white p-6 flex items-center justify-between z-10">
      {/* Left: Brand */}
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold hidden lg:block">BRAND</div>
        <MobileNav />
      </div>

      {/* Right: Auth Links or Profile */}
      <div className="flex items-center gap-l">
        {!loading &&
          (isAuthenticated ? (
            <div className="flex items-center gap-3">
              {/* Replace this with actual profile dropdown/component */}
              <span className="font-medium">
                <UserMenu />
              </span>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/signin"
                className="px-4 py-2 border rounded-sm hover:bg-gray-200 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 border rounded-sm hover:bg-gray-200 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          ))}
      </div>
    </header>
  );
}

export default Header;
