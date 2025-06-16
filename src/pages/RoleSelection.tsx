
import { NavigationBar } from "@/components/NavigationBar";
import { RoleSelectionForm } from "@/components/auth/RoleSelectionForm";

export default function RoleSelection() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      <div className="flex flex-1 items-center justify-center py-12 px-4">
        <div className="p-8 bg-card border rounded-xl shadow-lg max-w-4xl w-full">
          <h2 className="font-bold text-3xl mb-2 text-center">
            Choose Your Role
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Select your primary role and optionally a secondary role to match with.
          </p>
          <RoleSelectionForm />
        </div>
      </div>
    </div>
  );
}
