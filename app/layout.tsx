import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fluid Motion Interactive Portfolio",
  description: "Interactive portfolio with fluid particles and hover links",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className="antialiased bg-black text-white select-none">
        {children}
      </body>
    </html>
  );
}
