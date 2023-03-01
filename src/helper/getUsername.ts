export async function getGitHubUsername(accessToken: string) {
  const query = `
  query {
    viewer {
      login
    }
  }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  return result.data.viewer.login;
}
