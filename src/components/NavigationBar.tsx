
import { useI18nStore } from "@/store/i18nStore";
import { useAuthStore } from "@/store/authStore";
import { useNavigate, Link } from "react-router-dom";
import { LanguageSelector } from "./LanguageSelector";
import { UserIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export const NavigationBar = () => {
  const language = useI18nStore((s) => s.language);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/auth");
    }
  };

  return (
    <nav className="w-full flex items-center justify-between py-3 px-8 border-b bg-background shadow-sm">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-bold tracking-tight text-primary">
          StartupsToFund
        </Link>
        <div className="hidden md:flex items-center gap-6 text-base">
          <Link className="hover:underline transition" to="/dashboard">Dashboard</Link>
          <Link className="hover:underline transition" to="/explore">Explore</Link>
          <Link className="hover:underline transition" to="/messages">Messages</Link>
          <Link className="hover:underline transition" to="/premium">Premium</Link>
          <Link className="hover:underline transition" to="/help-center">Help Center</Link>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <LanguageSelector />
        {isAuthenticated && user ? (
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/profile/${user.id}`}>
              <UserIcon className="w-6 h-6" />
            </Link>
          </Button>
        ) : null}
        <Button variant="outline" onClick={handleAuth} className="ml-2">
          {isAuthenticated ? "Logout" : "Login / Signup"}
        </Button>
      </div>
    </nav>
  );
};
