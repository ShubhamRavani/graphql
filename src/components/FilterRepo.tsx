import React, { FormEvent, useRef } from "react";
//import { FilterOptions } from '@/Types/types';
import router from "next/router";

export type FilterOptions = {
  language?: string;
  sortField?: string;
  sortOrder?: string;
};

const FilterRepo = () => {
  const languageRef = useRef<HTMLSelectElement>(null);
  const sortFieldRef = useRef<HTMLSelectElement>(null);
  const sortOrderRef = useRef<HTMLSelectElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const queryParams = {
      language: languageRef.current?.value?.toString() ?? null,
      sortField: sortFieldRef.current?.value?.toString() ?? null,
      sortOrder: sortOrderRef.current?.value?.toString() ?? null,
    };

    router.push({
      query: {
        ...router.query,
        ...queryParams,
      },
    });
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <label>
          Language:
          <select name="language" ref={languageRef}>
            <option value="any">Any</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </label>
        <label>
          Sort by:
          <select name="sortField" ref={sortFieldRef}>
            <option value="none">None</option>
            <option value="name">Name</option>
            <option value="created_at">Date created</option>
            <option value="updated_at">Date updated</option>
          </select>
          <select name="sortOrder" ref={sortOrderRef}>
            <option value="none">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default FilterRepo;
