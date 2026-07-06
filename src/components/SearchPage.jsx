// src/components/SearchPage.jsx
// Page principale de la boutique : bandeau promotionnel (objectif
// "inciter a l'action"), panneau de facettes et grille de resultats.

import FacetPanel from "./FacetPanel";
import ProductGrid from "./ProductGrid";
import { CONFIG_FACETTES } from "../data/facettes";

export default function SearchPage({ produits, filtres, onToggle, onRange, onEffacerTout, onAjouterAuPanier }) {
  const filtresActifs =
    filtres.continent.length > 0 || filtres.taille.length > 0 || filtres.prix < 100;

  return (
    <>
      <section className="banniere-promo">
        <p className="banniere-etiquette">Offres du moment</p>
        <h1>Portez les couleurs de votre nation !</h1>
        <p className="banniere-texte">
          Jusqu'a -25% sur une selection de maillots. Livraison partout dans le monde,
          flocage personnalise disponible sur chaque maillot.
        </p>
      </section>

      <div className="mise-en-page-boutique">
        <FacetPanel
          config={CONFIG_FACETTES}
          filtres={filtres}
          onToggle={onToggle}
          onRange={onRange}
          onEffacerTout={onEffacerTout}
          filtresActifs={filtresActifs}
        />
        <ProductGrid produits={produits} filtres={filtres} onAjouterAuPanier={onAjouterAuPanier} />
      </div>
    </>
  );
}
