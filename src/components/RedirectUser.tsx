// @ts-nocheck
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getGitHubUsername } from "@/helper/getUsername";

const RedirectUser = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session.accessToken;

  useEffect(() => {
    async function redirect() {
      const userName = await getGitHubUsername(token);

      router.push(`/${userName}`);
    }
    redirect();
  }, []);

  return null;
};

export default RedirectUser;
