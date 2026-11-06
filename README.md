# Atelier LN-IA — Séance 14

**Un message, trois variantes** · Module 04 · Challenge 100 Jours Automne 2026.  
Séance du lundi **9 novembre 2026**, durée de 90 minutes, conduite par le Prof. Abderrahman El Hisse.

Ce dossier contient un atelier web utilisable hors ligne, un diaporama, des fiches pédagogiques et une démonstration Python/Jupyter. Le candidat reprend sa trace S13, rédige une version humaine, compare trois formulations, choisit un canal et justifie une correction.

## Démarrer sans installation

1. Ouvrir [OUVRIR-SEANCE-14.html](OUVRIR-SEANCE-14.html) dans un navigateur récent. Ce fichier autonome embarque les 28 ressources et peut être copié seul.
2. Choisir « Projeter la séance » pour le diaporama ou « Atelier » pour la rédaction.
3. Télécharger les productions Markdown, puis les rouvrir avant de fermer le navigateur. Les saisies locales dépendent du navigateur et ne remplacent pas un export.

Le guide [COMMENCER-ICI.md](COMMENCER-ICI.md) détaille l’animation et le déroulement des 90 minutes. Sur un poste partagé, effacer les saisies S14 après avoir vérifié les exports.

## Organisation du dossier

Les cinq affiches du Module 04 sont intégrées comme dans l’atelier 13 : galerie à l’accueil, repère S14 dans l’Atelier, suite S15–S16 dans le Portfolio et cinq diapositives de projection supplémentaires. Cliquez sur une affiche pour la projeter ou sur « PNG » pour la télécharger. Les originaux sont dans `public/ressources/affiches/` et sont embarqués dans le HTML autonome.

| Emplacement | Rôle |
|---|---|
| `OUVRIR-SEANCE-14.html` | Édition autonome prête à utiliser |
| `src/atelier.html`, `src/seance.json` | Modèle et contenu de la séance |
| `src/main.js`, `src/portfolio.js`, `src/style.css` | Interactions, import/export et présentation |
| `src/vendor/` et `licenses/` | Styles tiers locaux et mentions associées |
| `public/ressources/documents/` | Conducteur, fiche candidat et corrigé, en PDF et Word |
| `public/ressources/projection/` | Diaporama PowerPoint et PDF |
| `public/ressources/demo/` | Cas JSON, script Python, notebook et résultats préparés |
| `public/ressources/sources/` | Guide, journal de corrections et exemple S13 |
| `public/ressources/atelier/` | Prompts, modèles de preuves, affiche et cas de secours |
| `scripts/` | Préparation HTML, génération autonome et vérification |
| `dist/` | Site compilé pour hébergement statique |
| `index.html` | Entrée Vite générée depuis les sources |
| `docs/` | Contrôles et origines pédagogiques |

Les trois PDF à la racine portent les mêmes noms que ceux de `public/ressources/documents/`, mais leurs contenus binaires diffèrent. Utiliser les fichiers de `public/ressources/documents/`, cohérents avec les téléchargements du site ; comparer visuellement les versions avant de supprimer ou remplacer les PDF de la racine. Modifier les sources dans `src/` et les ressources dans `public/`, puis reconstruire les livrables générés.

## Développement et contrôles

Node.js 24 est conseillé et présent sur le poste contrôlé. Python 3 est nécessaire uniquement pour la démonstration ; Jupyter sert à ouvrir le notebook.

```powershell
npm.cmd ci
npm.cmd run dev
```

Le serveur de développement est configuré sur le port 5173 et écoute sur toutes les interfaces réseau. L’installation nécessite l’accès au registre npm.

```powershell
npm.cmd run build
npm.cmd run check
npm.cmd run preview
```

La compilation régénère `index.html`, `dist/` et `OUVRIR-SEANCE-14.html`. Le contrôle peut aussi être lancé directement sur les fichiers livrés, sans installer Vite :

```powershell
npm.cmd run check
python public/ressources/demo/comparer-variantes-s14.py
```

Pour Jupyter, ouvrir `public/ressources/demo/comparer-variantes-s14.ipynb`, sélectionner Python 3 et exécuter les cinq cellules dans l’ordre. Le notebook embarque son cas fictif ; conserver sa cohérence avec `cas-guide.json` si les exemples changent.

Pour publier, utiliser le contenu de `dist/`. Si une URL publique est connue, renseigner `ATELIER_PUBLIC_URL` avant la compilation, suivant [COMMENCER-ICI.md](COMMENCER-ICI.md). Aucun hébergement n’est nécessaire pour l’atelier hors ligne.

## Résultat du contrôle du 6 novembre 2026

Les contrôles automatisés livrés passent : 11 rubriques, 23 diapositives (18 de la séance et 5 affiches), 8 cartes, 6 questions, 4 prompts et 28 ressources. Les ressources intégrées au HTML autonome sont identiques octet par octet aux originaux et aux copies de `dist/`. L’import S13, la préservation des champs et la génération Markdown passent les assertions existantes.

Le script Python et les cinq cellules du notebook s’exécutent avec succès. Les variantes mesurent respectivement **149, 195 et 166 caractères** ; la version corrigée en compte **159**.

Les dépendances ont été installées et les livrables reconstruits après intégration des affiches. Les 23 diapositives concernent la présentation web ; le PowerPoint et le PDF de projection conservent leurs 18 diapositives. Le contrôle visuel complet sur le poste de projection reste à réaliser. Voir le [rapport de contrôle](docs/AUDIT-DOSSIER-2026-11-06.md) pour le périmètre exact et les deux alertes sur les dépendances de développement.

## Versionnement local

Le dépôt Git local conserve les sources, les ressources pédagogiques et les livrables prêts à ouvrir (`dist/`, `index.html`, `OUVRIR-SEANCE-14.html`). Les dépendances, caches, fichiers temporaires et secrets locaux sont exclus par `.gitignore`. Les fins de ligne sont fixées à LF pour préserver les contrôles d’identité binaire entre ressources et téléchargements embarqués.

Après une modification des sources ou des ressources, lancer `npm.cmd run build`, puis `npm.cmd run check`, examiner `git diff --stat` et créer un commit. Les anciens rapports d’audit décrivent l’état du dossier au moment de leur rédaction.

## Prochaine étape

**La prochaine action est une répétition complète de S14 sur le poste de formation.** Ouvrir le HTML autonome, projeter les diapositives, importer la trace fictive S13, remplir un exemple et exporter puis rouvrir les deux fichiers Markdown. Vérifier également l’ouverture de la fiche PDF et du notebook dans Jupyter.

À l’issue de S14, conserver dans le dossier du candidat :

- `04-communication/message-court-projet.md` : version humaine, trois variantes, comparaison, canal, correction motivée et message final ;
- `07-portfolio/preuves-module-04.md` : entrée `preuve-14-message-projet-et-variantes`, en conservant la preuve S13.

**La suite pédagogique est S15, vendredi 13 novembre 2026.** Apporter deux variantes, leur passage source et une règle à tester. Distinguer un fait stable d’une formulation variable et expliquer la limite du contrôle automatique. Exemple déjà fourni : ajouter « Abonnez-vous à la lettre » conserve une seule occurrence exacte de l’action recherchée, alors que le lecteur repère deux invitations.

S16, lundi **16 novembre 2026**, poursuivra avec un notebook guidé et un export local à corriger, rouvrir et expliquer. La validation pédagogique des productions revient au pilote après observation.
