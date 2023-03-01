export async function updateRepo(
  newName: string,
  newDescription: string,
  repositoryId: string,
  accessToken: string
) {
  const query = `mutation {
      updateRepository(input: {
        name: "${newName}",
        description: "${newDescription}",
        repositoryId: "${repositoryId}"
      })
      {
        repository {
          name
          description
        }
      }
    }`;

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
