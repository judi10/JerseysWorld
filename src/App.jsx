// src/App.jsx
// Composant racine de Jerseys World.
// Gere l'etat global : page courante, filtres actifs, panier (selection).

import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import CheckoutFlow from "./components/CheckoutFlow";
import SurveyPage from "./components/SurveyPage";
import { PRODUITS } from "./data/produits";
import "./App.css";

export default function App() {
  const [pageActuelle, setPageActuelle] = useState("accueil");

  // Etat centralise des filtres actifs (recherche a facettes)
  const [filtres, setFiltres] = useState({
    promotion: [],
    continent: [],
    taille: [],
    prix: 100,
  });

  // Panier (selection) : tableau d'objets { produit, taille, flocage }
  const [panier, setPanier] = useState([]);

  // Callback : bascule d'une case a cocher de facette
  function gererToggleFacette(facetteId, valeur) {
    setFiltres((prev) => {
      const actuel = prev[facetteId];
      const misAJour = actuel.includes(valeur)
        ? actuel.filter((v) => v !== valeur)
        : [...actuel, valeur];
      return { ...prev, [facetteId]: misAJour };
    });
  }

  // Callback : mise a jour du curseur de prix
  function gererChangementRange(facetteId, valeur) {
    setFiltres((prev) => ({ ...prev, [facetteId]: valeur }));
  }

  function gererEffacerFiltres() {
    setFiltres({ promotion: [], continent: [], taille: [], prix: 100 });
  }

  function gererAjoutPanier(article) {
    setPanier((prev) => [...prev, article]);
  }

  function gererRetraitPanier(index) {
    setPanier((prev) => prev.filter((_, i) => i !== index));
  }

  function gererCommandeConfirmee() {
    // La commande est confirmee ; le panier est vide au prochain passage a la boutique
  }

  function gererRetourBoutique() {
    setPanier([]);
    setPageActuelle("boutique");
  }

  return (
    <div className="application">
      <Header
        pageActuelle={pageActuelle}
        onNaviguer={setPageActuelle}
        nombreArticlesPanier={panier.length}
      />

      {pageActuelle === "accueil" && (
        <HomePage
          produits={PRODUITS}
          onAjouterAuPanier={gererAjoutPanier}
          onVoirCatalogue={() => setPageActuelle("boutique")}
        />
      )}

      {pageActuelle === "boutique" && (
        <SearchPage
          produits={PRODUITS}
          filtres={filtres}
          onToggle={gererToggleFacette}
          onRange={gererChangementRange}
          onEffacerTout={gererEffacerFiltres}
          onAjouterAuPanier={gererAjoutPanier}
        />
      )}

      {pageActuelle === "commande" && (
        <CheckoutFlow
          panier={panier}
          onRetirerArticle={gererRetraitPanier}
          onCommandeConfirmee={gererCommandeConfirmee}
          onRetourBoutique={gererRetourBoutique}
          onContinuerAchats={() => setPageActuelle("boutique")}
        />
      )}

      {pageActuelle === "sondage" && <SurveyPage />}

      <Footer />
    </div>
  );
}
