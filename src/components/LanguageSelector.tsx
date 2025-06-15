
import { useTranslation } from "react-i18next";
import { useI18nStore } from "@/store/i18nStore";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useI18nStore();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as any);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="flex items-center gap-1">
      <GlobeAltIcon className="w-5 h-5 text-muted-foreground" />
      <select
        value={language}
        onChange={handleChange}
        className="border-none bg-transparent text-sm focus:outline-none"
      >
        <option value="en">EN</option>
        <option value="fr">FR</option>
        <option value="rw">RW</option>
      </select>
    </div>
  );
};
