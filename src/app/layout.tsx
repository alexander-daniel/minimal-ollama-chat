import type { Metadata } from "next";
// import { Roboto } from "next/font/google";
import "./globals.css";

// const inter = Roboto({
//   weight: '300',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: "chat with ollama",
  description: "a minimal local only ai chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={""}>{children}</body>
    </html>
  );
}
