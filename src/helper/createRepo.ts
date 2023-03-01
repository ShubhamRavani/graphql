export async function createRepo(
  accessToken: string,
  name: string,
  description: string,
  visibility: string
) {
  const query = `
      mutation {
        createRepository(
          input: {
            name: "${name}",
            visibility: ${visibility.toUpperCase()},
            description: "${description}"
          }
        ) {
          repository {
            id
            name
            visibility
            description
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
