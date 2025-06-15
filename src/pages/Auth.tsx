
import { NavigationBar } from "@/components/NavigationBar";

export default function Auth() {
  // This will later branch: role selection > questionnaire > then signup.
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      <div className="flex flex-1 items-center justify-center py-12">
        <div className="p-8 bg-card border rounded-xl shadow max-w-md w-full">
          <h2 className="font-bold text-2xl mb-6">Sign Up / Log In</h2>
          <div className="mb-8">
            {/* Role selection and onboarding go here next */}
            <div className="text-muted-foreground text-center">
              Choose your primary & secondary roles to begin onboarding...
            </div>
          </div>
          {/* Auth form placeholder */}
          <form className="space-y-4">
            <input type="email" placeholder="Email" className="w-full border p-2 rounded bg-input" />
            <input type="password" placeholder="Password" className="w-full border p-2 rounded bg-input" />
            <button type="submit" className="w-full py-2 rounded bg-primary text-primary-foreground font-semibold">Continue</button>
          </form>
          <div className="mt-6 text-xs text-muted-foreground text-center">
            By signing up, you agree to our <a href="/help-center" className="underline">Terms</a> &amp; <a href="/help-center" className="underline">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
