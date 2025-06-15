
import { NavigationBar } from "@/components/NavigationBar";

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      <section className="max-w-2xl mx-auto py-10 w-full px-4">
        <h2 className="font-bold text-3xl mb-4">Help Center</h2>
        <div className="mb-6">
          <form className="space-y-2">
            <label htmlFor="feedback" className="block font-semibold mb-1">Feedback or Support Request</label>
            <textarea id="feedback" rows={3} placeholder="Share feedback or request support..." className="w-full border rounded p-2 bg-input"></textarea>
            <button className="py-2 px-4 rounded bg-primary text-primary-foreground font-bold w-full mt-2">Send Feedback</button>
          </form>
        </div>
        <div className="text-xs text-muted-foreground mt-6">
          By using this platform, you agree to our payment policies and terms. <a href="#" className="underline">Read More</a>
        </div>
      </section>
    </div>
  );
}
