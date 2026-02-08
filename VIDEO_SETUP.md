# Guide Configuration Vidéo (Google Veo)

Pour que l'agent Jules puisse générer des vidéos, vous devez activer **Google Vertex AI**.

## Étapes Requises

### 1. Google Cloud Platform (GCP)
1.  Allez sur [Google Cloud Console](https://console.cloud.google.com/).
2.  Créez un nouveau projet (ex: `rayonis-video`).
3.  Associez un compte de facturation (requis pour Vertex AI, même si vous avez des crédits gratuits).

### 2. Activer l'API
1.  Dans la barre de recherche, tapez **"Vertex AI API"**.
2.  Cliquez sur **Activer**.

### 3. Créer un Compte de Service
1.  Allez dans **IAM et administration** > **Comptes de service**.
2.  Cliquez sur **Créer un compte de service**.
3.  Nom : `jules-agent`.
4.  Rôle : **Vertex AI User** (ou `Vertex AI Administrator`).
5.  Validez.

### 4. Télécharger la Clé JSON
1.  Cliquez sur le compte de service créé (l'email).
2.  Allez dans l'onglet **Clés**.
3.  **Ajouter une clé** > **Créer une nouvelle clé** > **JSON**.
4.  Le fichier va se télécharger sur votre ordinateur.

### 5. Installation
1.  Renommez ce fichier en `google_credentials.json`.
2.  Placez-le à la racine du projet Rayonis : `c:\Users\ncsra\OneDrive\Documents\My Web Sites\rayonis\google_credentials.json`.
3.  Jules détectera automatiquement ce fichier et activera la génération vidéo !
