import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { AnimatedStars } from "./animated-stars";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./_providers/theme-provider";
import AuthProvider from "./_providers/auth";
import { CSPostHogProvider } from "./_providers/posthog";
import { Navbar } from "@/components/navbar";
import { SpotifyLoginProvider } from "./_providers/context";

const inter = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "text-white")}>
        <AuthProvider>
          <CSPostHogProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              themes={["dark"]}
            >
              <SpotifyLoginProvider>
                <Navbar />
                <AnimatedStars />
                {children}
                <Toaster />
              </SpotifyLoginProvider>
            </ThemeProvider>
          </CSPostHogProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
