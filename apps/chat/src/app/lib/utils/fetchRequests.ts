import { config } from "../../config";

export const fetchChatQuery = async ({ queryKey }: { queryKey: string[] }) => {
  const [type] = queryKey;
  let res = await fetch(`${config.CLIENT_AUTH_HOST}/${type}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (res.status != 200) {
    throw new Error(res.statusText);
  }
  let data = await res.json();
  return data;
};

export const fetchAuthQuery = async ({ queryKey }: { queryKey: string[] }) => {
  const [, email, password, type] = queryKey;
  let res = await fetch(`${config.CLIENT_AUTH_HOST}/auth/${type}`, {
    method: "POST",
    body: JSON.stringify({
      username: email,
      password,
    }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status != 200) {
    throw new Error(res.statusText);
  }
  let data = await res.json();
  return data;
};

export const getMsgQuery = async (queryKey: string[]) => {
  const [type, receiver, sender] = queryKey;
  let res = await fetch(
    `${config.CLIENT_CHAT_API_HOST}/${type}?receiver=${receiver}&sender=${sender}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (res.status != 200) {
    throw new Error(res.statusText);
  }
  let data = await res.json();
  return data;
};


export const logOutUser = async (queryKey: string[]) => {
  const [type] = queryKey;
  let res = await fetch(
    `${config.CLIENT_AUTH_HOST}/auth/${type}`,
    {
      method: "POST",
    },
  );
  if (res.status != 200) {
    throw new Error(res.statusText);
  }
  let data = await res.json();
  return data;
};
