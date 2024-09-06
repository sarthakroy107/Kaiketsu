import { auth } from "@/auth";
import { GoogleSignIn } from "../convert/google-signin";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if(session && session.user && session.user.googleAccessToken) {
    redirect("/spotify");
  }
  
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <GoogleSignIn />
    </div>
  );
}
