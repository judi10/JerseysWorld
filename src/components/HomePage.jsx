// src/components/HomePage.jsx
// Page d'accueil : premiere page vue par l'utilisateur, distincte du
// catalogue complet. Met en avant les maillots en promotion et invite
// a explorer le catalogue via la recherche a facettes.

import ProductCard from "./ProductCard";

export default function HomePage({ produits, onAjouterAuPanier, onVoirCatalogue }) {
  const produitsEnPromo = produits.filter((p) => p.prixOriginal !== null);

  return (
    <>
      <section className="banniere-promo banniere-accueil">
        <p className="banniere-etiquette">Coupe du Monde 2026</p>
        <h1>Portez les couleurs de votre nation !</h1>
        <p className="banniere-texte">
          17 nations, 6 continents. Maillots unisexes, flocage personnalise disponible
          sur chaque maillot, livraison partout dans le monde.
        </p>
        <button className="bouton-principal bouton-hero" onClick={onVoirCatalogue}>
          Explorer le catalogue complet
        </button>
      </section>

      <section className="section-accueil">
        <div className="section-accueil-entete">
          <h2>Offres du moment</h2>
          <p className="section-accueil-soustitre">
            Jusqu'a -25% sur une selection de maillots, pour un temps limite.
          </p>
        </div>

        <div className="grille-produits grille-vedette">
          {produitsEnPromo.map((p) => (
            <ProductCard key={p.id} produit={p} onAjouterAuPanier={onAjouterAuPanier} />
          ))}
        </div>

        <button className="bouton-secondaire bouton-voir-tout" onClick={onVoirCatalogue}>
          Voir tout le catalogue →
        </button>
      </section>
    </>
  );
}
