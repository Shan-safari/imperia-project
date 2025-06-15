
import { NavigationBar } from "@/components/NavigationBar";
import { RoleSelectionForm } from "@/components/auth/RoleSelectionForm";

export default function Auth() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      <div className="flex flex-1 items-center justify-center py-12 px-4">
        <div className="p-8 bg-card border rounded-xl shadow-lg max-w-4xl w-full">
          <h2 className="font-bold text-3xl mb-2 text-center">
            Let's Get Started
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Choose your primary role to create an account. Select a secondary
            role if you want to find a match.
          </p>

          <RoleSelectionForm />

          <div className="mt-8 text-xs text-muted-foreground text-center">
            By signing up, you agree to our{" "}
            <a href="/help-center" className="underline">
              Terms
            </a>{" "}
            &amp;{" "}
            <a href="/help-center" className="underline">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
