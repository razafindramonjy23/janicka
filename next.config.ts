import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Export statique : `npm run build` génère un dossier `out/`
   * contenant le site complet en HTML/CSS/JS, à uploader tel quel
   * dans `public_html/` sur cPanel.
   */
  output: "export",

  /**
   * Obligatoire avec l’export statique : sans serveur Node, Next ne peut
   * pas optimiser les images à la volée. Les fichiers de /public/images
   * sont donc servis tels quels — garde-les légers.
   */
  images: { unoptimized: true },

  /**
   * Génère /index.html plutôt que /index — plus sûr avec Apache (cPanel).
   */
  trailingSlash: true,
};

export default nextConfig;
