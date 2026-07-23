// src/layout/Navbar.tsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../constants/Navigation";
import {
  Menu,
  X,
  Search,
  LogIn,
  UserPlus,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Refs for dropdown handling
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    setUser(null);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Handle dropdown hover with delay
  const handleDropdownEnter = (title: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(title);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const handleDropdownClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    // Navigate to the main knowledge page
    navigate(path);
    setOpenDropdown(null);
    setIsMenuOpen(false);
  };

  const handleChildLinkClick = (path: string) => {
    navigate(path);
    setOpenDropdown(null);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold text-slate-800"
          >
            Darul Huda
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <div
              key={link.path}
              className="relative"
              ref={link.dropdown ? dropdownRef : undefined}
              onMouseEnter={() =>
                link.dropdown && handleDropdownEnter(link.title)
              }
              onMouseLeave={handleDropdownLeave}
            >
              {link.dropdown ? (
                <>
                  <button
                    onClick={(e) => handleDropdownClick(e, link.path)}
                    className={`flex items-center gap-1 transition-colors duration-200 hover:text-violet-700 ${
                      isActive(link.path) ? "text-violet-700" : ""
                    }`}
                  >
                    {link.title}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        openDropdown === link.title ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdown === link.title && (
                    <div
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                      onMouseEnter={() => {
                        if (timeoutRef.current) {
                          clearTimeout(timeoutRef.current);
                          timeoutRef.current = null;
                        }
                      }}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {link.children?.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-violet-600 transition-colors"
                          onClick={() => handleChildLinkClick(child.path)}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={link.path}
                  className={`transition-colors duration-200 hover:text-violet-700 ${
                    isActive(link.path)
                      ? "text-violet-700 border-b-2 border-violet-700 pb-1"
                      : ""
                  }`}
                >
                  {link.title}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/search"
            className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm transition duration-200 hover:bg-gray-50"
          >
            <Search size={18} />
            <span>Search</span>
          </Link>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 transition duration-200 hover:bg-gray-50"
              >
                <User size={18} className="text-violet-600" />
                <span className="font-medium text-gray-700">
                  {user?.fullName?.split(" ")[0] || "User"}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User size={16} />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl border border-gray-200 px-6 py-2 font-medium transition duration-200 hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-xl bg-violet-600 px-6 py-2 font-medium text-white transition duration-200 hover:bg-violet-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <div key={link.path}>
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(link.path);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                    >
                      {link.title}
                    </button>
                    <div className="ml-4 mt-2 space-y-2 border-l-2 border-violet-200 pl-4">
                      {link.children?.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => handleChildLinkClick(child.path)}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      isActive(link.path)
                        ? "bg-violet-50 text-violet-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}

            <div className="border-t border-gray-100 pt-3 mt-2">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <LogIn size={16} />
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                  >
                    <UserPlus size={16} />
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
