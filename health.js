// health.js — écrit /tmp/health toutes les 30 s tant que toutes les connexions à la passerelle Discord sont actives.
// Lu par le healthcheck Docker (compose.yml). Ne pas utiliser client.ws.status : il reste à Ready après le premier
// démarrage même si la connexion tombe ; seul l'état des shards suit la connexion réelle.
const fs = require("fs");
const { Status } = require("discord.js");

module.exports = (client, file = "/tmp/health") => {
  setInterval(() => {
    const shards = client.ws.shards;
    if (client.isReady() && shards.size > 0 && shards.every((s) => s.status === Status.Ready)) {
      fs.writeFile(file, String(Date.now()), () => {});
    }
  }, 30_000).unref();
};
