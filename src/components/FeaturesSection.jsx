const features = [
  {
    icon: "local_shipping",
    title: "Livraison Rapide",
    text: "Parce que l'attente est le pire ennemi du drop. Expédition sous 24h ouvrées pour toutes les commandes.",
  },
  {
    icon: "verified",
    title: "100% Authentique",
    text: "Chaque paire est rigoureusement inspectée par nos experts. L'authenticité est notre garantie absolue.",
  },
  {
    icon: "support_agent",
    title: "Support Premium",
    text: "Une équipe dédiée de passionnés à votre écoute 7j/7 pour vous accompagner dans vos choix.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="max-w-container-max-width mx-auto px-gutter my-section-gap">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-surface p-8 rounded-xl border border-surface-variant flex flex-col items-start gap-4"
          >
            <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">
                {feature.icon}
              </span>
            </div>
            <h3 className="font-title-md text-title-md text-on-background">
              {feature.title}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
