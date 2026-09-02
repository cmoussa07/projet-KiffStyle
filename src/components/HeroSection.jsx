function HeroSection() {
  return (
    <section className="bg-linear-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-8 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">Bienvenue chez KiffStyle</h2>

        <p className="text-xl text-blue-100 mb-10">
          Découvrez les meilleures chaussures et accessoires au meilleur prix.
        </p>

        <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition">
          Découvrir nos produits
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
