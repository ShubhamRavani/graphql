import React from "react";
import { repoProps } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/router";

const Repository = ({ repo }: repoProps) => {
  const router = useRouter();
  const visibility = repo.isPrivate ? "PRIVATE" : "PUBLIC";
  const handleButtonClick = () => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    const pathWithoutSearch = pathWithoutQuery.replace(/\/search$/, "");
    const newPath = `${pathWithoutSearch}/${repo.name}`;

    if (router.asPath !== pathWithoutQuery) {
      router.push(newPath);
    } else {
      router.push(newPath);
    }
  };

  return (
    <>
      <br />
      <br />
      <>
        <span style={{ fontWeight: "bold" }}>{repo.name}</span>
        <span style={{ marginLeft: "10px" }}>
          <button onClick={handleButtonClick}>Go to Repo</button>
        </span>
      </>
      <>
        <span>{repo.createdAt}</span>
        <span style={{ marginLeft: "10px" }}>{repo.updatedAt}</span>
      </>
      <b style={{ marginLeft: "10px" }}>{visibility}</b>
      <p>{repo.description}</p>
      <Link href={repo.url} target="_blank">
        Visit
      </Link>
      <br />
    </>
  );
};

export default Repository;
