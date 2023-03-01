import React, { FormEvent, useRef } from "react";
import { useSession } from "next-auth/react";
import { createRepo } from "@/helper/createRepo";

const Index = () => {
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const visibilityRef = useRef(null);
  const { data: session } = useSession();
  //@ts-ignore
  const token = session?.accessToken;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.Name.value;
    const description = form.description.value;
    const visibility = form.visibility.value;
    createRepo(token, name, description, visibility)
      .then((response) => {
        console.log(response);
      })
      .catch((error: string) => {
        console.error(error);
      });
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <label htmlFor="name">Name:</label>
        <textarea id="name" name="Name" ref={nameRef} required />
        <br />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          ref={descRef}
          required
        ></textarea>
        <br />

        <label>Visibility:</label>
        <div>
          <input
            type="radio"
            id="public"
            name="visibility"
            value="public"
            ref={visibilityRef}
            required
          />
          <label htmlFor="public">Public</label>
        </div>
        <div>
          <input
            type="radio"
            id="private"
            name="visibility"
            value="private"
            ref={visibilityRef}
            required
          />
          <label htmlFor="private">Private</label>
        </div>

        <button type="submit">Create repository</button>
      </form>
    </div>
  );
};

export default Index;
