// src/components/ProductGrid.jsx
// Affiche les produits correspondant aux filtres actifs.
// Le compteur de resultats et le message "aucun resultat" repondent
// a l'heuristique de visibilite de l'etat du systeme.

import { filtrerProduits } from "../utils/filtrage";
import ProductCard from "./ProductCard";

export default function ProductGrid({ produits, filtres, onAjouterAuPanier }) {
  const resultats = filtrerProduits(produits, filtres);

  return (
    <main className="grille-produits-conteneur">
      <p className="compteur-resultats">
        {resultats.length} maillot{resultats.length !== 1 ? "s" : ""} trouve
        {resultats.length !== 1 ? "s" : ""}
      </p>

      {resultats.length === 0 ? (
        <p className="aucun-resultat">
          Aucun maillot ne correspond a vos criteres. Essayez d'elargir vos filtres.
        </p>
      ) : (
        <div className="grille-produits">
          {resultats.map((p) => (
            <ProductCard key={p.id} produit={p} onAjouterAuPanier={onAjouterAuPanier} />
          ))}
        </div>
      )}
    </main>
  );
}
