
import { NavigationBar } from "@/components/NavigationBar";

export default function Premium() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavigationBar />
      <section className="w-full max-w-2xl mx-auto py-10 px-4">
        <h2 className="font-bold text-3xl mb-4">Premium Membership</h2>
        <div className="text-muted-foreground mb-4">
          Unlock AI assistant, PPC, and directory listing—just $16.16/month.
        </div>
        <button className="py-3 w-full rounded bg-primary text-primary-foreground font-bold">Subscribe Now</button>
      </section>
    </div>
  );
}
