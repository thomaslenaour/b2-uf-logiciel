# Informations relatives à l'API

**Technologies utilisées :** Node.js, Express.js, MongoDB

# Définition de tous les endpoints de l'API

## /api/users

- 🔐✅ **GET** /:userId => Un utilisateur en fonction de l'ID
- 🔐✅ **PATCH** /:userId => Modifier un utilisateur
- **DELETE** /:userId => Supprimer un utilisateur
- ✅ **POST** /signup => Inscription (créer un utilisateur)
- ✅ **POST** /login => Connexion (connecter un utilisateur)

## /api/customers

- 🔐✅ **GET** / => Tous clients d'un utilisateur
- 🔐✅ **GET** /:customerId => Un client en fonction de l'ID
- 🔐✅ **PATCH** /:customerId => Modifier un client
- 🔐 **DELETE** /:customerId => Supprimer un client
- 🔐✅ **POST** / => Créer un client

## /api/invoices

- 🔐 **GET** /user/:userId => Toutes les feactures d'un utilisateur
- 🔐 **GET** /:invoiceId => Une facture en fonction de l'ID
- 🔐 **PATCH** /:invoiceId => Modifier une facture
- 🔐 **DELETE** /:invoiceId => Supprimer une facture
- 🔐 **POST** / => Créer une facture

# Exemples de requêtes

## Create User

```
{
	"name": "Thomas Le Naour",
	"email": "lenaourthomas@gmail.com",
	"password": "password",
	"passwordConfirmation": "password",
	"contributionPct": 10
}
```

## Update User

```
{
	"name": "Thomas Le Naour",
	"email": "lenaourthomas@gmail.com",
	"contributionPct": 10
}
```

## Login

```
{
	"email": "lenaourthomas@gmail.com",
	"password": "password",
}
```

## Create & Update Customer

```
{
	"name": "Client 1",
	"address": "13 quai des Chartrons",
	"postalCode": "33000",
	"city": "Bordeaux",
	"country": "France",
	"phone": "0687098923"
}
```
