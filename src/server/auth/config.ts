import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import { createTransport } from "nodemailer";
import { html, text } from "./sentEmail";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const { host } = new URL(url);
        const transport = createTransport(server);
        const result = await transport.sendMail({
          to: email,
          from: from,
          subject: "登录验证",
          text: text({ url, host }),
          html: html({ url, host }),
        });
        const rejected = result.rejected || [];
        const pending = result.pending || [];
        const failed = rejected.concat(pending).filter(Boolean);
        if (failed.length) {
          throw new Error(
            `邮件 (${failed.map(String).join(", ")}) 未成功发送，请检查您的邮箱设置。`,
          );
        }
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    async redirect({ url, baseUrl }) {
      console.log("redirect", url, baseUrl);

      return baseUrl;
    },
  },
} satisfies NextAuthConfig;
