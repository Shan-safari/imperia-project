
import { NavigationBar } from "@/components/NavigationBar";

export default function Payment() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      <section className="max-w-xl mx-auto py-10 w-full px-4">
        <h2 className="font-bold text-3xl mb-4">Send Payment</h2>
        <div className="mb-4 text-muted-foreground">Payments are securely processed via Stripe with escrow holding.</div>
        <form className="space-y-4">
          <input type="text" placeholder="Recipient (email or ID)" className="w-full border p-2 rounded bg-input" />
          <input type="number" min={1} placeholder="Amount (USD)" className="w-full border p-2 rounded bg-input" />
          <button type="submit" className="w-full rounded py-2 bg-primary text-primary-foreground font-semibold">Proceed to Payment</button>
        </form>
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>All investor & startup investments must be conducted on-platform.<br />Off-platform payments are strictly prohibited.</p>
        </div>
      </section>
    </div>
  );
}
