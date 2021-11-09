import {
  DiscordActivityTypes,
  editBotStatus,
} from "https://deno.land/x/discordeno/mod.ts";

export function ready() {
  console.clear();
  console.log("ka-boom");

  editBotStatus({
    since: null,
    activities: [{
      name: "DenoMark",
      type: DiscordActivityTypes.Watching,
      createdAt: 0,
    }],
    status: "idle",
    afk: false,
  });
}
