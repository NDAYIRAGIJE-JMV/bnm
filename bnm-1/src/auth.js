import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import executeQuery from "./app/_utils/db";
import bcrypt from "bcryptjs/dist/bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { toMySQLTimestamp } from "./app/_libs/format-date";

// Simulate password hashing (ensure you use a secure method like bcrypt)
const saltAndHashPassword = async (password,hachedpass) => {
    const isMatch = await bcrypt.compare(hachedpass,password );
    return isMatch; 
  };

// Function to save session data to the database
const saveSessionToDb = async (userId,referer,accessToken,userAgent,ip) => {
    const sessionToken = uuidv4();
    const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    const expiresFormatted =  toMySQLTimestamp(expires);
    try {
      await executeQuery('UPDATE sessions SET actif = 0 WHERE user_id = ? AND actif = 1',
        [userId])
      await executeQuery(
        `INSERT INTO sessions (user_id, session_token, access_token, expires,referer,user_agent,ip_address) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [userId, sessionToken, accessToken, expiresFormatted,referer,userAgent,ip]
      );
      return {session: sessionToken,accessToken,expires:expires}
    } catch (error) {
      console.error("Error saving session to database:", error);
    } 
  };

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        phone: { label: "Phone", type: "tel" },
        password: { label: "Password", type: "password" },
        referer: {type: 'text'},
        userAgent: {type: "text"},
        ip: {type: "text"}
      },
      authorize: async (credentials) => {
        let user = null
        const {email, password, referer, userAgent, ip} = credentials
        const [rows] = await executeQuery('SELECT * FROM users WHERE (email=?) ', (email))
        // logic to salt and hash password
        const isMatch = await saltAndHashPassword(rows.passcode, password);
        if(!isMatch) return null;
        // logic to verify if the user exists
        const session = await saveSessionToDb(rows.id,referer,rows.role,userAgent,ip)
        user = {
            id: rows.id,
            name: rows.name,
            lastname: rows.lastname,
            username: rows.username,
            phone: rows.phone,
            email: rows.email,
            role: rows.role,
            session: session.session,
            access: session.accessToken,
            expires: session.expires
        }
        console.log(user);
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
 
        // return user object with their profile data
        return user
      },
    }),
  ],
  session: {
    jwt: true
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.session;
        token.userId = user.id;
        token.name = user.name;
        token.lastname = user.lastname;
        token.username = user.username;
        token.phone = user.phone;
        token.email = user.email;
        token.role = user.role;
        token.access = user.access;
        token.expires = user.expires;
      }
      return token;
    },
    async session({ session, token }) {
        session.id = token.id;
        session.user.id = token.userId;
        session.user.name = token.name;
        session.user.lastname = token.lastname;
        session.user.username = token.username;
        session.user.phone = token.phone;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.access = token.access;
        session.expires = token.expires; 
      
      return session;
    },
    
  },
  secret: process.env.AUTH_SECRET,
  // debug: true, // Pour obtenir des logs plus détaillés
})