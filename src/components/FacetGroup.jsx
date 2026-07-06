// src/components/FacetGroup.jsx
// Affiche un groupe de facettes : soit une liste de cases a cocher,
// soit un curseur (range), selon la configuration.

import { CONTINENTS, obtenirContinent } from "../data/continents";

// Traduit un identifiant d'option en libelle lisible + couleur (si continent)
function libelleOption(facetteId, valeur) {
  if (facetteId === "continent") {
    const c = obtenirContinent(valeur);
    return c ? c.label : valeur;
  }
  return valeur;
}

export default function FacetGroup({ facette, valeurActive, onToggle, onRange }) {
  return (
    <div className="groupe-facette">
      <h3>{facette.label}</h3>

      {facette.type === "checkbox" && (
        <ul className="liste-facette">
          {facette.options.map((opt) => (
            <li key={opt}>
              <label>
                <input
                  type="checkbox"
                  checked={valeurActive.includes(opt)}
                  onChange={() => onToggle(facette.id, opt)}
                />
                {facette.id === "continent" && (
                  <span
                    className="pastille-continent"
                    style={{ backgroundColor: obtenirContinent(opt)?.couleurBadge }}
                    aria-hidden="true"
                  />
                )}
                {libelleOption(facette.id, opt)}
              </label>
            </li>
          ))}
        </ul>
      )}

      {facette.type === "range" && (
        <div className="groupe-range">
          <input
            type="range"
            min={facette.min}
            max={facette.max}
            step={facette.step}
            value={valeurActive}
            onChange={(e) => onRange(facette.id, Number(e.target.value))}
            aria-label={`${facette.label} : ${valeurActive} dollars`}
          />
          <div className="range-etiquettes">
            <span>{facette.min} $</span>
            <span className="range-valeur">Jusqu'a {valeurActive} $</span>
            <span>{facette.max} $</span>
          </div>
        </div>
      )}
    </div>
  );
}
