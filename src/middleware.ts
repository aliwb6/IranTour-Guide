import NextAuth from "next-auth"
import { authConfig } from "./lib/auth.config"

export default NextAuth(authConfig).auth

export const config = {
  matcher: ['/profile/:path*', '/auth/signin', '/auth/signup', '/organizations/dashboard/:path*']
}
