
import { NavigationBar } from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      <div className="flex flex-1 items-center justify-center py-12 px-4">
        <div className="p-8 bg-card border rounded-xl shadow-lg max-w-md w-full">
          <h2 className="font-bold text-3xl mb-2 text-center">
            Create your Account
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Enter your details to sign up.
          </p>

          <form className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full py-3 text-base">
              Sign Up
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">Google</Button>
            <Button variant="outline">Apple</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
