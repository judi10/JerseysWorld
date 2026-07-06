// src/components/FacetPanel.jsx
// Panneau lateral de filtres. Inclut un bouton "Effacer les filtres"
// (heuristique : controle et liberte de l'utilisateur).

import FacetGroup from "./FacetGroup";

export default function FacetPanel({ config, filtres, onToggle, onRange, onEffacerTout, filtresActifs }) {
  return (
    <aside className="panneau-facettes">
      <div className="panneau-facettes-entete">
        <h2>Filtres</h2>
        {filtresActifs && (
          <button className="lien-effacer" onClick={onEffacerTout}>
            Effacer tout
          </button>
        )}
      </div>

      {config.map((facette) => (
        <FacetGroup
          key={facette.id}
          facette={facette}
          valeurActive={filtres[facette.id]}
          onToggle={onToggle}
          onRange={onRange}
        />
      ))}
    </aside>
  );
}
