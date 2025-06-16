
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center py-16">
      <h1 className="md:text-6xl text-4xl font-extrabold text-white mb-6 text-center">
        {t("landing_title")}
      </h1>
      <div>
        <Button size="lg" className="text-lg px-8 py-6 rounded-full" onClick={handleGetStarted}>
          {isAuthenticated ? "Go to Dashboard" : t("landing_cta")}
        </Button>
      </div>
    </div>
  );
};

export default Index;
