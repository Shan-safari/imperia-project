
export default function Settings() {
  return (
    <section className="max-w-3xl mx-auto w-full">
      <h2 className="font-bold text-3xl mb-4">Settings</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card rounded-xl p-6 shadow mb-6 md:mb-0">
          <h3 className="font-semibold text-lg">Account Preferences</h3>
          <div className="text-muted-foreground text-sm">Update email, password, voice settings, profile pic, role.</div>
        </div>
        <div className="bg-card rounded-xl p-6 shadow">
          <h3 className="font-semibold text-lg">Billing & Security</h3>
          <div className="text-muted-foreground text-sm">
            Manage subscription, payment history. <br />
            Privacy, notification preferences, delete account.
          </div>
        </div>
      </div>
    </section>
  );
}
