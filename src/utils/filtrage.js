// src/utils/filtrage.js
// Filtre les produits selon les filtres actifs.
// Regle standard e-commerce : AND entre facettes differentes,
// OR entre les valeurs d'une meme facette (ex: taille).

export function filtrerProduits(produits, filtres) {
  return produits.filter((produit) => {
    // 0. Facette "promotion" (maillots en solde uniquement)
    if (filtres.promotion.length > 0 && produit.prixOriginal === null) {
      return false;
    }

    // 1. Facette "continent" (valeur simple par produit)
    if (
      filtres.continent.length > 0 &&
      !filtres.continent.includes(produit.continent)
    ) {
      return false;
    }

    // 2. Facette "taille" (le produit possede un tableau de tailles)
    //    Le produit est retenu si AU MOINS UNE taille selectionnee est disponible.
    if (filtres.taille.length > 0) {
      const auMoinsUneTailleDisponible = filtres.taille.some((t) =>
        produit.taille.includes(t)
      );
      if (!auMoinsUneTailleDisponible) return false;
    }

    // 3. Facette "prix" (curseur maximum)
    if (produit.prix > filtres.prix) return false;

    return true;
  });
}
