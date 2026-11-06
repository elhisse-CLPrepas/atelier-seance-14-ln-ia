# Contrôle du dossier — 3 novembre 2026

## Conclusion

Le pack S14 est fourni avec ses livrables hors ligne. Aucun échec n’a été rencontré dans les contrôles automatisés exécutés. La prochaine étape recommandée est une répétition sur le poste de formation avant la séance du 9 novembre, puis la préparation des éléments de S15 du 13 novembre.

## Vérifications réalisées pendant cet audit

| Contrôle | Résultat |
|---|---|
| Lecture de la structure, des consignes et des scripts | Projet Vite, sources, site compilé et HTML autonome présents |
| `npm run check` | Succès des assertions livrées : structure, mesures, import, export, liens locaux et ressources |
| Ressources | 23 ressources déclarées ; identité binaire entre originaux, `dist/` et téléchargements embarqués vérifiée par le script |
| Syntaxe JavaScript | `main.js`, `portfolio.js`, `preparer.mjs` et `autonome.mjs` contrôlés sans erreur |
| Démonstration Python | Exécution réussie, variantes 149/195/166 caractères, finale 159 |
| Notebook | Cinq cellules exécutées successivement en Python ; cas embarqué identique au JSON et correction finale conforme |
| PDF à la racine | Les trois fichiers diffèrent au niveau binaire de leurs homonymes dans `public/ressources/documents/` ; la nature des différences reste à examiner |
| Environnement disponible | Node.js 24.12.0, npm 11.6.2, Python 3.14.5 |
| Versionnement | Aucun dépôt Git détecté dans ce dossier ou ses parents |

L’exécution des cellules a été faite directement sous Python, sans interface Jupyter. Elle vérifie le code, pas le fonctionnement du noyau dans l’application de projection.

## Limites et points à vérifier

- `node_modules/` absent : installation des dépendances et nouvelle compilation non réalisées. Les tests portent sur les livrables déjà présents.
- Pas de nouvelle inspection visuelle du navigateur, des PDF, des documents Word ou du PowerPoint. Les contrôles historiques décrits dans `CONTROLE-S14.md` n’ont pas tous été rejoués.
- Trois PDF homonymes existent en deux versions binaires différentes. Privilégier les ressources de `public/ressources/documents/`, vérifiées contre le site autonome, et comparer les versions avant toute harmonisation.
- La sauvegarde locale, le presse-papiers et les téléchargements doivent être essayés dans le navigateur réellement utilisé pour la formation.
- Les assertions livrées couvrent des cas précis ; elles ne constituent pas une validation de chaque interaction ni de chaque production candidate.

## Actions suivantes

1. Répéter le parcours autonome : projection, import S13, saisie, export et réouverture des fichiers.
2. Vérifier la fiche candidat et le notebook dans les applications du poste de formation.
3. Si les sources doivent être modifiées, installer avec `npm ci`, lancer `npm run build`, puis `npm run check` avant diffusion.
4. Pour S15, recueillir deux variantes et leur source, puis formuler une règle testable avec un contre-exemple.

Le README ajouté à la racine fournit le point d’entrée et les commandes. Les sources et les livrables pédagogiques existants n’ont pas été modifiés par cet audit.
