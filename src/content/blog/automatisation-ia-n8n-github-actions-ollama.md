---
title: "Automatisation IA : n8n, GitHub Actions et Ollama"
description: "Créez une automatisation complète avec n8n, GitHub Actions et Ollama pour générer du contenu IA et le déployer automatiquement. Vibe Coding à l'honneur !"
date: 2026-02-09
tags: ["n8n", "GitHub Actions", "Ollama", "Automatisation", "IA G\u00e9n\u00e9rative"]
category: "Interconnection"
image: "/images/blog/automatisation-ia-n8n-github-actions-ollama.webp"
---

## Automatisation IA : n8n, GitHub Actions et Ollama

Dans cet article, nous allons explorer comment combiner n8n, GitHub Actions et Ollama pour créer une automatisation puissante. L'objectif est de générer du contenu avec une IA locale (Ollama), puis de déployer ce contenu automatiquement sur un site web (statique par exemple), le tout orchestré par n8n et GitHub Actions.

### Prérequis

*   Un serveur avec Docker installé (pour n8n et Ollama).
*   Un compte GitHub.
*   Une instance n8n opérationnelle (Docker est le plus simple).
*   Ollama installé et configuré avec un modèle (par exemple, `llama2`).
*   Un dépôt GitHub pour votre site web (Astro, Next.js, etc.).

### Étape 1 : Configuration d'Ollama

Ollama permet d'exécuter des modèles de langage localement. Assurez-vous qu'il est installé et qu'un modèle est téléchargé. Exécutez simplement `ollama run llama2` dans votre terminal pour tester.

**Vibe Coding :** L'installation d'Ollama est triviale. Concentrez-vous sur le *prompting* du modèle une fois qu'il est opérationnel. Pas besoin de comprendre le C++ sous-jacent !

### Étape 2 : Création du Workflow n8n

Notre workflow n8n va se charger de générer le contenu IA. Voici les étapes :

1.  **HTTP Request (Déclencheur) :** Déclenche le workflow via une requête HTTP (par exemple, depuis GitHub Actions). Vous pouvez définir un webhook.
2.  **Function Item :** Crée un prompt pour Ollama. Adaptez le prompt selon vos besoins. Exemple :

    ```javascript
    // Exemple de code JavaScript dans le nœud Function Item
    const prompt = `Écris un court article de blog sur l'automatisation de l'IA. Style : vulgarisation technique. Longueur : 500 mots.`;
    return [{ json: { prompt: prompt } }];
    ```
3.  **HTTP Request (Ollama) :** Envoie le prompt à Ollama. Configurez l'URL vers l'API Ollama (par défaut: `http://localhost:11434/api/generate`). Utilisez la méthode POST et envoyez le prompt au format JSON.

    **Vibe Coding :** Pas besoin de se soucier des détails de l'API Ollama. On se concentre sur le *prompt* envoyé et la *réponse* reçue.

    ```json
    {
      "prompt": "{{ $json.prompt }}",
      "model": "llama2"
    }
    ```

4.  **Function Item :** Extrait le contenu généré de la réponse d'Ollama.

    ```javascript
    // Exemple de code JavaScript dans le nœud Function Item
    const response = $input.first().json.data.response;
    return [{ json: { content: response } }];
    ```

5. **Function Item :** Ajoute des métadonnées (title, slug, category, etc.) au contenu généré.  Ces métadonnées seront utilisées pour la création du fichier Markdown.

    ```javascript
    const title = "Article IA généré par n8n";
    const slug = "article-ia-genere-par-n8n";
    const category = "Vibe Coding";
    const tags = ["n8n", "Ollama", "IA"];
    const content = $input.first().json.content;

    const markdownContent = `---\ntitle: "${title}"
slug: "${slug}"
category: "${category}"
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
---\n${content}`

    return [{ json: { markdown: markdownContent } }];
    ```


6.  **HTTP Request (GitHub) :** Envoie le contenu généré vers GitHub. Utilisez l'API GitHub pour créer ou mettre à jour un fichier dans votre dépôt.  N'oubliez pas de configurer un token d'accès personnel (PAT) avec les permissions nécessaires.

    **Vibe Coding :** L'API GitHub est complexe, mais on utilise un nœud HTTP Request. On se concentre sur *l'authentification* et le *format* de la requête.

    *   Méthode : PUT
    *   URL : `https://api.github.com/repos/<votre_nom_utilisateur>/<votre_repo>/contents/<chemin_du_fichier>.md`
    *   Headers : `Authorization: Bearer <votre_token>`, `Content-Type: application/json`
    *   Body :

        ```json
        {
          "message": "Ajout d'un nouvel article généré par l'IA",
          "content": "{{ $json.markdown | btoa }}",
          "branch": "main"
        }
        ```

        (Note : `btoa` encode le contenu en Base64)

### Étape 3 : Configuration de GitHub Actions

Créez un workflow GitHub Actions qui se déclenche lors d'un événement spécifique (par exemple, une *push* sur la branche `main`). Ce workflow va simplement déclencher le workflow n8n.

```yaml
# .github/workflows/deploy.yml
name: Déclenchement n8n

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Envoyer une requête à n8n
        run: |
          curl -X POST \
            -H "Content-Type: application/json" \
            -d '{}' \
            <votre_url_n8n>
```

**Vibe Coding :** Pas besoin de comprendre le YAML en détail. On utilise GitHub Actions comme un *scheduler* qui appelle un endpoint.

### Étape 4 : Tests et Déploiement

1.  Poussez un changement sur votre branche `main`.
2.  Vérifiez que le workflow GitHub Actions se déclenche.
3.  Vérifiez que le workflow n8n s'exécute correctement.
4.  Vérifiez que le fichier est créé ou mis à jour dans votre dépôt GitHub.
5.  Déployez votre site web (si nécessaire).  Astro, Next.js et d'autres frameworks JAMstack gèrent souvent le déploiement automatiquement lors d'un *push* sur la branche principale.

### Conclusion

Cet article démontre une approche simple pour automatiser la génération et le déploiement de contenu avec n8n, GitHub Actions et Ollama. Vous pouvez adapter ce workflow à vos besoins spécifiques, en modifiant le prompt, en utilisant d'autres modèles Ollama, ou en intégrant d'autres services.

L'automatisation est un pilier du Vibe Coding. Concentrez-vous sur *l'orchestration* des outils, pas sur la complexité du code individuel.
