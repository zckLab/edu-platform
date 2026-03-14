import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelectorModal from "./LanguageSelectorModal";

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t("navbar.courses"), href: "#cursos" },
    { label: t("navbar.howItWorks"), href: "#como-funciona" },
    { label: t("navbar.faq"), href: "#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-lg shadow-card border-b border-border" : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <img 
            src="/logo.jpg" 
            alt="EduPlatform Logo" 
            className="h-10 w-auto rounded-lg shadow-sm"
          />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                scrolled ? "text-foreground/70" : "text-primary-foreground/70"
              }`}
            >
              {link.label}
            </a>
          ))}
          <LanguageSelectorModal scrolled={scrolled} />
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSelectorModal scrolled={scrolled} />
          <button
            className={scrolled ? "text-foreground" : "text-primary-foreground"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          className="md:hidden bg-background border-b border-border shadow-card"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
        >
          <div className="container py-4 flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <img
                src="/logo.jpg"
                alt="EduPlatform Logo"
                className="h-12 w-auto self-start rounded-lg shadow-sm mb-2"
              />
            </motion.div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/70 font-medium hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
