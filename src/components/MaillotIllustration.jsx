// src/components/MaillotIllustration.jsx
// Illustration vectorielle generique d'un maillot de football.
// Volontairement SANS logo de marque ni ecusson de federation :
// seules les couleurs nationales sont utilisees, pour eviter toute
// reproduction de contenu protege. A remplacer par de vraies images
// (generees ou libres de droits) si souhaite plus tard.

export default function MaillotIllustration({ couleurPrimaire, couleurSecondaire, nom }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="maillot-illustration"
      role="img"
      aria-label={nom}
    >
      {/* Corps du maillot */}
      <path
        d="M60 40 L80 25 L100 35 L120 25 L140 40 L165 55 L150 80 L135 70 L135 175 L65 175 L65 70 L50 80 L35 55 Z"
        fill={couleurPrimaire}
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="2"
      />
      {/* Bande secondaire au col */}
      <path
        d="M80 25 L100 35 L120 25 L118 42 L100 50 L82 42 Z"
        fill={couleurSecondaire}
      />
      {/* Bandes sur les manches */}
      <rect x="35" y="55" width="18" height="10" fill={couleurSecondaire} transform="rotate(-25 44 60)" />
      <rect x="147" y="55" width="18" height="10" fill={couleurSecondaire} transform="rotate(25 156 60)" />
      {/* Rayure centrale sobre */}
      <rect x="95" y="70" width="10" height="100" fill={couleurSecondaire} opacity="0.35" />
    </svg>
  );
}
