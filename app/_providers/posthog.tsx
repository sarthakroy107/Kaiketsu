// app/providers.js
"use client";
import { useSession } from "next-auth/react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
  });
}
export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <PosthogWrapper>{children}</PosthogWrapper>
    </PostHogProvider>
  );
}

function PosthogWrapper({ children }: { children: React.ReactNode }) {
  const session = useSession();
  useEffect(() => {
    if (session.status === "authenticated" && session?.data?.user?.email) {
      posthog.identify(session.data?.user?.email, {
        email: session.data?.user?.email,
        name: session.data?.user?.name,
      });
    } else if (session.status === "unauthenticated") {
      posthog.reset();
    }
  }, [session]);

  return children;
}
