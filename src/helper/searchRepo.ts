export async function searchRepo(
  username: string,
  searchString: string,
  accessToken: string
) {
  const query = `
    query {
      search(query: "user:${username} ${searchString} in:name", type: REPOSITORY, first: 6) {
        repositoryCount
        edges {
          node {
            ... on Repository {
              name
              url
              description
              createdAt
              updatedAt
              isPrivate
            }
          }
        }
      }
    }
`;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  return data;
}
