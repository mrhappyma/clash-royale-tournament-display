import z from "zod";

export const playerClanSchema = z.object({
  tag: z.string(),
  name: z.string(),
  badgeId: z.number(),
});
export const tournamentMemberSchema = z.object({
  tag: z.string(),
  name: z.string(),
  score: z.number(),
  rank: z.number(),
  clan: playerClanSchema.optional(),
});
export const tournamentSchema = z.object({
  tag: z.string(),
  type: z.string(),
  status: z.string(),
  creatorTag: z.string(),
  name: z.string(),
  description: z.string().optional(),
  levelCap: z.number(),
  firstPlaceCardPrize: z.number(),
  capacity: z.number(),
  maxCapacity: z.number(),
  preparationDuration: z.number(),
  duration: z.number(),
  createdTime: z.string(),
  startedTime: z.string(),
  membersList: z.array(tournamentMemberSchema),
  gameMode: z.object({
    id: z.number(),
  }),
});
export const arenaSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
});
export const gameModeSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
});
export const playerItemLevel = z.object({
  name: z.string().nullable(),
  id: z.number(),
  level: z.number(),
  starLevel: z.number().optional(),
  maxLevel: z.number(),
  maxEvolutionLevel: z.number().optional(),
  iconUrls: z
    .object({
      medium: z.string().optional(),
      evolutionMedium: z.string().optional(),
    })
    .optional(),
});
export const playerBattleDataSchema = z.object({
  tag: z.string(),
  name: z.string(),
  startingTrophies: z.number().optional(),
  trophyChange: z.number().optional(),
  crowns: z.number(),
  kingTowerHitPoints: z.number().optional(),
  princessTowersHitPoints: z.array(z.number()).nullable(),
  clan: playerClanSchema.optional(),
  cards: z.array(playerItemLevel),
  globalRank: z.number().nullable(),
  elixirLeaked: z.number().optional(),
});
export const battleSchema = z.object({
  type: z.string(),
  battleTime: z.string(),
  tournamentTag: z.string().optional(),
  isLadderTournament: z.boolean().optional(),
  arena: arenaSchema,
  gameMode: gameModeSchema,
  deckSelection: z.string(),
  team: z.array(playerBattleDataSchema),
  opponent: z.array(playerBattleDataSchema),
  isHostedMatch: z.boolean().optional(),
  leagueNumber: z.number().optional(),
});
