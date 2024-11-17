import type { Metadata } from "next";
import "./globals.css";
import {oswald} from '@/app/fonts/fonts';


export const metadata: Metadata = {
  title: "Zoey Lee's Personal Website",
  description: "Created by Zoey Lee for Zoey Lee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
