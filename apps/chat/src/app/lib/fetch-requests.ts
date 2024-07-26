import { config } from "../config";
import { getCookie } from "./cookie";
export const fetchChatQuery = async ({ queryKey }: { queryKey: string[] }) => {
  const [type] = queryKey;
  const headers:{[key: string]: any} = {}
    if(getCookie("jwt")){
      headers["Authorization"] = "Bearer "+ getCookie("jwt");
    }
  let res = await fetch(`${config.CLIENT_AUTH_HOST}/${type}`, {
    method: "GET",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  let data = await res.json();
  return data;
};

export const fetchAuthQuery = async (queryKey: string[]) => {
  const [, email, password, type] = queryKey;
   const headers:{[key: string]: any} = {}
    if(getCookie("jwt")){
      headers["Authorization"] = "Bearer "+ getCookie("jwt");
    }
  let res = await fetch(`${config.CLIENT_AUTH_HOST}/auth/${type}`, {
    method: "POST",
    body: JSON.stringify({
      username: email,
      password,
    }),
    credentials: "include",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  let data = await res.json();
  return data;
};

export const getMsgQuery = async (queryKey: string[]) => {
  const [type, receiver, sender] = queryKey;
   const headers:{[key: string]: any} = {}
    if(getCookie("jwt")){
      headers["Authorization"] = "Bearer "+ getCookie("jwt");
    }
  let res = await fetch(
    `${config.CLIENT_CHAT_API_HOST}/${type}?receiver=${receiver}&sender=${sender}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    },
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  let data = await res.json();
  return data;
};

export const logOutUser = async (queryKey: string[]) => {
  const [type] = queryKey;
   const headers:{[key: string]: any} = {}
    if(getCookie("jwt")){
      headers["Authorization"] = "Bearer "+ getCookie("jwt");
    }
  let res = await fetch(`${config.CLIENT_AUTH_HOST}/auth/${type}`, {
    method: "POST",
     headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  let data = await res.json();
  return data;
};
