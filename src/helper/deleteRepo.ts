export async function deleteRepo(
  username: string,
  repo: string,
  token: string
) {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repo}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    return { success: true };
  } else {
    const errorData = await response.json();
    throw new Error(`Failed to delete repository: ${errorData.message}`);
  }
}
