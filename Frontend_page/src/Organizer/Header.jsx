import { useSelector, useDispatch } from "react-redux";
import { Search, Globe, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../Redux/userSlice";

export const Header = () => {
  const username = useSelector((state) => state.user.name);
  const [searchFocus, setSearchFocus] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear Session Storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("id");

    // Clear Redux State
    dispatch(clearUser());

    // Navigate to Login
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200/60 shadow-sm sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT SECTION (Logo + Search) */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex gap-1">
                <div className="w-5 h-5 bg-blue-500 rounded-sm -rotate-12"></div>
                <div className="w-5 h-5 bg-orange-500 rounded-sm rotate-6"></div>
                <div className="w-5 h-5 bg-green-500 rounded-sm -rotate-3"></div>
              </div>

              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900 tracking-tight">
                  Book My Event
                </h1>
                <p className="text-xs text-gray-500 font-medium -mt-1">
                  CREATE • COLLABORATE • CONNECT
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="w-80 hidden sm:block">
              <div
                className={`relative transition-all duration-300 ${
                  searchFocus ? "shadow-lg" : "shadow-sm"
                }`}
              >
                <input
                  type="text"
                  placeholder="I'm Searching For..."
                  onFocus={() => setSearchFocus(true)}
                  onBlur={() => setSearchFocus(false)}
                  className="w-full px-4 py-2 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors duration-200"
                />

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm text-gray-700 font-medium"
              >
                <Globe className="w-4 h-4 text-blue-600" />
                <span>EN-US</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    languageOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {languageOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-xl">
                  {["EN-US", "EN-UK", "ES", "FR", "DE", "JA"].map((lang) => (
                    <button
                      key={lang}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
                      onClick={() => setLanguageOpen(false)}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-gray-200"></div>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                  {username?.charAt(0).toUpperCase() || "U"}
                </div>

                <div className="hidden sm:block">
                  <p className="text-sm font-bold text-gray-900 leading-tight">
                    Hi,{" "}
                    {username
                      ? username.charAt(0).toUpperCase() + username.slice(1)
                      : "User"}
                  </p>
                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                    Organizer
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="ml-2 flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group border border-transparent hover:border-red-100"
                title="Logout"
              >
                <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span className="text-xs font-semibold hidden md:block">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-0.5 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 opacity-30"></div>
    </header>
  );
};
