
import { useParams } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuthStore();

  const isOwnProfile = isAuthenticated && user?.id === id;

  // Placeholder data, would be fetched with id
  const profileData = {
    name: "Jane Doe",
    primaryRole: "Founder",
    tags: ["SaaS", "Fintech", "AI", "B2B"],
    highlights: [
      "Raised $2M in seed funding.",
      "Scaled user base to 100k MAU.",
      "Expert in product-led growth.",
    ],
  };

  return (
    <section className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-3xl">Profile Settings</h2>
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
            <h3 className="text-2xl font-bold">{profileData.name}</h3>
            <p className="text-muted-foreground">
              Primary Role:{" "}
              <span className="font-medium text-foreground">
                {profileData.primaryRole}
              </span>
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-3">Info Tags</h4>
          <div className="flex flex-wrap gap-2">
            {profileData.tags.map((tag) => (
              <div
                key={tag}
                className="bg-secondary text-secondary-foreground rounded-md px-3 py-1 text-sm font-medium"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-3">
            Highlights from Questionnaire
          </h4>
          <ul className="list-disc list-inside space-y-2 pl-2">
            {profileData.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        {!isOwnProfile && (
          <div className="pt-6 border-t">
            <Button className="w-full text-lg py-6">
              Connect with {profileData.name}
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
