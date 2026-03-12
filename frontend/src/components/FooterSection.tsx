import { motion } from "framer-motion";
import { Instagram, MapPin, Phone, Mail } from "lucide-react";

const FooterSection = () => {
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
          >
            <h3 className="text-2xl font-extrabold mb-4">
              LED <span className="text-primary">Cursos</span>
            </h3>
            <p className="text-background/60 text-sm leading-relaxed">
              Formando profissionais para a indústria com cursos técnicos e profissionalizantes de qualidade.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-background/40">Institucional</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li><a href="#cursos" className="hover:text-primary transition-colors">Cursos</a></li>
              <li><a href="https://www.instagram.com/cursosled/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="https://wa.me/559885268000" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a></li>
            </ul>
          </motion.div>

          {/* Instagram Feed Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-background/40">Instagram</h4>
            <a
              href="https://www.instagram.com/cursosled/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl bg-background/5 border border-background/10 hover:bg-background/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <Instagram className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold">@cursosled</span>
              </div>
              <p className="text-xs text-background/50">Siga-nos para novidades, dicas e conteúdo sobre o mundo industrial.</p>
            </a>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-background/40">Localização</h4>
            <a
              href="https://www.google.com/maps/place/Rio+Amazonas+Center/@-2.5522126,-44.2195994,3a,75y,140.81h,93.23t/data=!3m7!1e1!3m5!1sBecUOTXWcdtdOGFZUZBFng!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-3.2290343511409105%26panoid%3DBecUOTXWcdtdOGFZUZBFng%26yaw%3D140.81062904227397!7i16384!8i8192!4m14!1m7!3m6!1s0x7f6915962448263:0x9d608e21d2591a9b!2sRio+Amazonas+Center!8m2!3d-2.5525387!4d-44.2193212!16s%2Fg%2F11s7ws10fg!3m5!1s0x7f6915962448263:0x9d608e21d2591a9b!8m2!3d-2.5525387!4d-44.2193212!16s%2Fg%2F11s7ws10fg?entry=ttu&g_ep=EgoyMDI2MDMwOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl bg-background/5 border border-background/10 hover:bg-background/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold">Nossa sede</span>
              </div>
              <p className="text-xs text-background/50 leading-relaxed">
                Av. Jeronimo de Albuquerque, 25 - Forquilha, Rio Amazonas Center, São Luís, Brazil 65060-641
              </p>
              <p className="text-xs text-primary mt-3">Ver no Google Maps →</p>
            </a>

            <div className="mt-4 space-y-2 text-sm text-background/60">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>(98) 8526-8000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>contato@ledcursos.com.br</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">© {new Date().getFullYear()} LED Cursos. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/cursosled/" target="_blank" rel="noopener noreferrer" className="text-background/40 hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
