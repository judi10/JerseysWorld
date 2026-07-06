// src/data/continents.js
// Regroupement des nations par continent pour la recherche a facettes.
// Chaque continent recoit une couleur d'etiquette distincte (badge)
// utilisee sur les cartes produit, independamment du theme principal du site.

export const CONTINENTS = [
  {
    id: "afrique",
    label: "Afrique",
    couleurBadge: "#F2913D", // orange terre
  },
  {
    id: "amerique-nord",
    label: "Amerique du Nord",
    couleurBadge: "#3DB6CF", // sarcelle
  },
  {
    id: "amerique-sud",
    label: "Amerique du Sud",
    couleurBadge: "#F2C230", // or
  },
  {
    id: "europe",
    label: "Europe",
    couleurBadge: "#5B7FDB", // bleu royal
  },
  {
    id: "asie",
    label: "Asie",
    couleurBadge: "#B267D6", // violet
  },
  {
    id: "oceanie",
    label: "Oceanie",
    couleurBadge: "#E85C8A", // rose corail
  },
];

// Fonction utilitaire pour recuperer l'objet continent a partir de son id
export function obtenirContinent(id) {
  return CONTINENTS.find((c) => c.id === id);
}
