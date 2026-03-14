import { motion } from "framer-motion";
import { Users, Award, TrendingUp, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

const instagramPosts = [
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=400&fit=crop",
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const SocialProofSection = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Users, value: "3.000+", label: t("socialProof.stats.students") },
    { icon: Calendar, value: "15+", label: t("socialProof.stats.experience") },
    { icon: TrendingUp, value: "92%", label: t("socialProof.stats.employability") },
    { icon: Award, value: "100%", label: t("socialProof.stats.certification") },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-8 rounded-2xl gradient-card shadow-card"
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
              <p className="text-3xl md:text-4xl font-extrabold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Instagram */}
        <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t("socialProof.instagramTitle")}</h2>
            <a
              href="#"
              className="text-primary font-medium hover:underline"
            >
              @eduplatform
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {instagramPosts.map((src, i) => (
              <motion.a
                key={i}
                href="#"
                className="relative group aspect-square rounded-xl overflow-hidden shadow-card w-[calc(50%-1rem)] sm:w-[calc(33.33%-1rem)] lg:w-[calc(18%-1rem)] max-w-[180px]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img src={src} alt="EduPlatform Instagram" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
