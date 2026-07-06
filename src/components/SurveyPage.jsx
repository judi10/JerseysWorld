// src/components/SurveyPage.jsx
// Processus interactif "communication" (Devoir 4, section 2c) :
// un court sondage de satisfaction, volontairement peu intrusif
// (quelques champs, aucune obligation de compte).
// Le ton ici illustre l'objectif "etablir une connexion".

import { useState } from "react";

export default function SurveyPage() {
  const [note, setNote] = useState(0);
  const [commentaire, setCommentaire] = useState("");
  const [envoye, setEnvoye] = useState(false);

  function gererEnvoi(e) {
    e.preventDefault();
    setEnvoye(true);
  }

  if (envoye) {
    return (
      <section className="page-sondage">
        <div className="carte-sondage etape-confirmation">
          <div className="icone-confirmation">✔</div>
          <h2>Merci du fond du cœur !</h2>
          <p>Votre avis nous aide a offrir une meilleure experience a tous les supporters.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page-sondage">
      <div className="carte-sondage">
        <h1>Votre avis compte pour nous !</h1>
        <p className="sondage-intro">
          Une minute suffit. Dites-nous comment s'est passee votre visite sur Jerseys World.
        </p>

        <form onSubmit={gererEnvoi} className="formulaire">
          <fieldset className="groupe-notation">
            <legend>Comment evaluez-vous votre experience ?</legend>
            <div className="etoiles">
              {[1, 2, 3, 4, 5].map((valeur) => (
                <button
                  type="button"
                  key={valeur}
                  className={valeur <= note ? "etoile etoile-active" : "etoile"}
                  onClick={() => setNote(valeur)}
                  aria-label={`${valeur} etoile${valeur > 1 ? "s" : ""}`}
                >
                  ★
                </button>
              ))}
            </div>
          </fieldset>

          <label>
            Un commentaire a partager ? (optionnel)
            <textarea
              rows={4}
              placeholder="Dites-nous ce que vous avez aime ou ce qu'on peut ameliorer..."
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
            />
          </label>

          <button className="bouton-principal" type="submit" disabled={note === 0}>
            Envoyer mon avis
          </button>
        </form>
      </div>
    </section>
  );
}
