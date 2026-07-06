// src/components/Header.jsx
// Barre de navigation principale : logo, liens de navigation, panier.

export default function Header({ pageActuelle, onNaviguer, nombreArticlesPanier }) {
  return (
    <header className="entete">
      <div className="entete-contenu">
        <button className="logo" onClick={() => onNaviguer("boutique")}>
          Jerseys<span>World</span>
        </button>

        <nav className="nav-principale">
          <button
            className={pageActuelle === "boutique" ? "lien-nav actif" : "lien-nav"}
            onClick={() => onNaviguer("boutique")}
          >
            Boutique
          </button>
          <button
            className={pageActuelle === "sondage" ? "lien-nav actif" : "lien-nav"}
            onClick={() => onNaviguer("sondage")}
          >
            Donner mon avis
          </button>
        </nav>

        <button className="bouton-panier" onClick={() => onNaviguer("commande")}>
          🛒 Sélection
          <span className="badge-panier">{nombreArticlesPanier}</span>
        </button>
      </div>
    </header>
  );
}
