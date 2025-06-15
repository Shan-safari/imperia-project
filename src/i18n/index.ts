
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      landing_title: "Building Africa's Next Great Startups",
      landing_cta: "Start Instant Matching",
      region_locked: "This platform is unavailable in your region. We currently only serve users within Africa.",
      // Add more translation keys as you go!
    },
  },
  fr: {
    translation: {
      landing_title: "Lancer les grandes startups africaines",
      landing_cta: "Démarrer l'association instantanée",
      region_locked: "Cette plateforme n'est pas disponible dans votre région. Nous ne servons actuellement que l'Afrique.",
    },
  },
  rw: {
    translation: {
      landing_title: "Kubaka u Rwanda rufite za Startup nziza",
      landing_cta: "Tangira Guhuza Ako kanya",
      region_locked: "Iyi platform ntiboneka mu karere kawe. Ibenegihugu b’Afurika ni bo bonyine bemerewe kuyikoresha.",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
