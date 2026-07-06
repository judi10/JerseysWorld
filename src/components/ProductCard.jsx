// src/components/ProductCard.jsx
// Carte d'un maillot. Permet de choisir une taille et, en option,
// un flocage (nom + numero) avant l'ajout a la selection.

import { useState } from "react";
import MaillotIllustration from "./MaillotIllustration";
import { obtenirContinent } from "../data/continents";

export default function ProductCard({ produit, onAjouterAuPanier }) {
  const [tailleChoisie, setTailleChoisie] = useState(produit.taille[0]);
  const [flocageActif, setFlocageActif] = useState(false);
  const [nomFlocage, setNomFlocage] = useState("");
  const [numeroFlocage, setNumeroFlocage] = useState("");
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const continent = obtenirContinent(produit.continent);
  const enSolde = produit.prixOriginal !== null;
  const pourcentageRabais = enSolde
    ? Math.round(100 - (produit.prix / produit.prixOriginal) * 100)
    : 0;

  function gererAjout() {
    onAjouterAuPanier({
      produit,
      taille: tailleChoisie,
      flocage: flocageActif ? { nom: nomFlocage.trim(), numero: numeroFlocage.trim() } : null,
    });

    // Retroaction visuelle immediate (heuristique : visibilite de l'etat)
    setConfirmationVisible(true);
    setTimeout(() => setConfirmationVisible(false), 1600);
  }

  return (
    <div className="carte-produit">
      {produit.nouveau && <span className="badge badge-nouveau">Nouveau</span>}
      {enSolde && <span className="badge badge-solde">-{pourcentageRabais}%</span>}

      <div className="carte-image">
        <MaillotIllustration
          couleurPrimaire={produit.couleurPrimaire}
          couleurSecondaire={produit.couleurSecondaire}
          nom={produit.nom}
        />
      </div>

      <div className="carte-corps">
        {continent && (
          <span className="pastille-badge" style={{ backgroundColor: continent.couleurBadge }}>
            {continent.label}
          </span>
        )}

        <h4>{produit.nom}</h4>
        <p className="carte-description">{produit.description}</p>

        <div className="carte-prix">
          <span className="prix-actuel">{produit.prix.toFixed(2)} $</span>
          {enSolde && <span className="prix-original">{produit.prixOriginal.toFixed(2)} $</span>}
        </div>

        <label className="etiquette-champ">
          Taille
          <select value={tailleChoisie} onChange={(e) => setTailleChoisie(e.target.value)}>
            {produit.taille.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="case-flocage">
          <input
            type="checkbox"
            checked={flocageActif}
            onChange={(e) => setFlocageActif(e.target.checked)}
          />
          Ajouter un flocage (nom + numero)
        </label>

        {flocageActif && (
          <div className="champs-flocage">
            <input
              type="text"
              placeholder="Nom au dos"
              maxLength={12}
              value={nomFlocage}
              onChange={(e) => setNomFlocage(e.target.value)}
            />
            <input
              type="text"
              placeholder="Numero"
              maxLength={2}
              value={numeroFlocage}
              onChange={(e) => setNumeroFlocage(e.target.value.replace(/\D/g, ""))}
            />
          </div>
        )}

        <button className="bouton-ajouter" onClick={gererAjout}>
          {confirmationVisible ? "Ajoute ✓" : "Ajouter a ma selection"}
        </button>
      </div>
    </div>
  );
}
