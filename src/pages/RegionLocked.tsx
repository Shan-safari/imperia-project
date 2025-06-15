
import { useTranslation } from "react-i18next";
import { NavigationBar } from "@/components/NavigationBar";

export default function RegionLocked() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="p-8 rounded-lg border bg-card shadow-md max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Region Locked</h2>
          <p className="text-lg text-muted-foreground mb-2 text-center">{t("region_locked")}</p>
        </div>
      </div>
    </div>
  );
}
