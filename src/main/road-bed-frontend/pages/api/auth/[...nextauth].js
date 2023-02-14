import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        
        const result = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const user = await result.json();

        if (result.ok && user) return user;
        else return null;
      },
    }),
  ],
  session: {
    strategy: "jwt"
  },
  callbacks:{
    async jwt(token, user) { //, account, profile, isNewUser

      // if (user?.accessToken) {
      //   token.token = user.accessToken;
      // }
      // return token;

      return ({...token, ...user})
    },

    async session(session, token, user) {
      // return session;
      session.user = token;
      return session;
    }
  },
  pages: {
    signIn: "/login"
  }
};

export default NextAuth(authOptions);
