import ProgressBar from "@ramonak/react-progress-bar";
import type { z } from "zod";
import type { tournamentSchema } from "~/utils/royale-api-types";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

const TournamentHeader: React.FC<z.infer<typeof tournamentSchema>> = (
  props
) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="p-22 w-full rounded-md bg-yellow-500">
      <div className="text-center text-2xl font-bold">{props.name}</div>
      <div className="text-center text-xl">{props.description}</div>
      {props.status == "inProgress" && (
        <ProgressBar
          completed={
            (time.getTime() -
              DateTime.fromISO(props.startedTime).toJSDate().getTime()) /
            1000
          }
          maxCompleted={props.duration}
          customLabel={
            //TODO: this is too much
            props.duration -
              (time.getTime() -
                DateTime.fromISO(props.startedTime).toJSDate().getTime()) /
                1000 >
            0
              ? `${Math.floor(
                  (props.duration -
                    (time.getTime() -
                      DateTime.fromISO(props.startedTime)
                        .toJSDate()
                        .getTime()) /
                      1000) /
                    60
                )} minutes ${Math.floor(
                  props.duration -
                    (time.getTime() -
                      DateTime.fromISO(props.startedTime)
                        .toJSDate()
                        .getTime()) /
                      1000 -
                    Math.floor(
                      (props.duration -
                        (new Date().getTime() -
                          DateTime.fromISO(props.startedTime)
                            .toJSDate()
                            .getTime()) /
                          1000) /
                        60
                    ) *
                      60
                )} seconds`
              : "tournament ending soon"
          }
          animateOnRender={true}
          bgColor="#2563eb"
        />
      )}
    </div>
  );
};
export default TournamentHeader;
