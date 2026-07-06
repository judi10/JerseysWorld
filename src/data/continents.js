// src/data/continents.js
// Regroupement des nations par continent pour la recherche a facettes.
// Chaque continent recoit une couleur d'etiquette distincte (badge)
// utilisee sur les cartes produit, independamment du theme principal du site.

// Un seul style de badge (couleur accent du site) pour tous les continents :
// plus simple, plus coherent visuellement, et garantit un bon contraste
// (au lieu d'un badge d'une couleur differente par continent).
const COULEUR_BADGE_UNIQUE = "#F2C230"; // jaune carton, texte fonce dessus

export const CONTINENTS = [
  { id: "afrique", label: "Afrique", couleurBadge: COULEUR_BADGE_UNIQUE },
  { id: "amerique-nord", label: "Amerique du Nord", couleurBadge: COULEUR_BADGE_UNIQUE },
  { id: "amerique-sud", label: "Amerique du Sud", couleurBadge: COULEUR_BADGE_UNIQUE },
  { id: "europe", label: "Europe", couleurBadge: COULEUR_BADGE_UNIQUE },
  { id: "asie", label: "Asie", couleurBadge: COULEUR_BADGE_UNIQUE },
  { id: "oceanie", label: "Oceanie", couleurBadge: COULEUR_BADGE_UNIQUE },
];

// Fonction utilitaire pour recuperer l'objet continent a partir de son id
export function obtenirContinent(id) {
  return CONTINENTS.find((c) => c.id === id);
}
