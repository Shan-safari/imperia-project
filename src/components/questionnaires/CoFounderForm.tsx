
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function CoFounderForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    yearOfBirth: "",
    location: "",
    seeking: "",
    strengths: "",
    productStage: "",
    workStyle: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            role: "Co-founder",
            year_of_birth: parseInt(formData.yearOfBirth),
            location: formData.location || null,
            tags: [formData.seeking, formData.strengths, formData.productStage, formData.workStyle].filter(Boolean),
          })
          .eq("id", authData.user.id);

        if (profileError) throw profileError;
      }

      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          minLength={6}
        />
      </div>

      <div>
        <Label htmlFor="yearOfBirth">Year of Birth</Label>
        <Input
          id="yearOfBirth"
          type="number"
          value={formData.yearOfBirth}
          onChange={(e) => setFormData({ ...formData, yearOfBirth: e.target.value })}
          required
          min="1900"
          max={new Date().getFullYear()}
        />
      </div>

      <div>
        <Label htmlFor="location">Location (Optional)</Label>
        <Input
          id="location"
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="seeking">Seeking</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, seeking: value })}>
          <SelectTrigger>
            <SelectValue placeholder="What are you seeking?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technical-cofounder">Technical Co-founder</SelectItem>
            <SelectItem value="business-cofounder">Business Co-founder</SelectItem>
            <SelectItem value="marketing-cofounder">Marketing Co-founder</SelectItem>
            <SelectItem value="finance-cofounder">Finance Co-founder</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="strengths">Your Strengths</Label>
        <Input
          id="strengths"
          type="text"
          value={formData.strengths}
          onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
          placeholder="e.g., Product Development, Sales, Engineering"
          required
        />
      </div>

      <div>
        <Label htmlFor="productStage">Product Stage</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, productStage: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select product stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="idea">Idea Stage</SelectItem>
            <SelectItem value="prototype">Prototype</SelectItem>
            <SelectItem value="mvp">MVP</SelectItem>
            <SelectItem value="growth">Growth Stage</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="workStyle">Work Style</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, workStyle: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select work style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="in-person">In Person</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full py-3 text-base" disabled={loading}>
        {loading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
