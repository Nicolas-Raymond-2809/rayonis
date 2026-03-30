# Design System - Rayonis

Ce document détaille l'identité visuelle et les principes de design du site Rayonis, basés sur une esthétique **Néo-Brutaliste**.

## 🎨 Palette de Couleurs (OKLCH)

Le système utilise des couleurs vives et contrastées avec des bordures noires épaisses.

| Élément | Couleur (Light) | Couleur (Dark) | Description |
| :--- | :--- | :--- | :--- |
| **Background** | `oklch(95.08% 0.0481 184.07)` | `oklch(22.65% 0.0236 198.49)` | Fond principal (Menthe claire / Anthracite) |
| **Secondary** | `oklch(100% 0 0)` | `oklch(23.93% 0 0)` | Fond des cartes et éléments de surface |
| **Main (Accent)** | `oklch(78.57% 0.1422 180.36)` | `oklch(71.47% 0.1292 180.47)` | Couleur d'accentuation (Menthe vive) |
| **Foreground** | `oklch(0% 0 0)` | `oklch(92.49% 0 0)` | Texte principal |
| **Border** | `oklch(0% 0 0)` | `oklch(0% 0 0)` | Bordures et ombres portées |

## 📐 Principes Fondamentaux (Néo-Brutalisme)

1. **Bordures Épaisses** : Toutes les cartes, boutons et conteneurs utilisent une bordure de `2px` noire (`var(--border)`).
2. **Ombres Portées (Hard Shadows)** : Pas de flou. Les ombres sont des blocs solides décalés de `4px 4px`.
   - CSS : `box-shadow: 4px 4px 0px 0px var(--border);`
3. **Angles Droits** : Utilisation minimale de rayons de courbure (`rounded-none` ou `radius-base: 5px`).
4. **Interactivité** : Les éléments interactifs se déplacent au survol pour simuler une pression.
   - Hover : `translate-x-[2px] translate-y-[2px]` avec une réduction de l'ombre.

## 🔡 Typographie

- **Police de base** : `Inter` (Sans-serif) - Poids `500`.
- **Police de titre** : `Inter` (Sans-serif) - Poids `700` (Heading).
- **Police technique** : `JetBrains Mono` (Monospace) - Pour les données et accents techniques.

| Style | Taille | Poids | Cas |
| :--- | :--- | :--- | :--- |
| **H1 (Hero)** | `text-8xl` | 700 | Titre principal, interligne serré (`leading-[0.9]`) |
| **H2 (Section)** | `text-5xl` | 700 | Titres de sections, majuscules |
| **H3 (Card)** | `text-xl` | 700 | Titres de cartes, majuscules |
| **Body** | `text-base` | 500 | Texte courant |
| **Small/Meta** | `text-xs` | 700 | Labels, tags, majuscules |

## 🧱 Composants

### Boutons (Buttons)
- **Style** : Fond `var(--main)` ou `var(--secondary-background)`, bordure noire `2px`, ombre noire `4px`.
- **Hover** : Translation de `2px` vers le bas/droite, l'ombre diminue à `2px`.

### Cartes (Cards)
- **ExpertiseCard** : Fond blanc, icône dans un carré `var(--main)`, texte aligné à gauche.
- **AcademyCard** : Inclut une zone d'image avec un dégradé subtil et une liste à puces avec des icônes de validation épaisses.

### Glossaire (Glossary)
- **Terme** : Soulignement en pointillés (`dashed`) de couleur `var(--main)`.
- **Tooltip** : Style néo-brutaliste (fond blanc, bordure noire, ombre portée).

## 🛠 Utilitaires Tailwind Spécifiques

- `shadow-shadow` : Applique l'ombre portée standard de 4px.
- `font-heading` : Applique la graisse de titre (700).
- `font-base` : Applique la graisse de corps (500).
- `bg-main` : Utilise la couleur d'accentuation menthe.

---
*Dernière mise à jour : 13 Mars 2026*
