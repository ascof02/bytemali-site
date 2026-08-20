# ByteMali — site vitrine matériel informatique

Site statique (aucun serveur à gérer) avec un panneau d'administration
simple pour ajouter/modifier vos produits sans toucher au code.

## Contenu

```
site-vente-materiel/
├── index.html          # La page du site (catalogue + contact)
├── style.css
├── script.js
├── data/
│   └── products.json   # Vos produits — modifiable via /admin, ou à la main
├── images/uploads/     # Les photos ajoutées depuis le panneau admin arrivent ici
├── admin/
│   ├── index.html       # Panneau d'administration (ne pas modifier)
│   └── config.yml       # Réglages du panneau admin
└── README.md
```

## 1. Voir le site sur votre ordinateur avant de le mettre en ligne

N'ouvrez pas `index.html` en double-clic (le catalogue ne se chargera pas).
Ouvrez un terminal dans ce dossier et lancez :
```bash
python -m http.server 5500
```
puis ouvrez `http://localhost:5500` dans votre navigateur.

## 2. Mettre le site en ligne gratuitement (Netlify)

**a. Créer un compte GitHub** (si vous n'en avez pas) sur github.com, créer un
nouveau dépôt (repository), et y déposer tous les fichiers de ce dossier.

**b. Créer un compte Netlify** sur netlify.com (gratuit, connexion possible
directement avec votre compte GitHub).

**c. Importer le site** : dans Netlify, « Add new site » → « Import an
existing project » → choisissez votre dépôt GitHub. Aucun réglage de build
n'est nécessaire (site déjà statique) — laissez les champs par défaut et
cliquez sur « Deploy ». Votre site est en ligne en quelques secondes, à une
adresse type `https://nom-au-hasard.netlify.app`.

## 3. Activer le panneau d'administration

Le panneau `/admin` a besoin que Netlify gère la connexion et l'écriture
dans votre dépôt GitHub. Deux réglages, une seule fois :

1. Dans votre site sur Netlify → **Site configuration → Identity** → cliquez
   « Enable Identity ».
2. Toujours dans Identity → **Registration** → mettez-le sur « Invite only »
   (pour que seul vous puissiez créer un compte admin).
3. Dans **Identity → Services → Git Gateway** → cliquez « Enable Git
   Gateway » (c'est ce qui permet au panneau admin d'enregistrer vos
   modifications dans GitHub à votre place).
4. Toujours dans Identity, invitez-vous vous-même par e-mail (« Invite
   users ») ; vous recevrez un lien pour créer votre mot de passe.

## 4. Utiliser le panneau admin

Allez sur `https://votre-site.netlify.app/admin`, connectez-vous avec le
compte créé à l'étape précédente. Vous pouvez :
- Ajouter un produit (« Produits » → « Produits » → « Add » dans la liste)
- Modifier le nom, la catégorie, le prix, la disponibilité, la description
- Ajouter une photo (elle est stockée dans `images/uploads/`)
- Publier — le site se met à jour automatiquement en une minute environ

## 5. Personnaliser

- **Nom du site** : remplacez « ByteMali » dans `index.html` (balise
  `<title>` et `.logo`) et dans `admin/index.html`.
- **Coordonnées** : modifiez la liste dans la section Contact de
  `index.html` (adresse, téléphone, e-mail, horaires).
- **Couleurs** : tout est centralisé en haut de `style.css` (`:root`) —
  changez `--amber` pour une autre couleur d'accent si besoin.

## Prochaine étape (vente en ligne)

Pour l'instant, un client vous contacte par le formulaire ou par téléphone
pour commander — c'est volontairement simple. Quand vous serez prêt à
passer à la vente en ligne, deux options simples s'ajoutent sans tout
reconstruire :
- un lien de paiement par produit (ex. Wave, Orange Money, ou un lien
  Stripe/PayPal) ajouté directement dans la fiche produit ;
- un vrai panier + paiement intégré, qui demandera un peu plus de
  développement.

Dites-moi quand vous voulez passer à cette étape.
