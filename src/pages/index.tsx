import type { GetServerSidePropsContext, NextPage, PreviewData } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import BattleCard from "~/components/battleCard";
import LeaderboardCard from "~/components/leaderboardCard";
import TournamentHeader from "~/components/tournamentHeader";
import { type RouterOutputs, api } from "~/utils/api";

const Home: NextPage = () => {
  const router = useRouter();
  const code = router.query.c as string;

  api.tournament.data.useQuery(
    { tag: code },
    {
      onSuccess: (data) => {
        setData(data);
      },
      refetchInterval: 10000,
    }
  );
  const [data, setData] = useState<RouterOutputs["tournament"]["data"]>();
  return (
    <>
      <Head>
        <title>Clash Royale Tournament Display</title>
        <link rel="icon" href="/tournament.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-clash-pattern bg-cover bg-fixed transition-all">
        {data ? (
          typeof data == "string" ? (
            data
          ) : (
            <div>
              {/*actual content goes here*/}
              <div className="flex w-full flex-row justify-center p-2 lg:px-36">
                <TournamentHeader {...data.tournamentInfo} />
              </div>
              <div className="flex w-screen flex-row justify-around space-x-3 scroll-auto p-2">
                <div className="shrink space-y-2">
                  {data.tournamentInfo.membersList.map((member) => {
                    return <LeaderboardCard {...member} key={member.tag} />;
                  })}
                </div>
                <div className="space-y-2">
                  {data.battles.map((battle, index) => {
                    return <BattleCard {...battle} key={index} />;
                  })}
                </div>
              </div>
            </div>
          )
        ) : (
          "fetching data... this may take a while for larger tournaments"
        )}
      </main>
    </>
  );
};
export default Home;

export const getServerSideProps = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const code = context.query.c as string | undefined;
  if (!code)
    return {
      redirect: {
        destination: "/i",
        permanent: false,
      },
    };

  return {
    props: {},
  };
};
