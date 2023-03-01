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
    <div className="ml-5 mt-10 bg-gradient-to-br">
      <h3 className="text-4xl font-bold text-center text-white">
        Create a new repository
      </h3>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        className="mt-12"
      >
        <label htmlFor="name" className="ml-4 mt-2 text-lg text-white">
          Name:
        </label>
        <textarea
          id="name"
          name="Name"
          className="border border-gray-300 rounded-md ml-4 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ref={nameRef}
          required
        />
        <br />

        <label htmlFor="description" className="ml-4 mt-2 text-lg text-white">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          className="border border-gray-300 rounded-md ml-4 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ref={descRef}
          required
        ></textarea>
        <br />

        <label className="ml-4 mt-4 text-lg text-white">Visibility:</label>
        <div className="ml-12 mt-1">
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
        <div className="ml-12 mt-1">
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

        <button
          type="submit"
          className="mt-5 ml-5 justify-center bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
        >
          Create repository
        </button>
      </form>
    </div>
  );
};

export default Index;
