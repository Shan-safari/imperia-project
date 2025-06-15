
import { NavigationBar } from "@/components/NavigationBar";

export default function Messages() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavigationBar />
      <section className="w-full max-w-5xl mx-auto py-8 px-4 md:px-12">
        <h2 className="font-bold text-3xl mb-4">Messages</h2>
        <div className="rounded-xl bg-card shadow p-6 min-h-[300px]">
          <div className="mb-2">Real-time chat and tabs (All, Friends, Communities, Archive) coming soon.</div>
        </div>
      </section>
    </div>
  );
}
