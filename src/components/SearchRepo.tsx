import { useRouter } from "next/router";
import React, { FormEvent, useRef } from "react";

const SearchRepo = () => {
  const router = useRouter();
  const searchTermRef = useRef<HTMLTextAreaElement>(null);
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchTerm = searchTermRef.current?.value;
    const queryParams = {
      q: searchTerm,
      language: "any",
      sortField: "name",
      sortOrder: "asc",
    };
    router.push({
      pathname: `${router.asPath}/search`,
      query: queryParams,
    });
  };

  return (
    <div>
      {" "}
      <form
        onSubmit={(event) => {
          handleSearch(event);
        }}
        style={{ display: "flex", alignItems: "center" }}
      >
        <textarea
          id="name"
          name="search"
          ref={searchTermRef}
          style={{ width: "40%", marginRight: "1rem" }}
        />

        <button
          type="submit"
          style={{ background: "transparent", border: "none" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M15.708 13.292l-3.61-3.61A6.47 6.47 0 0014 6.5 6.5 6.5 0 107.5 13a6.47 6.47 0 004.182-1.528l3.61 3.61a.5.5 0 00.708-.708zM7.5 12A5.5 5.5 0 112 6.5 5.5 5.5 0 017.5 12z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchRepo;
