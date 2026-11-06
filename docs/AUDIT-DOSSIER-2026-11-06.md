# Contrôle du dossier — 6 novembre 2026

## Mise à jour après intégration des affiches

Les cinq affiches du Module 04 utilisées par S13 ont été copiées dans `public/ressources/affiches/` et intégrées à l’accueil, à l’Atelier (S14), au Portfolio (S15–S16), aux ressources et à la projection web. Le site compilé et le HTML autonome ont été reconstruits. Le contrôle passe désormais pour 23 diapositives et 28 ressources, y compris l’identité binaire des téléchargements et l’intégration des images. La reconstruction a également résolu la désynchronisation Markdown décrite dans l’état initial ci-dessous, sans modifier son contenu source.

Le PowerPoint et le PDF de projection conservent leurs 18 diapositives ; les cinq diapositives ajoutées concernent la présentation web. L’installation signale deux dépendances de développement vulnérables (`vite` et `source-map-js`), confirmées par `npm.cmd audit --json` ; leurs mises à jour restent à traiter. Aucun serveur de développement n’a été démarré pour ce contrôle.

## État initial avant intégration

Le dossier contient les sources de l’atelier S14, le site compilé, une édition HTML autonome et les supports pédagogiques annoncés. Le contrôle automatisé actuel échoue sur une désynchronisation mineure. Aucun support existant n’a été modifié pendant cet audit.

## Résultats

| Contrôle exécuté | Résultat |
|---|---|
| Structure et lecture des sources | Sources, scripts, documentation, ressources et livrables présents |
| `npm.cmd run check` | Échec à la ligne 50 de `scripts/verifier.mjs`, sur `ressources/demo/sorties-observees-s14.md` |
| Comparaison des 23 ressources | 22 identiques entre `public/`, `dist/` et HTML autonome ; un écart détaillé ci-dessous |
| Assertions précédant cet échec | Réussies : structure, mesures, import S13, préservation des champs, exports Markdown, navigation et liens contrôlés |
| Syntaxe JavaScript | `main.js`, `portfolio.js`, `preparer.mjs` et `autonome.mjs` passent `node --check` |
| Script Python | Exécution réussie ; variantes 149, 195 et 166 caractères, message corrigé 159 |
| Notebook | Les cinq cellules de code exécutées successivement sous Python avec succès, sans interface Jupyter |
| PowerPoint à la racine | Identique octet par octet à celui de `public/ressources/projection/` |
| Trois PDF à la racine | Tous différents de leurs homonymes dans `public/ressources/documents/` |
| Environnement | Node.js 24.12.0 ; `node_modules/` absent ; aucun dépôt Git détecté |

## Écart à traiter

`public/ressources/demo/sorties-observees-s14.md` contient un espace avant le premier `#`. Le fichier source mesure 5 958 octets, les copies dans `dist/` et le HTML autonome 5 957 octets. La comparaison confirme que cet espace initial est l’unique différence.

L’impact sur le contenu pédagogique est faible, mais l’identité binaire exigée par le vérificateur n’est plus satisfaite. Le résultat historique « tous les contrôles passent » du README et du rapport du 3 novembre ne décrit donc plus l’état actuel.

Pour retrouver la cohérence, retirer cet espace s’il est accidentel, ou reconstruire les livrables s’il est voulu, puis relancer `npm.cmd run check`. Les assertions après la ligne d’échec, notamment la fin de boucle des ressources, le contrôle final du HTML autonome et l’empreinte Bootstrap, n’ont pas été atteintes par cette exécution.

## Points de vigilance

- Les trois paires de PDF homonymes peuvent créer une ambiguïté lors de la distribution. Leur différence binaire est confirmée ; leur équivalence visuelle et pédagogique n’a pas été établie. Les ressources du site correspondent à celles de `public/ressources/documents/`.
- PowerShell bloque `npm.ps1` sur ce poste. Utiliser `npm.cmd` permet de lancer le contrôle sans modifier la politique d’exécution.
- Les fonctions JavaScript relues utilisent `textContent` pour les textes importés et préservent les champs déjà remplis lors de l’import S13. Cette revue ciblée ne constitue pas un audit de sécurité exhaustif.

## Limites et suite

Pas d’installation de dépendances ni de nouvelle compilation. Pas de contrôle visuel du navigateur, des PDF, de Word ou du PowerPoint. Pas d’essai interactif du presse-papiers, du stockage local, de la projection ou des téléchargements.

Avant la séance du 9 novembre : résoudre l’écart Markdown, relancer le contrôle complet, puis répéter sur le poste de formation le parcours projection → import S13 → saisie → export → réouverture. Comparer les PDF homonymes avant de choisir une version à distribuer ou de supprimer un doublon.
