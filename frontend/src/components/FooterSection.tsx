import { motion } from "framer-motion";
import { Instagram, MapPin, Phone, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

const FooterSection = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <img 
              src="/logo.jpg" 
              alt="EduPlatform Logo" 
              className="h-12 w-auto self-start rounded-lg shadow-sm mb-2"
            />
            <p className="text-background/60 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-background/40">{t("footer.institutional")}</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li><a href="#cursos" className="hover:text-primary transition-colors">{t("navbar.courses")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
            </ul>
          </motion.div>

          {/* Social Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-background/40">{t("footer.socialMedia")}</h4>
            <a
              href="#"
              className="block p-4 rounded-xl bg-background/5 border border-background/10 hover:bg-background/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <Instagram className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold">@eduplatform</span>
              </div>
              <p className="text-xs text-background/50">{t("footer.followUs")}</p>
            </a>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-background/40">{t("footer.location")}</h4>
            <div
              className="block p-4 rounded-xl bg-background/5 border border-background/10"
            >
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold">{t("footer.headquarters")}</span>
              </div>
              <p className="text-xs text-background/50 leading-relaxed">
                {t("footer.address")}
              </p>
            </div>

            <div className="mt-4 space-y-2 text-sm text-background/60">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>(00) 0000-0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>contato@exemplo.com.br</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">© {new Date().getFullYear()} EduPlatform. {t("footer.copyright")}</p>
          <div className="flex gap-4">
            <a href="#" className="text-background/40 hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
