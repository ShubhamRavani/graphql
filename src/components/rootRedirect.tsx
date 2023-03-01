import { useRouter } from "next/router";
import React, { useEffect } from "react";

const RootRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return null;
};

export default RootRedirect;
