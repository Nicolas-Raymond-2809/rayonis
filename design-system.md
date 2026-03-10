# Design System Rayonis

## Couleurs & Thèmes

Le design system supporte les modes clair et sombre (Dark Mode) en utilisant des couleurs définies dans l'espace colorimétrique OKLCH pour une gestion optimale du contraste et de la luminosité.

### Couleurs Principales (Mode Clair)
- **Background** : `oklch(95.08% 0.0481 184.07)`
- **Secondary Background** : `oklch(100% 0 0)`
- **Foreground (Texte)** : `oklch(0% 0 0)`
- **Main (Accent / Primaire)** : `oklch(78.57% 0.1422 180.36)` *(Définie par la variable `--main`)*
- **Main Foreground** : `oklch(0% 0 0)`
- **Border / Ring** : `oklch(0% 0 0)`

### Couleurs Principales (Mode Sombre)
- **Background** : `oklch(22.65% 0.0236 198.49)`
- **Secondary Background** : `oklch(23.93% 0 0)`
- **Foreground (Texte)** : `oklch(92.49% 0 0)`
- **Main (Accent / Primaire)** : `oklch(71.47% 0.129261 180.4742)`
- **Border** : `oklch(0% 0 0)`
- **Ring** : `oklch(100% 0 0)`

### Couleurs Graphiques (Charts)
| Numéro | Mode Clair | Mode Sombre |
|--------|------------|-------------|
| Chart 1| `#00D6BD`  | `#00BDA7`   |
| Chart 2| `#0099FF`  | `#008AE5`   |
| Chart 3| `#7A83FF`  | `#7A83FF`   |
| Chart 4| `#FF4D50`  | `#FF6669`   |
| Chart 5| `#FACC00`  | `#E0B700`   |

### Éléments Structurels
- **Rayon de bordure par défaut (Radius)** : `5px`
- **Ombre (Shadow)** : `4px 4px 0px 0px var(--border)`
- **Typographie Base Weight** : `500`
- **Typographie Heading Weight** : `700`

---

## Composants UI

### Bouton (`Button`)
Les boutons utilisent un style brut, dit "néobrutalisme", avec des bordures définies, un lettrage majuscule, des ombres marquées et un léger décalage interactif au survol.

**Classes communes de base :**
`inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-heading uppercase tracking-wider transition-all duration-300 shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none border-2 border-border cursor-pointer`

**Variantes :**
- `default` : Fond avec la couleur `--main`, texte de couleur principale.
- `secondary` : Fond `--secondary-background`, texte `--foreground`.
- `outline` : Fond transparent, bordure conservée.
- `dark` : Fond sombre (`--foreground`), texte clair (`--background`).
- `ghost` : Sans bordure, sans ombre. Au survol, apparition d'un fond teinté (`hover:bg-main/10`).
- `link` : Style lien (souligné au survol), couleur `--main`.

**Tailles :**
- `default` : Hauteur 12 (48px), padding horizontal 8.
- `sm` : Hauteur 10 (40px), padding horizontal 6, texte plus petit.
- `lg` : Hauteur 16 (64px), padding horizontal 10, texte plus grand.
- `icon` : Bouton carré (40x40px).

### Champs de formulaire (`Input` & `Textarea`)
**Style Global :** Simple, bordure fine 1px, pas d'ombrage fort comme les boutons, avec un contour (`ring`) au focus.
- **Input** : Hauteur fixe `h-10` (40px).
- **Textarea** : Hauteur minimale `min-h-[80px]`.

### Étiquette (`Label`)
**Style Global :** Texte petit (`text-sm`), taille de police moyenne (`font-medium`). La désactivation (disabled) réduit l'opacité à 70%.

### Menu de navigation (`Menubar`)
Composant de menu complexe permettant d'afficher des sous-menus, cases à cocher et raccourcis clavier tout en gardant des angles arrondis fins et des bordures légères.
