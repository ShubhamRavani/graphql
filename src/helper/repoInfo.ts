export async function repoInfo(
  username: string,
  accessToken: string,
  repo: string
) {
  const query = `
  query {
    repository(owner: "${username}", name: "${repo}") {
      id
      name
      description
      createdAt
      updatedAt
      pushedAt
      isPrivate
      url
      primaryLanguage {
        name
      }
      stargazers {
        totalCount
      }
      watchers {
        totalCount
      }
      forks {
        totalCount
      }
      licenseInfo {
        name
        nickname
      }
      owner {
        login
      }
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

  return result;
}
