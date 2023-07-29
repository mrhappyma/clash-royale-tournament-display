import { DateTime } from "luxon";
import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { battleSchema, tournamentSchema } from "~/utils/royale-api-types";
const headers = {
  Authorization: `Bearer ${env.API_KEY}`,
};

export const tournamentRouter = createTRPCRouter({
  data: publicProcedure
    .input(z.object({ tag: z.string() }))
    .query(async ({ input }) => {
      const tournamentInfoRequest = await fetch(
        `https://api.clashroyale.com/v1/tournaments/%23${input.tag}`,
        { headers }
      );
      if (tournamentInfoRequest.status != 200)
        return "error fetching tournament info";
      const tournamentInfoJson = await tournamentInfoRequest.json();
      const tournamentInfo = tournamentSchema.parse(tournamentInfoJson);

      let battles: z.infer<typeof battleSchema>[] = [];
      for (let member of tournamentInfo.membersList) {
        const battleLogRequest = await fetch(
          `https://api.clashroyale.com/v1/players/%23${
            member.tag.split("#")[1]
          }/battlelog`,
          { headers }
        );
        if (battleLogRequest.status != 200) continue;
        const battleLogJson = await battleLogRequest.json();
        const battleLog: z.infer<typeof battleSchema>[] = battleLogJson.map(
          (battle: any) => battleSchema.parse(battle)
        );
        battleLog.forEach((battle) => {
          if (
            battle.type == "tournament" &&
            battle.tournamentTag == tournamentInfo.tag
          )
            battles.push(battle);
        });
      }
      //TODO: find a way to do this more reliably
      battles = battles.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.battleTime === value.battleTime)
      );
      //sort battles in order (most recent first)
      battles.sort((a, b) => {
        const aTime = DateTime.fromISO(a.battleTime).toJSDate();
        const bTime = DateTime.fromISO(b.battleTime).toJSDate();
        if (aTime > bTime) return -1;
        if (aTime < bTime) return 1;
        return 0;
      });
      return {
        tournamentInfo,
        battles,
      };
    }),
});
