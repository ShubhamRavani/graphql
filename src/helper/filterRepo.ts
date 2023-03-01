export async function filteringRepos(
  username: string,
  searchString: string,
  accessToken: string,
  language: string,
  sortField: string,
  sortOrder: string
) {
  const query = `
    query {
      search(query: "user:${username} ${searchString} in:name language:${language} sort:${sortField}-${sortOrder}", type: REPOSITORY, first: 6) {
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

  try {
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
  } catch (error) {
    console.log(error);
    throw error;
  }
}
