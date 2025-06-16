
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  secondary_role?: string;
  tags?: string[];
  bio?: string;
  location?: string;
  year_of_birth?: number;
}

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = isAuthenticated && user?.id === id;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    if (id) {
      fetchProfile();
    }
  }, [id, isAuthenticated, navigate]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div>Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div>Profile not found</div>
      </div>
    );
  }

  return (
    <section className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-3xl">
          {isOwnProfile ? "My Profile" : `${profile.name}'s Profile`}
        </h2>
        {isOwnProfile && <Button>Edit Profile</Button>}
      </div>

      <div className="rounded-xl bg-card p-6 shadow space-y-8 text-card-foreground">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="w-12 h-12" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-bold">{profile.name}</h3>
            <p className="text-muted-foreground">
              Primary Role:{" "}
              <span className="font-medium text-foreground">
                {profile.role}
              </span>
            </p>
            {profile.secondary_role && (
              <p className="text-muted-foreground">
                Secondary Role:{" "}
                <span className="font-medium text-foreground">
                  {profile.secondary_role}
                </span>
              </p>
            )}
            {profile.location && (
              <p className="text-muted-foreground">
                Location: {profile.location}
              </p>
            )}
          </div>
        </div>

        {profile.tags && profile.tags.length > 0 && (
          <div>
            <h4 className="font-semibold text-lg mb-3">Skills & Interests</h4>
            <div className="flex flex-wrap gap-2">
              {profile.tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-secondary text-secondary-foreground rounded-md px-3 py-1 text-sm font-medium"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        )}

        {profile.bio && (
          <div>
            <h4 className="font-semibold text-lg mb-3">About</h4>
            <p className="text-muted-foreground">{profile.bio}</p>
          </div>
        )}

        {!isOwnProfile && (
          <div className="pt-6 border-t">
            <Button className="w-full text-lg py-6">
              Connect with {profile.name}
            </Button>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-muted-foreground text-center text-xs">
        Profile ID: {id}
      </div>
    </section>
  );
}
