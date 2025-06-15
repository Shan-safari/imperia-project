
import { NavigationBar } from "@/components/NavigationBar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      <section className="flex-1 w-full max-w-7xl mx-auto py-8 px-4 md:px-12">
        <h2 className="font-bold text-3xl mb-4">Dashboard</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-xl p-6 shadow">
            <h3 className="font-semibold text-lg mb-2">Financial Breakdown</h3>
            <div className="text-muted-foreground text-sm">Payments, subscriptions, PPC history, directory spends</div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow">
            <h3 className="font-semibold text-lg mb-2">Live Matches & Metrics</h3>
            <div className="text-muted-foreground text-sm">List/AI confidence of matches, blacklist controls, send money shortcut</div>
          </div>
        </div>
      </section>
    </div>
  );
}
