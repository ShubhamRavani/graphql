import { detailedrepoProps } from "@/types/types";
import { deleteRepo } from "@/helper/deleteRepo";
import { updateRepo } from "@/helper/updateRepo";
import React, { FormEvent, useRef } from "react";
import { useSession } from "next-auth/react";

const DetailsRepo = ({ props }: detailedrepoProps) => {
  const { data: session } = useSession();
  //@ts-ignore
  const token = session?.accessToken;
  const username = props.owner.login;
  const ID = props.id;

  const newNameRef = useRef(null);
  const newDescRef = useRef(null);

  function deleteHandler() {
    deleteRepo(username, props.name, token)
      .then(() => {
        console.log("Repository deleted successfully!");
      })
      .catch((error) => {
        console.error("Failed to delete repository:", error);
      });
  }

  function updateHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const newName = form.Name.value;
    const newDescription = form.description.value;

    updateRepo(newName, newDescription, ID, token)
      .then(() => {
        console.log("Repository updated successfully!");
      })
      .catch((error) => {
        console.error("Failed to update repository:", error);
      });
  }

  return (
    <div>
      <h1>{props.name}</h1>
      <p>{ID}</p>
      <p>{props.owner.login}</p>
      <p>{props.description}</p>
      <p>{props.createdAt}</p>
      <p>{props.updatedAt}</p>
      <p>{props.pushedAt}</p>
      <p>{props.isPrivate ? "Private" : "Public"}</p>
      <p>{props.url}</p>
      <p>{props.primaryLanguage?.name}</p>
      <p>{props.stargazers.totalCount}</p>
      <p>{props.watchers.totalCount}</p>
      <p>{props.forks.totalCount}</p>
      <p>{props.licenseInfo?.name}</p>
      <p>{props.licenseInfo?.nickname}</p>

      <form
        className="ml-5 mt-10"
        onSubmit={(event) => {
          updateHandler(event);
        }}
      >
        <label htmlFor="name">Name:</label>
        <textarea id="name" name="Name" ref={newNameRef} required />
        <br />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          ref={newDescRef}
          required
        ></textarea>
        <br />

        <button type="submit">Update Repo</button>
      </form>

      <br />
      <br />
      <br />
      <button onClick={deleteHandler}>delete</button>
    </div>
  );
};

export default DetailsRepo;
