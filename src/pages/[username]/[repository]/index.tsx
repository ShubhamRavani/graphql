import React from "react";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { repoInfo } from "@/helper/repoInfo";
import DetailsRepo from "@/components/DetailsRepo";
import { RepoData } from "@/types/types";

const Index = ({ RepoDetails }: RepoData) => {
  return (
    <>
      <div className="ml-5">
        <DetailsRepo props={RepoDetails} />
      </div>
    </>
  );
};

export default Index;

export async function getServerSideProps(
  context: GetServerSidePropsContext | undefined
) {
  const session = await getSession(context);
  //@ts-ignore
  const token = session?.accessToken;
  const repo = context?.params?.repository ?? "";
  const username = context?.params?.username ?? "";
  const response = await repoInfo(username as string, token, repo as string);
  const RepoDetails = response.data.repository;

  return {
    props: { RepoDetails },
  };
}
