
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavigationBar />
      <div className="flex flex-col flex-1 items-center justify-center py-16">
        <h1 className="md:text-6xl text-4xl font-extrabold text-primary mb-6 text-center">
          {t("landing_title")}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground mb-10 text-center">
          Discover Africa's startup ecosystem. Instantly match with mentors, co-founders, investors, opportunities & more. Secure payments, advanced AI matchmaking, and real growth—all in one place.
        </p>
        <div>
          <Button size="lg" className="text-lg px-8 py-4 rounded-full" onClick={() => navigate("/auth")}>
            {t("landing_cta")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
