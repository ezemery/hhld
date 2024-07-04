import { getCookie } from "cookies-next";
import { useData } from "../layout";
import { ReactElement, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchChatQuery } from "../lib/utils/fetchRequests";

const Auth = (Component: React.FunctionComponent) => {
  return function isAuth() {
    const { user, setUser } = useData();
    const router = useRouter();
    const { data, refetch } = useQuery({
      queryKey: ["user"],
      queryFn: fetchChatQuery,
      enabled: false,
    });
    console.log("data in auth", user, data, getCookie("jwt"));

    useLayoutEffect(() => {
      if (!user) {
        console.log("data in cookie", getCookie("jwt"));
        if (!getCookie("jwt")) {
          router.push("/");
        } else {
          setUser(refetch());
        }
      }
    }, []);

    return <Component />;
  };
};

export default Auth;
