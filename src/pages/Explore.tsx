
import { NavigationBar } from "@/components/NavigationBar";

export default function Explore() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavigationBar />
      <section className="w-full max-w-7xl mx-auto py-8 px-4 md:px-12">
        <h2 className="text-3xl font-bold mb-4">Explore</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-xl bg-card shadow p-4">
            <h3 className="font-semibold mb-2">Media Feed</h3>
            <div className="text-muted-foreground text-sm">Coming soon: Share and view images and videos.</div>
          </div>
          <div className="rounded-xl bg-card shadow p-4">
            <h3 className="font-semibold mb-2">Help Requests</h3>
            <div className="text-muted-foreground text-sm">Help each other! Volunteer or comment on challenges.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
