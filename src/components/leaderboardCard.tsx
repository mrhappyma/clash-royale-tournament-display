import { z } from "zod";
import type { tournamentMemberSchema } from "../utils/royale-api-types";
import Image from "next/image";

const LeaderboardCard: React.FC<z.infer<typeof tournamentMemberSchema>> = (
  props
) => {
  return (
    <div>
      <div
        className={`rounded-t-md ${
          props.rank <= 3 ? "bg-yellow-600" : "bg-slate-600"
        }`}
      >
        <div className="text-center text-2xl font-bold">{props.rank}</div>
      </div>
      <div className="grid grid-cols-3 rounded-b-md bg-blue-600 p-2">
        <div className="col-span-2">
          <div className="text-large font-bold text-white">{props.name}</div>
          <div className="text-base text-white">{props.clan?.name}</div>
        </div>
        <div className="flex flex-row items-center justify-end text-right text-2xl text-white">
          {props.score}
          <Image
            src="/tournament.png"
            width={30}
            height={30}
            alt="tournament icon"
            className="inline"
          />
        </div>
      </div>
    </div>
  );
};
export default LeaderboardCard;
