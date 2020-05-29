# Projet UF : Développement Logiciel

_B2A Ynov Informatique - Alex Boisseau & Thomas Le Naour_

Création d'un CRM visant à faciliter la gestion et l'analyse globale pour les freelances.

**Fonctionnalités principales :** Gestion d'un portefeuille client, gestion des factures, gestion du CA (graphiques, analyses), gestion des paramètres utilisateurs

## Stack technique

**Choix du langage :** JavaScript  
**Choix des technologies :** React.js, Electron.js, Node.js, Express.js, MongoDB

## Installation

**Prérequis :** Avoir Node.js sur sa machine avec NPM

- Cloner le repository

```
git clone https://github.com/tlnkorr/b2-uf-logiciel
cd b2-uf-logiciel
```

- Installation de `foreman` sur le système afin de pouvoir lancer l'application

```
npm install foreman -g
```

- Ouvrir 2 terminaux (ci-après `T1` et `T2`) et se rendre respectivement dans les dossiers `app/frontend` et `app/backend` afin d'installer les dépendances

```
# T1
cd app/frontend
npm install

# T2
cd app/backend
npm install
```

- Lancement de l'application

```
# T1 app/frontend
npm start

# T2 app/backend
npm start
```

## Utilisation
