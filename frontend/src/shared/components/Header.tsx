import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, Menu, X } from "lucide-react";
import { auth } from "@/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [googleUser, setGoogleUser] = useState<User | null>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setGoogleUser(user);
        setIsLoggedIn(true);
      } else {
        setGoogleUser(null);
      }
    });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Google logout failed", err);
    }
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
    setGoogleUser(null);
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 backdrop-blur border-b border-gray-800 sticky top-0 z-50 shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center py-5">
      {/* Logo */}
      <Link to="/" className="flex items-center group space-x-2">
        <Rocket className="h-7 w-7 text-indigo-400 group-hover:rotate-45 transition-transform duration-300" />
        <h1 className="text-2xl font-extrabold text-white tracking-wide hidden md:block">
          Match
          <span className="bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent ml-1">
            WiseAI
          </span>
        </h1>
      </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/">
              <span className="text-white font-medium hover:text-blue-400 transition">
                Home
              </span>
            </Link>

            {isLoggedIn ? (
              <>
                {role === "user" && (
                  <Link to="/add-content">
                    <span className="text-white font-medium hover:text-blue-400 transition">
                      My Analysis
                    </span>
                  </Link>
                )}

                {/* Optional: Google Profile Display */}
                {googleUser && (
                  <div className="flex items-center space-x-2">
                    <img
                      src={googleUser.photoURL || ""}
                      alt="profile"
                      className="w-8 h-8 rounded-full border border-white"
                    />
                    <span className="text-white text-sm font-medium">
                      {googleUser.displayName}
                    </span>
                  </div>
                )}

                <Button
                  onClick={handleLogout}
                  className="bg-pink-400 hover:bg-red-200 text-white font-semibold px-4 py-2 rounded-md transition"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button className="bg-purple-400 hover:bg-pink-300 text-white font-semibold px-4 py-2 rounded-md transition">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-purple-400 hover:bg-pink-300 text-white font-semibold px-4 py-2 rounded-md transition">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center text-center space-y-4 pb-4">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <span className="text-white font-medium hover:text-blue-400 transition">
                Home
              </span>
            </Link>

            {!isLoggedIn ? (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <Button className="w-40 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  <Button className="w-40 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {role === "user" && (
                  <Link to="/add-content" onClick={() => setMenuOpen(false)}>
                    <span className="text-white font-medium hover:text-blue-400 transition">
                      My Analysis
                    </span>
                  </Link>
                )}

                {googleUser && (
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      src={googleUser.photoURL || ""}
                      alt="profile"
                      className="w-10 h-10 rounded-full border border-white"
                    />
                    <span className="text-white font-medium text-sm">
                      {googleUser.displayName}
                    </span>
                  </div>
                )}

                <Button
                  onClick={handleLogout}
                  className="w-40 bg-red-400 hover:bg-red-200 text-white font-semibold rounded-md"
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
