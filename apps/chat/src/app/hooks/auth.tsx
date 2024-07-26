import { getCookie } from "cookies-next";
import { DataContext } from "./context";
import { useContext, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchChatQuery } from "../lib/fetch-requests";

const Auth = (Component: React.FunctionComponent) => {
  return function IsAuth() {
    const { user, setUser } = useContext(DataContext);
    const router = useRouter();
    const { refetch } = useQuery({
      queryKey: ["user"],
      queryFn: fetchChatQuery,
      enabled: false,
    });

    useLayoutEffect(() => {
      if (!user) {
        if (!getCookie("jwt")) {
          router.push("/");
        } else {
          //@ts-expect-error
          setUser(refetch());
        }
      }
    }, [user, refetch, setUser]);

    return <Component />;
  };
};

export default Auth;
