
import { NavigationBar } from "@/components/NavigationBar";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  // Profile data would be fetched with id
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      <section className="w-full max-w-2xl mx-auto py-10 px-4">
        <h2 className="font-bold text-3xl mb-4">Profile</h2>
        <div className="mb-4 text-muted-foreground text-sm">ID: {id}</div>
        <div className="rounded-xl bg-card p-6 shadow">
          {/* Profile content goes here */}
          <div className="text-muted-foreground">Work in progress: public profile details, highlights, connect button, etc.</div>
        </div>
      </section>
    </div>
  );
}
