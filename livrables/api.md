# Informations relatives à l'API

**Technologies utilisées :** Node.js, Express.js, MongoDB

# Définition de tous les endpoints de l'API

## /api/users

- **GET** <span style="color: #f56565;">/<span style="color: #4299e1;">:userId</span></span> => Un utilisateur en fonction de l'ID
- **PATCH** <span style="color: #f56565;">/<span style="color: #4299e1;">:userId</span></span> => Modifier un utilisateur
- **DELETE** <span style="color: #f56565;">/<span style="color: #4299e1;">:userId</span></span> => Supprimer un utilisateur
- **POST** <span style="color: #f56565;">/signup</span> => Inscription (créer un utilisateur)
- **POST** <span style="color: #f56565;">/login</span> => Connexion (connecter un utilisateur)

## /api/customers

- **GET** <span style="color: #f56565;">/user/<span style="color: #4299e1;">:userId</span></span> => Tous clients d'un utilisateur
- **GET** <span style="color: #f56565;">/<span style="color: #4299e1;">:customerId</span></span> => Un client en fonction de l'ID
- **PATCH** <span style="color: #f56565;">/<span style="color: #4299e1;">:customerId</span></span> => Modifier un client
- **DELETE** <span style="color: #f56565;">/<span style="color: #4299e1;">:customerId</span></span> => Supprimer un client
- **POST** <span style="color: #f56565;">/</span> => Créer un client

## /api/invoices

- **GET** <span style="color: #f56565;">/user/<span style="color: #4299e1;">:userId</span></span> => Toutes les feactures d'un utilisateur
- **GET** <span style="color: #f56565;">/<span style="color: #4299e1;">:invoiceId</span></span> => Une facture en fonction de l'ID
- **PATCH** <span style="color: #f56565;">/<span style="color: #4299e1;">:invoiceId</span></span> => Modifier une facture
- **DELETE** <span style="color: #f56565;">/<span style="color: #4299e1;">:invoiceId</span></span> => Supprimer une facture
- **POST** <span style="color: #f56565;">/</span> => Créer une facture
