import { Inter } from "next/font/google";
import "./globals.css";
import { SideProvider } from "./ui/context/sidebar";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "BNM",
    template: "%s | BNM"
  },
  description: "BNM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="180x180" href="/Logo/Logo.png" />
      </head>
      <SideProvider>
        <SessionProvider>
          <body className={`${inter.className} bg-blue-100`}>
            {children}
          </body>
        </SessionProvider>
      </SideProvider>
    </html>
  );
}
