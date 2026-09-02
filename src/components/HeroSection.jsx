export default function HeroSection() {
  return (
    <section className="max-w-container-max-width mx-auto px-gutter mt-margin-desktop mb-section-gap">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center min-h-150">
        <div className="col-span-1 md:col-span-5 flex flex-col items-start gap-6 z-10">
          <h1 className="font-display-lg text-display-lg text-on-background">
            L'Adrénaline du <span className="text-primary">Drop.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
            Les pièces que tout le monde veut. Le style que tu veux afficher.
            Découvre les sneakers et pièces streetwear qui font la différence.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            {/* TODO: brancher sur navigate("/produits") */}
            <button className="bg-primary text-on-primary font-label-bold text-label-bold px-8 py-4 rounded hover:scale-[1.02] transition-transform shadow-md hover:shadow-lg">
              Découvrir les produits
            </button>
            <button className="border-2 border-outline text-on-background font-label-bold text-label-bold px-8 py-4 rounded hover:border-primary transition-colors">
              Voir les nouveautés
            </button>
          </div>
        </div>

        <div className="col-span-1 md:col-span-7 relative h-full min-h-100 rounded-xl overflow-hidden grid grid-cols-2 gap-4 group">
          <div className="col-span-1 h-100 md:h-150rounded-lg overflow-hidden relative">
            <img
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              alt="Sneaker streetwear premium sur fond blanc avec accents bleus"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzC2MR0qe4_OhP0kNfoh_BarLEjUk4jcGWN6nnv2YaVQ-e3NyOiQWj81vnVZZpXR_UrxBtmQurBv-HdMWvEmKS61t5l_yW2BeD3pLhvHzu9cJKaYEg_Pvxgu8Jod-4ko3XX-bwWuHFdU8_7G1HOK3ydW1meFAyOqi2ooekt-Ghq-G97-4MruPiSWgKheS2ykBtgDpdK2gZrftoXs2E-qBzhiyoIPHk6s1kUlauPCgL_R-wyUR-G1ASRw"
            />
          </div>
          <div className="col-span-1 h-100 md:h-150 rounded-lg overflow-hidden relative mt-8 md:mt-16">
            <img
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 delay-100"
              alt="Modèle portant un streetwear tendance avec sneakers exclusives"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW446QFUk9_DIvwEk1EZNWriEWiw7GYi30parFmbach4id-iX7DDd2r15kDOSk9rUJZD9W5aDkwWnRX2ZwEeAvT_MCWqJVwK8amPDiY9CTamOs4__WsOLCA8q4genvkAcgpj5q0rueQZGAkQrjQAryqFAHg64D0BEWSxrz0Djv6ZOMso7YCypkUR21292nhPjrs9ns5gTbmM4Hg8Syl22VAjv8Ssu3qbvdHL-0B9ACPgWrIXmr5AOEMg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
