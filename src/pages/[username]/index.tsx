import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FormEvent, useRef } from "react";
import RootRedirect from "@/components/rootRedirect";
import { getGitHubUsername } from "@/helper/getUsername";
import { getRepo } from "@/helper/getRepo";
import { GetServerSidePropsContext } from "next";
import Repository from "@/components/Repository";
import Link from "next/link";
import { repositories } from "@/types/types";
import SearchRepo from "@/components/SearchRepo";

const Index = (repositories: repositories) => {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;
  const name = user?.name;

  if (session) {
    return (
      <>
        <h2 className="mt-4 text-4xl font-bold text-center text-white">
          Welcome {name}
        </h2>
        <button
          className="ml-5 mt-2 bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
          onClick={() => signOut()}
        >
          Sign out
        </button>
        <Link
          href={`${router.asPath}/new`}
          className="ml-4 mt-2 bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
        >
          <button>Create New Repo</button>
        </Link>
        <br />
        <br />
        <SearchRepo />
        {repositories.repositories.map((repo) => {
          return <Repository repo={repo} key={repo.name} />;
        })}
      </>
    );
  }

  return (
    <>
      <RootRedirect />
    </>
  );
};

export default Index;

export async function getServerSideProps(
  context: GetServerSidePropsContext | undefined
) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  //@ts-ignore

  const token = session.accessToken;
  const username = context?.params?.username ?? "";
  const repoResponse = await getRepo(username as string, token);
  const repositories = repoResponse.data.user.repositories.nodes;

  return {
    props: { repositories },
  };
}
