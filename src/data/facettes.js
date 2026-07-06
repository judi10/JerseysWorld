// src/data/facettes.js
// Configuration de la recherche a facettes.
// Separer cette configuration du code de rendu permet d'ajouter/modifier
// une facette en ne touchant qu'a ce fichier.
//
// Reseau semantique considere pour ce site (maillots de football unisexes) :
//   Maillot -> Continent (6 valeurs) -> Nation
//           -> Taille (unisexe, pas de facette de genre)
//           -> Prix

import { CONTINENTS } from "./continents";

export const CONFIG_FACETTES = [
  {
    id: "promotion",
    label: "Promotions",
    type: "checkbox",
    options: ["Solde"],
  },
  {
    id: "continent",
    label: "Continent",
    type: "checkbox",
    options: CONTINENTS.map((c) => c.id),
  },
  {
    id: "taille",
    label: "Taille",
    type: "checkbox",
    // Ordre logique (pas alphabetique) : du plus petit au plus grand
    options: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "prix",
    label: "Prix maximum",
    type: "range",
    min: 0,
    max: 100,
    step: 5,
  },
];
