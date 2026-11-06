 # Sorties observées de la démonstration S14

Lundi 9 novembre 2026 · support de projection hors ligne · exemple fictif du formateur

## Faire prédire avant d’afficher le résultat

1. Montrez seulement la version humaine puis les trois brouillons préparés ci-dessous. Quel mot différencie le ton de B de celui de C ?
2. Demandez qui choisirait C pour un courriel à des formateurs débutants. Faites souligner un mot difficile et proposer une correction.
3. Affichez les mesures et les essais. Dans l’exemple qui commence par « Abonnez-vous », Python trouve une seule occurrence exacte de l’action prévue. Combien de choses le lecteur est-il pourtant invité à faire ?
4. Rouvrez la ligne « Forme — accessibilité » dans le journal S12. L’ajout d’une garantie de résultat se justifie-t-il par l’une des pièces ?

## Relevé d’exécution

Le texte suivant provient du script Python. Le notebook autonome affiche les mêmes sorties, dans le même ordre, en cinq cellules. Les trois variantes avaient été écrites pour simuler des propositions d’IA. Le comptage, les essais et l’application de la correction ont été exécutés pendant la préparation.

```text
S14 · COMPARER TROIS VARIANTES · Démonstration fictive
Source S12 : guide pratique V2 à relire et journal de corrections.
Public : Formateurs débutants qui relisent un premier support produit avec l’IA.
Fait 1 : Le dossier conserve les versions V1 et V2 du guide.
Fait 2 : Le journal explique les corrections et leurs raisons.
Action : Souhaitez-vous voir un extrait du journal de corrections ?

VERSION HUMAINE DE DÉMONSTRATION
J’ai gardé les deux versions du guide. Le journal dit ce que j’ai changé et pourquoi. Souhaitez-vous voir un extrait du journal de corrections ?

TROIS BROUILLONS PRÉPARÉS POUR SIMULER LES PROPOSITIONS DE L’IA
A · Courte et directe
Le dossier conserve V1 et V2 du guide. Le journal explique chaque correction et sa raison. Souhaitez-vous voir un extrait du journal de corrections ?

B · Chaleureuse
Bonjour, si vous relisez votre premier support, vous pouvez comparer V1 et V2 du guide. Le journal explique ce qui a changé et pourquoi. Souhaitez-vous voir un extrait du journal de corrections ?

C · Professionnelle
Le dossier conserve les versions V1 et V2 du guide. Le journal documente les modifications et leurs motifs. Souhaitez-vous voir un extrait du journal de corrections ?

MESURES
Version humaine | 144 caractères | occurrences exactes de l’action : 1
A | 149 caractères | occurrences exactes de l’action : 1
B | 195 caractères | occurrences exactes de l’action : 1
C | 166 caractères | occurrences exactes de l’action : 1

TROIS ESSAIS POUR PRÉPARER S15
Le dossier conserve V1 et V2 du guide. Le journal explique chaque correction et sa raison. Souhaitez-vous voir un extrait du journal de corrections ? Souhaitez-vous voir un extrait du journal de corrections ?
Répétition exacte | 208 caractères | occurrences exactes de l’action : 2
Abonnez-vous à la lettre. Le dossier conserve V1 et V2 du guide. Le journal explique chaque correction et sa raison. Souhaitez-vous voir un extrait du journal de corrections ?
Autre action ajoutée | 175 caractères | occurrences exactes de l’action : 1
Ce guide garantit un document sans erreur. Souhaitez-vous voir un extrait du journal de corrections ?
Promesse sans source | 101 caractères | occurrences exactes de l’action : 1
Le comptage repère la répétition exacte. Une autre demande exige une relecture.
La garantie doit être écartée après comparaison au guide et au journal.

ARBITRAGE HUMAIN ILLUSTRÉ
Variante choisie : C
Canal choisi : Courriel professionnel
Avant : Le journal documente les modifications et leurs motifs.
Après : Le journal explique ce qui a changé et pourquoi.
Raison : Ces mots décrivent plus simplement le contenu du journal pour un formateur débutant.
Message retenu : Le dossier conserve les versions V1 et V2 du guide. Le journal explique ce qui a changé et pourquoi. Souhaitez-vous voir un extrait du journal de corrections ?
C corrigée | 159 caractères | occurrences exactes de l’action : 1
Brouillon à relire. Décision du pilote en attente.
```

## Rejouer et vérifier

- Placez `comparer-variantes-s14.py` et `cas-guide.json` dans le même dossier. Sous Windows, ouvrez ce dossier et lancez `py -3 comparer-variantes-s14.py`. Vous pouvez aussi utiliser `python comparer-variantes-s14.py`. Le script recherche la fiche à côté de son fichier.
- Ouvrez `comparer-variantes-s14.ipynb` dans Jupyter ou VS Code avec un noyau Python 3. Le notebook contient une copie du cas pour fonctionner seul. Pour travailler sur une autre copie fictive, indiquez son chemin dans la première cellule puis réexécutez les cinq cellules.
- Les longueurs utilisent `len` sur le texte, espaces et ponctuation compris. La règle `count` cherche une formulation littérale identique, casse et ponctuation comprises. Lisez le texte pour repérer un deuxième impératif, une paraphrase de l’action ou une affirmation sans source.
- Pour la préparation, les cinq cellules ont été exécutées sous Python dans un seul espace de noms. Leur sortie complète a été comparée à celle du script lancé depuis un autre dossier. Le notebook a été contrôlé avec le schéma officiel nbformat 4.5. L’interface Jupyter et le noyau IPython ne sont pas installés sur le poste de préparation. Le formateur peut donc vérifier le lancement dans sa propre interface avant la projection.

## Passage vers la séance 15

Demandez aux binômes de garder deux variantes et un exemple de limite du contrôle mécanique. Recueillez la rédaction personnelle, A/B/C, le tableau comparatif, le canal choisi, la correction expliquée et le message retenu dans `04-communication/message-court-projet.md`. Ajoutez l’entrée `preuve-14-message-projet-et-variantes` à l’index de portfolio après observation.
