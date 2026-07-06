// src/components/SearchPage.jsx
// Page principale de la boutique : bandeau promotionnel (objectif
// "inciter a l'action"), panneau de facettes et grille de resultats.

import FacetPanel from "./FacetPanel";
import ProductGrid from "./ProductGrid";
import { CONFIG_FACETTES } from "../data/facettes";

export default function SearchPage({ produits, filtres, onToggle, onRange, onEffacerTout, onAjouterAuPanier }) {
  const filtresActifs =
    filtres.promotion.length > 0 ||
    filtres.continent.length > 0 ||
    filtres.taille.length > 0 ||
    filtres.prix < 100;

  return (
    <>
      <div className="entete-page-catalogue">
        <h1>Catalogue complet</h1>
        <p>Filtrez par continent, taille ou budget pour trouver votre maillot.</p>
      </div>

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
