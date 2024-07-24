"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/global.css";
import "@repo/ui/styles.css";
import { config } from "./config";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { DataContext } from "./hooks/context";
const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [user, setUser] = useState(null);
  useEffect(() => {
    (function (apiKey) {
      (function (p, e, n, d, o) {
        let v: string | any[], w, x, y, z;
        //@ts-expect-error
        o = p[d] = p[d] || {};
        //@ts-expect-error
        o._q = o._q || [];
        v = ["initialize", "identify", "updateOptions", "pageLoad", "track"];
        for (w = 0, x = v.length; w < x; ++w)
          (function (m) {
            //@ts-expect-error
            o[m] =
              //@ts-expect-error
              o[m] ||
              function () {
                //@ts-expect-error
                o._q[m === v[0] ? "unshift" : "push"](
                  [m].concat([].slice.call(arguments, 0))
                );
              };
          })(v[w]);
        y = e.createElement(n);
        //@ts-expect-error
        y.async = !0;
        //@ts-expect-error
        y.src = "https://cdn.eu.pendo.io/agent/static/" + apiKey + "/pendo.js";
        z = e.getElementsByTagName(n)[0];
        //@ts-expect-error
        z.parentNode.insertBefore(y, z);
      })(window, document, "script", "pendo");
    })(config.PENDO_KEY);

    return () => {};
  });
  return (
    <QueryClientProvider client={queryClient}>
      <DataContext.Provider value={{ user, setUser }}>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </DataContext.Provider>
    </QueryClientProvider>
  );
}
