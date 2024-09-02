import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Pizza",
  description: "The best pizza !!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              backgroundColor: "var(--dark-900)",
              color: "var(--green-900)",
              borderColor: "rgba(255,255,255, 0.5)"
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
