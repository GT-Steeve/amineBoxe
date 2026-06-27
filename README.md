# Amine "BENCHIA" — Site Officiel

Site vitrine d'une page pour le boxeur professionnel Amine "BENCHIA", membre du **Courbevoie Boxing Club**. Design sombre rouge et noir, 100 % vanilla HTML/CSS/JS, sans dépendance externe (hors Google Fonts).

---

## Structure du projet

```
amineBoxe/
├── index.html
├── README.md
├── asset/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── img/
│   │   ├── stand1.png / stand2.png / stand3.png
│   │   └── interview1.png
│   └── gif/
│       ├── gif1.gif / gif2.gif / gif3.gif
```

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Plein écran avec photo de fond, animation Ken Burns, particules flottantes et compteurs de stats animés |
| **À Propos** | Biographie et style de combat |
| **Galerie Photos** | Carousel tactile (4 photos) |
| **Galerie GIFs** | Carousel tactile (3 GIFs de combats) |
| **MainEvent** | Cartes des derniers combats avec date et événement |
| **Contact** | Bouton d'ouverture d'une modale email + liens réseaux sociaux |

---

## Fonctionnalités

- **Navbar fixe** qui se colore au scroll, avec menu burger sur mobile
- **Scroll reveal** : les éléments apparaissent au défilement via `IntersectionObserver`
- **Compteurs animés** (victoires, défaites, KO) déclenchés à l'entrée dans le viewport
- **Carousels** avec navigation par boutons, points de pagination et swipe tactile
- **Modale contact** fermable par Echap, clic sur l'overlay ou bouton ×
- **Lien actif dans la navbar** mis à jour dynamiquement selon la section visible
- **Entièrement responsive** : breakpoints à 900 px et 600 px

---

## Lancer le projet

Ouvrir `index.html` directement dans un navigateur. Aucune installation requise.

Pour éviter les restrictions CORS sur les assets locaux, utiliser un serveur de développement léger :

```bash
# avec Node.js
npx serve .

# avec Python
python -m http.server 8080
```

---

## Stack technique

- **HTML5** sémantique, langue `fr`
- **CSS3** : variables custom, animations `@keyframes`, `clamp()`, Grid & Flexbox
- **JavaScript** vanilla : `IntersectionObserver`, `requestAnimationFrame`, gestion tactile (`touchstart` / `touchend`)
- **Google Fonts** : Bebas Neue (titres) + Inter (corps de texte)

---

## Personnalisation rapide

| Donnée | Emplacement |
|---|---|
| Stats (Victoires / Défaites / KO) | `index.html` — attributs `data-target` des `.stat-number` |
| Biographie | `index.html` — section `#about` |
| Combats | `index.html` — section `#palmares` |
| Email de contact | `index.html` — balise `<a class="modal-email">` |
| Couleur principale | `style.css` — variable `--red` |
| Photos | Remplacer les fichiers dans `asset/img/` |
| GIFs | Remplacer les fichiers dans `asset/gif/` |
