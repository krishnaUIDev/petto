import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'demo_google_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo_google_secret'
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || 'demo_github_id',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'demo_github_secret'
    }),
    CredentialsProvider({
      name: 'Pet Owner Account',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'user@example.com' },
        name: { label: 'Your Name', type: 'text', placeholder: 'Alex Parker' }
      },
      async authorize(credentials) {
        if (credentials?.name) {
          return {
            id: `usr_${Date.now()}`,
            name: credentials.name,
            email: credentials.email || 'user@petto.app',
            image: 'https://api.dicebear.com/7.x/bottts/svg?seed=' + credentials.name
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
      }
      return session;
    }
  },
  pages: {
    signIn: '/'
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
