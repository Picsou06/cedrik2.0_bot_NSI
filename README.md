# cedrik2.0_bot_NSI

Bot Discord de base (discord.js) utilisé comme point de départ pour un projet NSI, avec un système de commandes slash déjà en place et une connexion MySQL.

## Fonctionnalités actuelles

- Chargement automatique des commandes et événements (`handlers/eventHandler.js`, `utils/getLocalCommands.js`, `utils/getAllFiles.js`)
- Commandes d'administration : `/ban`, `/clear`
- Commandes d'infos : `/ping`, `/stats` (statistiques stockées en base)
- Commandes développeur : `/dev-test`, `/dev-test2`, `/reload`
- Connexion et setup d'une base MySQL (`utils/setupDb.js`, `utils/TestDbConnection.sh`)

## Stack technique

- Node.js, discord.js v14
- MySQL (`mysql2`)
- `node-schedule` pour les tâches planifiées
- `@akarui/aoi.db`

## Installation

```bash
npm install
cp .env.exemple .env   # TOKEN du bot + accès MySQL
node index.js
```
