import type z from "zod";
import type { battleSchema } from "~/utils/royale-api-types";
import Crowns from "./crowns";

const BattleCard: React.FC<z.infer<typeof battleSchema>> = (props) => {
  const blue = props.team[0]!;
  const red = props.opponent[0]!;

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-row justify-between rounded-l-md bg-blue-600 p-2">
        <div>
          <div className="text-xl font-bold text-white">{blue.name}</div>
          <div className="text-base text-white">{blue.clan?.name}</div>
        </div>
        <div className="ml-1 shrink-0">
          <Crowns n={blue.crowns} type="blue" />
        </div>
      </div>
      <div className="flex flex-row justify-between rounded-r-md bg-red-600 p-2">
        <div className="mr-1 shrink-0">
          <Crowns n={red.crowns} type="red" />
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-white">{red.name}</div>
          <div className="text-base text-white">{red.clan?.name}</div>
        </div>
      </div>
    </div>
  );
};
export default BattleCard;
