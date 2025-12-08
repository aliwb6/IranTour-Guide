// src/lib/auth.config.ts
import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/",
    error: "/auth/error",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isProfilePage = nextUrl.pathname.startsWith('/profile')
      const isAuthPage = nextUrl.pathname.startsWith('/auth')

      if (isProfilePage) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      }

      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL('/profile', nextUrl))
      }

      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  providers: [], // Add providers with an empty array for the config
} satisfies NextAuthConfig
