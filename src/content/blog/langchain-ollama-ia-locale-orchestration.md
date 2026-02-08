---
title: "LangChain + Ollama: Votre IA Locale Orchestrée"
description: "Orchestrez vos modèles IA locaux avec LangChain et Ollama. Un tutoriel pratique pour des workflows d'agents IA performants et respectueux de la vie privée."
date: 2026-02-09
tags: ["LangChain", "Ollama", "IA Locale", "Orchestration", "Agents IA"]
category: "Agentic Workflows"
image: "/images/blog/langchain-ollama-ia-locale-orchestration.webp"
---

## LangChain et Ollama : L'Orchestration d'IA Locale à Portée de Main

Bienvenue, architectes du digital ! Dans cet article, nous allons explorer comment combiner la puissance de LangChain pour l'orchestration d'agents IA avec la flexibilité d'Ollama pour l'exécution locale de modèles. L'objectif ? Créer des workflows d'IA performants, respectueux de la vie privée et totalement sous votre contrôle.

### Pourquoi l'IA Locale ?

Avant de plonger dans le code, prenons un instant pour comprendre l'intérêt d'exécuter des modèles IA localement :

*   **Confidentialité :** Vos données ne quittent jamais votre machine. Idéal pour les applications sensibles.
*   **Coût :** Plus besoin de payer pour chaque requête API. Une fois le modèle téléchargé, son utilisation est gratuite.
*   **Performance :** L'exécution locale réduit la latence, ce qui est crucial pour les applications temps réel.
*   **Autonomie :** Vous n'êtes pas dépendant d'une connexion internet ou d'un fournisseur de services externe.

### Ollama : Votre Hub de Modèles IA Locaux

[Ollama](https://ollama.ai/) est un outil formidable qui simplifie le téléchargement et l'exécution de modèles IA sur votre machine. Il supporte une large gamme de modèles, de Llama 2 à Mistral, et permet de les lancer en quelques commandes.

**Installation :**

L'installation d'Ollama est un jeu d'enfant. Rendez-vous sur le site officiel et suivez les instructions pour votre système d'exploitation.

**Lancement d'un modèle :**

Une fois installé, lancer un modèle est aussi simple que :

```bash
ollama run llama2
```

Ollama téléchargera le modèle Llama 2 (si ce n'est pas déjà fait) et lancera une interface interactive.

### LangChain : L'Orchestrateur d'Agents IA

[LangChain](https://www.langchain.com/) est un framework puissant pour construire des applications basées sur des modèles de langage. Il offre une multitude de fonctionnalités, notamment :

*   **Chains :** Enchaîner plusieurs opérations (prompts, modèles, outils) pour créer des workflows complexes.
*   **Agents :** Permettre au modèle de langage d'interagir avec des outils externes (recherche web, calculatrice, etc.).
*   **Memory :** Stocker et récupérer des informations pour donner de la mémoire à vos agents.

**Installation :**

Installez LangChain avec pip :

```bash
pip install langchain
```

### Vibe Coding : LangChain + Ollama en Action

Maintenant, passons à la partie amusante : combiner LangChain et Ollama pour créer un agent IA local.

L'idée est de **ne pas se noyer dans les détails syntaxiques**, mais de comprendre la *logique* du code.

**Étape 1 : Configuration de l'environnement**

```python
import os
from langchain_community.llms import Ollama
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

os.environ["OLLAMA_BASE_URL"] = "http://localhost:11434"


llm = Ollama(model="llama2")

```

Ce code initialise LangChain avec Ollama comme backend. Il est crucial de définir la variable d'environnement `OLLAMA_BASE_URL` si Ollama n'est pas accessible sur le port par défaut (11434). Notez que le Vibe Coding privilégie la *lisibilité* à la complexité.

**Étape 2 : Création d'un Prompt**

```python
prompt_template = """Tu es un assistant expert en cuisine française. Réponds aux questions de l'utilisateur de manière concise et précise.

Question : {question}

Réponse:"""

prompt = PromptTemplate(template=prompt_template, input_variables=["question"])
```

Ici, on définit un prompt qui indique à l'IA son rôle et le format de la réponse. Le *prompt engineering* est une compétence clé pour obtenir des résultats optimaux.

**Étape 3 : Création de la Chain**

```python
llm_chain = LLMChain(prompt=prompt, llm=llm)
```

On crée une chain LangChain qui combine le prompt et le modèle de langage. Cette chain prendra une question en entrée et retournera une réponse générée par l'IA.

**Étape 4 : Exécution de la Chain**

```python
question = "Quelle est la recette de la ratatouille ?"

print(llm_chain.run(question))
```

On pose une question à la chain et on affiche la réponse. C'est aussi simple que ça !

### Aller Plus Loin : Agents et Outils

LangChain permet de créer des agents IA qui peuvent utiliser des outils externes. Par exemple, un agent pourrait utiliser un moteur de recherche pour répondre à des questions complexes ou une calculatrice pour résoudre des problèmes mathématiques.

L'exploration des agents et des outils dépasse le cadre de cet article, mais je vous encourage vivement à creuser le sujet.

### Conclusion

LangChain et Ollama forment une combinaison gagnante pour l'orchestration d'IA locale. Ils vous permettent de créer des workflows d'agents IA performants, respectueux de la vie privée et totalement sous votre contrôle.

Alors, prêt à vous lancer dans l'aventure de l'IA locale orchestrée ? Le Vibe Coding est avec vous !
