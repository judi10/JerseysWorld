// src/components/CheckoutFlow.jsx
// Processus interactif "suivre des instructions" (Devoir 4, section 2a).
// 4 etapes : Panier -> Informations -> Paiement -> Confirmation.
// La barre d'etapes indique toujours ou se trouve l'utilisateur,
// ce qui a ete complete et ce qu'il reste a faire (heuristique H1).

import { useState } from "react";

const ETAPES = ["Panier", "Informations", "Paiement", "Confirmation"];

export default function CheckoutFlow({ panier, onRetirerArticle, onCommandeConfirmee, onRetourBoutique, onContinuerAchats }) {
  const [etapeActuelle, setEtapeActuelle] = useState(0);
  const [infos, setInfos] = useState({ nom: "", adresse: "", ville: "", codePostal: "", courriel: "" });
  const [paiement, setPaiement] = useState({ numeroCarte: "", expiration: "", cvv: "" });
  const [numeroCommande] = useState(() => `JW-${Math.floor(100000 + Math.random() * 900000)}`);

  const sousTotal = panier.reduce((total, item) => total + item.produit.prix, 0);

  function allerEtapeSuivante() {
    if (etapeActuelle === 2) {
      onCommandeConfirmee();
    }
    setEtapeActuelle((e) => Math.min(e + 1, ETAPES.length - 1));
  }

  function allerEtapePrecedente() {
    setEtapeActuelle((e) => Math.max(e - 1, 0));
  }

  return (
    <div className="processus-commande">
      {/* Barre d'etapes : etat du systeme toujours visible */}
      <ol className="barre-etapes">
        {ETAPES.map((etape, index) => (
          <li
            key={etape}
            className={
              index === etapeActuelle
                ? "etape etape-active"
                : index < etapeActuelle
                ? "etape etape-completee"
                : "etape"
            }
          >
            <span className="etape-numero">{index < etapeActuelle ? "✓" : index + 1}</span>
            {etape}
          </li>
        ))}
      </ol>

      {/* Etape 1 : Panier */}
      {etapeActuelle === 0 && (
        <section className="etape-contenu">
          <h2>Votre panier</h2>
          {panier.length === 0 ? (
            <p className="aucun-resultat">
              Votre panier est vide. Retournez a la boutique pour choisir un maillot.
            </p>
          ) : (
            <>
              <ul className="liste-panier">
                {panier.map((item, index) => (
                  <li key={index} className="ligne-panier">
                    <div>
                      <strong>{item.produit.nom}</strong> — Taille {item.taille}
                      {item.flocage && item.flocage.nom && (
                        <div className="detail-flocage">
                          Flocage : {item.flocage.nom} #{item.flocage.numero || "--"}
                        </div>
                      )}
                    </div>
                    <div className="ligne-panier-droite">
                      <span>{item.produit.prix.toFixed(2)} $</span>
                      <button className="lien-effacer" onClick={() => onRetirerArticle(index)}>
                        Retirer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="sous-total">Sous-total : {sousTotal.toFixed(2)} $</p>
            </>
          )}
          <button
            className="bouton-principal"
            disabled={panier.length === 0}
            onClick={allerEtapeSuivante}
          >
            Passer a la livraison
          </button>
          <button className="bouton-secondaire" type="button" onClick={onContinuerAchats}>
            ← Continuer mes achats
          </button>
        </section>
      )}

      {/* Etape 2 : Informations personnelles */}
      {etapeActuelle === 1 && (
        <section className="etape-contenu">
          <h2>Informations de livraison</h2>
          <form
            className="formulaire"
            onSubmit={(e) => {
              e.preventDefault();
              allerEtapeSuivante();
            }}
          >
            <label>
              Nom complet
              <input
                required
                value={infos.nom}
                onChange={(e) => setInfos({ ...infos, nom: e.target.value })}
              />
            </label>
            <label>
              Adresse
              <input
                required
                value={infos.adresse}
                onChange={(e) => setInfos({ ...infos, adresse: e.target.value })}
              />
            </label>
            <div className="formulaire-ligne">
              <label>
                Ville
                <input
                  required
                  value={infos.ville}
                  onChange={(e) => setInfos({ ...infos, ville: e.target.value })}
                />
              </label>
              <label>
                Code postal
                <input
                  required
                  value={infos.codePostal}
                  onChange={(e) => setInfos({ ...infos, codePostal: e.target.value })}
                />
              </label>
            </div>
            <label>
              Courriel
              <input
                type="email"
                required
                value={infos.courriel}
                onChange={(e) => setInfos({ ...infos, courriel: e.target.value })}
              />
            </label>
            <button className="bouton-principal" type="submit">
              Passer au paiement
            </button>
            <button className="bouton-secondaire" type="button" onClick={allerEtapePrecedente}>
              ← Retour au panier
            </button>
          </form>
        </section>
      )}

      {/* Etape 3 : Paiement */}
      {etapeActuelle === 2 && (
        <section className="etape-contenu">
          <h2>Paiement</h2>
          <p className="note-info">
            Ceci est un formulaire de demonstration : aucune transaction reelle n'est effectuee.
          </p>
          <form
            className="formulaire"
            onSubmit={(e) => {
              e.preventDefault();
              allerEtapeSuivante();
            }}
          >
            <label>
              Numero de carte
              <input
                required
                placeholder="0000 0000 0000 0000"
                value={paiement.numeroCarte}
                onChange={(e) => setPaiement({ ...paiement, numeroCarte: e.target.value })}
              />
            </label>
            <div className="formulaire-ligne">
              <label>
                Date d'expiration
                <input
                  required
                  placeholder="MM/AA"
                  value={paiement.expiration}
                  onChange={(e) => setPaiement({ ...paiement, expiration: e.target.value })}
                />
              </label>
              <label>
                CVV
                <input
                  required
                  placeholder="123"
                  value={paiement.cvv}
                  onChange={(e) => setPaiement({ ...paiement, cvv: e.target.value })}
                />
              </label>
            </div>
            <button className="bouton-principal" type="submit">
              Confirmer et payer — {sousTotal.toFixed(2)} $
            </button>
            <button className="bouton-secondaire" type="button" onClick={allerEtapePrecedente}>
              ← Retour aux informations
            </button>
          </form>
        </section>
      )}

      {/* Etape 4 : Confirmation */}
      {etapeActuelle === 3 && (
        <section className="etape-contenu etape-confirmation">
          <div className="icone-confirmation">✔</div>
          <h2>Merci pour votre commande !</h2>
          <p>
            Votre numero de commande est <strong>{numeroCommande}</strong>. Un courriel de
            confirmation vous sera envoye sous peu.
          </p>
          <button className="bouton-principal" onClick={onRetourBoutique}>
            Retour a la boutique
          </button>
        </section>
      )}
    </div>
  );
}
