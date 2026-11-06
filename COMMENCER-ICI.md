# Animer la séance 14 du lundi 9 novembre 2026

Un message, trois variantes · Challenge 100 Jours Automne 2026 · Module 04 · Semaine 07  
Atelier de 90 minutes conduit par le Prof. Abderrahman El Hisse.

## Ouvrir l’atelier

1. Extrayez le ZIP, puis ouvrez `OUVRIR-SEANCE-14.html` dans un navigateur récent. Ce fichier contient l’interface et ses 28 ressources. Il fonctionne également si vous le copiez seul sur une clé USB.
2. Cliquez sur « Projeter la séance ». Les flèches gauche et droite changent de diapositive. Échap ferme la projection. « Notes formateur » affiche les notes à l’écran. En réunion, utilisez les notes avant le partage ou ouvrez le PowerPoint en mode Présentateur.
3. Distribuez la fiche candidat au format Word ou PDF. Le PDF propose 31 champs sur 3 pages. Pour l’imprimer, choisissez le format A4. Le diaporama PDF de 18 pages permet aussi de projeter sans ouvrir l’atelier web.

## Préparer le lundi 9 novembre

| À ouvrir ou à distribuer | Emplacement dans le dossier |
|---|---|
| Conducteur de 90 minutes avec prolongement optionnel de 30 minutes | `public/ressources/documents/conducteur-formateur-s14.pdf` |
| Fiche candidat et corrigé A/B/C | `public/ressources/documents/` |
| Diaporama modifiable, notes et PDF | `public/ressources/projection/` |
| Guide V2, journal et exemple fictif de trace S13 | `public/ressources/sources/` |
| Script, notebook, données fictives et relevé hors ligne | `public/ressources/demo/` |
| Prompts, cas Samira, modèles du message et du portfolio | `public/ressources/atelier/` |

Demandez à chacun d’apporter sa trace du vendredi 6 novembre. Une fiche fictive S13 et le cas de Samira permettent de travailler si elle manque. Préparez un exemplaire des trois brouillons avant la séance. Ils peuvent remplacer l’assistant connecté.

## Conduire les 90 minutes

| Minutes | Geste du candidat | Ce que le formateur observe |
|---|---|---|
| 0–10 | Reprendre sa fiche S13, son public, deux faits et une action. | Le candidat retrouve les passages de référence. |
| 10–20 | Observer la démonstration sur le dossier fictif ou écouter un participant présentateur. | Le groupe distingue ce qui doit rester stable et ce qui peut varier. |
| 20–35 | Écrire avec ses propres mots et souligner l’action. | La version humaine est conservée. |
| 35–55 | Produire ou comparer les trois brouillons A, B et C. | Chaque variante s’adresse au même public et conserve les faits et l’action. |
| 55–70 | Comparer le vocabulaire, le ton et la longueur, puis choisir le canal. | Le candidat cite les mots qui motivent son choix. |
| 70–85 | Corriger un passage et relire le message complet. | L’avant, l’après, le motif et la version retenue sont retrouvables. |
| 85–90 | Exporter, rouvrir et classer le fichier puis le référencer dans l’index. | Le candidat peut montrer la preuve au pilote. |

Question d’ouverture. « À partir de votre message S13, comment changer le ton sans changer les faits ni l’action demandée au lecteur ? »

Deux relances à utiliser. « Quel passage du guide vous permet de garder cette phrase ? » « Quels mots avez-vous changés pour ce lecteur et pourquoi ? »

## Introduire les agents et préparer S15

Au Module 03, le lecteur retrouve un passage dans le guide ou le journal. En S13, le candidat sélectionne ses faits. En S14, il demande à un agent comparateur de signaler, pour chaque brouillon, un fait conservé, une différence de formulation et une incertitude. Le mandat porte sur des fichiers fictifs en lecture seule. Les sorties d’IA préécrites du support sont identifiées comme simulations. Aucun envoi ni accès à une API n’est nécessaire.

Le script et le notebook illustrent deux mesures réelles, le nombre de caractères et les occurrences exactes de la demande. Essayez le cas qui ajoute « Abonnez-vous à la lettre ». Le compteur trouve toujours la question finale une seule fois. L’humain repère la seconde invitation. Ce contre-exemple peut ouvrir S15.

La capsule de cinq minutes pour la fin du Module 03 se trouve dans `public/ressources/atelier/capsule-fin-module-03.md`.

## Remettre la preuve

Le candidat range sa rédaction, les trois variantes, le tableau, le canal, la correction motivée et le message retenu dans `04-communication/message-court-projet.md`. Il ajoute à `07-portfolio/preuves-module-04.md` une entrée portant l’identifiant `preuve-14-message-projet-et-variantes`. Il conserve l’entrée de S13. Le pilote consigne sa décision après avoir observé le travail.

Pour vendredi 13 novembre, apportez deux variantes avec leur source et une règle à tester. En S15, le groupe étudiera ce que cette règle peut mesurer. En S16, lundi 16 novembre, il l’appliquera dans un notebook guidé.

## Utiliser le formulaire local

Dans Atelier, vous pouvez importer une trace Markdown au format de S13. Examinez l’aperçu, puis choisissez « Reprendre les champs vides ». Les champs S14 déjà remplis sont préservés. La version humaine S14 reste à rédiger. Une trace d’un autre format peut être saisie directement.

Le navigateur conserve les réponses localement s’il l’autorise. Les boutons du portfolio permettent de télécharger ou de copier le texte. Rouvrez le Markdown avant de fermer le navigateur. Sur un poste partagé, utilisez « Effacer mes saisies de S14 » après export. Cette commande ne vise que cette séance. La fiche, le corrigé et les modèles à télécharger offrent aussi une voie entièrement sur papier ou en traitement de texte.

## Modifier les sources ou préparer l’hébergement

Le projet utilise Vite 8.2.1 et Bootstrap 5.3.8 intégré localement. Avec Node.js 24, dans le dossier du projet, utilisez les commandes suivantes.

```sh
npm.cmd ci
npm.cmd run dev
```

Pour reconstruire le site statique et l’édition autonome, puis vérifier les fichiers :

```sh
npm.cmd run build
npm.cmd run check
npm.cmd run preview
```

L’installation des outils de développement utilise le registre npm. Pour animer la séance, utilisez directement le HTML autonome ou le dossier compilé déjà livré. Les textes éditables sont dans `src/`, le cas commun dans `public/ressources/demo/cas-guide.json` et les fichiers à distribuer dans `public/ressources/`. Si un exemple ou une mesure change, mettez également à jour le corrigé Word, le diaporama et les cellules du notebook avant de recompiler.

Le contenu de `dist/` peut être installé sous un sous-dossier d’un hébergement statique. Pour des liens de partage absolus, définissez `ATELIER_PUBLIC_URL` sur l’URL réelle du dossier avant compilation. Sous PowerShell, utilisez `$env:ATELIER_PUBLIC_URL = Read-Host "URL publique du dossier"` puis relancez le build. Le titre, la description, les balises Open Graph, le visuel de partage et la donnée structurée LearningResource figurent dans l’HTML compilé. L’URL canonique n’est ajoutée que si elle a été renseignée.

La correspondance avec les supports d’été se trouve dans `docs/ORIGINES-ET-ADAPTATIONS.md`. Les vérifications sont détaillées dans `docs/CONTROLE-S14.md`.
