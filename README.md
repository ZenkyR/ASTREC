# ASTREC

pour lancer le projet, il faut lancer deux serveur en même temps, un pour le front et un pour le back

## Front
se placer dans le dossier front et lancer la commande `npm start`

## Back
se placer dans le dossier back et lancer la commande `symfony server:start`

## Base de données
Pour la base de données, il faut lancer la commande `php bin/console doctrine:database:create` pour créer la base de données, puis `php bin/console doctrine:migrations:migrate` pour créer les tables.

## Utilisation
Pour utiliser l'application, il faut se connecter avec un compte déjà existant ou en créer un nouveau. Ensuite, vous pouvez ajouter des produit, les modifier, les supprimer, les consulter, les rechercher, les commenter et les noter.

## Fonctionnalités
- Ajouter un produit
- Modifier un produit
- Supprimer un produit
- Consulter un produit
- Rechercher un produit
- Commenter un produit
- Noter un produit
- Consulter les commentaires et les notes d'un produit
- Consulter les produits les mieux notés
- Consulter les produits les plus commentés
- Consulter les produits les plus récents
- Consulter les produits les plus anciens
- Consulter les produits par catégorie
- Consulter les produits par prix
- Consulter les produits par nom
- Consulter les produits par marque
- Consulter les produits par date d'ajout
- ajouter un produit au panier
- Consulter le panier
- Supprimer un produit du panier
- Consulter les produits du panier
- Consulter le prix total du panier
- acheter les produits du panier

