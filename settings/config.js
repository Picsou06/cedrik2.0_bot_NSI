import { Colors } from "discord.js";

const settings = {
  TOKEN: process.env.TOKEN || "YOUR_BOT_TOKEN",
  PREFIX: process.env.PREFIX || "YOUR_BOT_PREFIX",
  Owners: ["556157481601073153", "444454073639370755", "YOUR_ID"],
  Slash: {
    Global: true,
    GuildID: process.env.GuildID || "YOUR_GUILD_ID",
  },
  embed: {
    color: Colors.Blurple,
    wrongColor: Colors.Red,
  },
  emoji: {
    success: "✅",
    error: "❌",
  },
};

export default settings;
