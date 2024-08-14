import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { config } from "../../../config";
const handler = NextAuth({
   providers: [
        GoogleProvider({
            clientId: config.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: config.GOOGLE_OAUTH_CLIENT_KEY,
             authorization: {
                params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
                }
            }
        }),
        GitHubProvider({
            clientId: config.GITHUB_OAUTH_CLIENT_ID,
            clientSecret: config.GITHUB_OAUTH_CLIENT_KEY
        })
  ]
})

export { handler as GET, handler as POST }