import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, X, Check } from "lucide-react";

const languages = [
  {
    country: "Brasil",
    flag: "🇧🇷",
    options: [{ code: "pt", label: "Português" }],
  },
  {
    country: "United States",
    flag: "🇺🇸",
    options: [{ code: "en", label: "English" }],
  },
  {
    country: "Polska",
    flag: "🇵🇱",
    options: [{ code: "pl", label: "Polski" }],
  },
];

interface LanguageSelectorModalProps {
  scrolled?: boolean;
}

const LanguageSelectorModal = ({ scrolled = false }: LanguageSelectorModalProps) => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleChange = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`p-2 rounded-lg transition-colors hover:bg-primary/10 ${
          scrolled ? "text-foreground/70" : "text-primary-foreground/70"
        } hover:text-primary`}
        aria-label="Select language"
        id="language-selector-trigger"
      >
        <Globe className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90vw] max-w-md bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    {t("languageSelector.title")}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("languageSelector.subtitle")}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Language List */}
              <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
                {languages.map((group) => (
                  <div key={group.country}>
                    {group.options.map((lang) => {
                      const isActive = i18n.language?.startsWith(lang.code);
                      return (
                        <button
                          key={lang.code}
                          onClick={() => handleChange(lang.code)}
                          className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-primary/10 border border-primary/30 shadow-sm"
                              : "hover:bg-muted border border-transparent"
                          }`}
                        >
                          <span className="text-2xl">{group.flag}</span>
                          <div className="flex-1 text-left">
                            <p className={`font-semibold text-sm ${isActive ? "text-primary" : "text-foreground"}`}>
                              {lang.label}
                            </p>
                            <p className="text-xs text-muted-foreground">{group.country}</p>
                          </div>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                            >
                              <Check className="h-3.5 w-3.5 text-primary-foreground" />
                            </motion.div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LanguageSelectorModal;
