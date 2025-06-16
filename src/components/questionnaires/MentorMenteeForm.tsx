
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MentorMenteeFormProps {
  role: string;
}

export function MentorMenteeForm({ role }: MentorMenteeFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    yearOfBirth: "",
    name: "",
    areasOfExpertise: "",
    location: "",
    availability: "",
    preferredContact: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: formData.name,
          },
        },
      });

      if (authError) throw authError;

      // Update profile with role-specific data
      if (authData.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            role: role === "mentor" ? "Mentor" : "Mentee",
            year_of_birth: parseInt(formData.yearOfBirth),
            location: formData.location || null,
            tags: formData.areasOfExpertise.split(',').map(tag => tag.trim()),
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
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="areasOfExpertise">
          {role === "mentor" ? "Areas of Expertise" : "Topics Needed"} (comma-separated)
        </Label>
        <Input
          id="areasOfExpertise"
          type="text"
          value={formData.areasOfExpertise}
          onChange={(e) => setFormData({ ...formData, areasOfExpertise: e.target.value })}
          placeholder="e.g., Marketing, Product Development, Fundraising"
          required
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
        <Label htmlFor="availability">Availability</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, availability: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekdays">Weekdays</SelectItem>
            <SelectItem value="weekends">Weekends</SelectItem>
            <SelectItem value="evenings">Evenings</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="preferredContact">Preferred Contact Method</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, preferredContact: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select contact method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="video-call">Video Call</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="in-person">In Person</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full py-3 text-base" disabled={loading}>
        {loading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
