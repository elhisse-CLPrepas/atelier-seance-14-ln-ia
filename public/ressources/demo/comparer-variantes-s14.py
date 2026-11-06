"""Démonstration S14. Lire les brouillons, mesurer puis expliquer une correction.

Lancer avec Python 3. Le cas fictif provient de cas-guide.json, placé à côté du
script. Le paramètre facultatif --fiche accepte une autre copie du même modèle.
Les résultats s'affichent dans le terminal. Aucun fichier n'est modifié.
"""

import argparse
import json
from pathlib import Path


def mesurer(texte, action):
    """Compter les caractères Unicode et les occurrences littérales de l'action."""
    if not action.strip():
        raise ValueError("Renseignez l’action à rechercher.")
    return len(texte), texte.count(action)


def afficher_source(cas):
    print("S14 · COMPARER TROIS VARIANTES · Démonstration fictive")
    print("Source S12 : guide pratique V2 à relire et journal de corrections.")
    print("Public :", cas["public"])
    print("Fait 1 :", cas["fait1"])
    print("Fait 2 :", cas["fait2"])
    print("Action :", cas["action"])
    print()


def afficher_messages(cas):
    print("VERSION HUMAINE DE DÉMONSTRATION")
    print(cas["humaine"])
    print()
    print("TROIS BROUILLONS PRÉPARÉS POUR SIMULER LES PROPOSITIONS DE L’IA")
    for variante in cas["variantes"]:
        print(f'{variante["id"]} · {variante["ton"]}')
        print(variante["texte"])
        print()


def ligne_mesure(nom, texte, action):
    longueur, occurrences = mesurer(texte, action)
    print(f"{nom} | {longueur} caractères | occurrences exactes de l’action : {occurrences}")


def afficher_mesures(cas):
    print("MESURES")
    ligne_mesure("Version humaine", cas["humaine"], cas["action"])
    for variante in cas["variantes"]:
        ligne_mesure(variante["id"], variante["texte"], cas["action"])
    print()


def afficher_essais(cas):
    print("TROIS ESSAIS POUR PRÉPARER S15")
    action = cas["action"]
    courte = cas["variantes"][0]["texte"]
    essais = {
        "Répétition exacte": courte + " " + action,
        "Autre action ajoutée": "Abonnez-vous à la lettre. " + courte,
        "Promesse sans source": cas["intrus"] + " " + action,
    }
    for nom, texte in essais.items():
        print(texte)
        ligne_mesure(nom, texte, action)
    print("Le comptage repère la répétition exacte. Une autre demande exige une relecture.")
    print("La garantie doit être écartée après comparaison au guide et au journal.")
    print()


def afficher_choix(cas):
    textes = {variante["id"]: variante["texte"] for variante in cas["variantes"]}
    texte_choisi = textes[cas["choix"]]
    if not cas["avant"].strip() or texte_choisi.count(cas["avant"]) != 1:
        raise ValueError("Le passage « avant » doit apparaître une fois dans la variante choisie.")
    message_retenu = texte_choisi.replace(cas["avant"], cas["apres"], 1)
    if message_retenu != cas["final"]:
        raise ValueError("La correction saisie ne correspond pas au message final de la fiche.")
    print("ARBITRAGE HUMAIN ILLUSTRÉ")
    print("Variante choisie :", cas["choix"])
    print("Canal choisi :", cas["canal"])
    print("Avant :", cas["avant"])
    print("Après :", cas["apres"])
    print("Raison :", cas["motif"])
    print("Message retenu :", message_retenu)
    ligne_mesure(cas["choix"] + " corrigée", message_retenu, cas["action"])
    print("Brouillon à relire. Décision du pilote en attente.")


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--fiche", type=Path, default=Path(__file__).with_name("cas-guide.json"),
                        help="Copie du cas de démonstration au format JSON.")
    config = parser.parse_args()
    try:
        cas = json.loads(config.fiche.read_text(encoding="utf-8-sig"))
        afficher_source(cas)
        afficher_messages(cas)
        afficher_mesures(cas)
        afficher_essais(cas)
        afficher_choix(cas)
    except (OSError, ValueError, KeyError, IndexError, TypeError) as erreur:
        parser.exit(1, f"Cas illisible ou incomplet dans {config.fiche} : {erreur}\n")


if __name__ == "__main__":
    main()
