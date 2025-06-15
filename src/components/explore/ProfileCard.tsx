
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User as UserIcon } from "lucide-react";

const ProfileCard = ({ profile }: { profile: any }) => (
  <Card className="flex flex-col items-center p-5 bg-card rounded-xl shadow">
    <div className="mb-3">
      <img
        src={profile.avatar}
        alt={profile.name}
        className="w-16 h-16 rounded-full border-2 border-primary object-cover"
      />
    </div>
    <h3 className="font-bold text-lg mb-1">{profile.name}</h3>
    <div className="mb-2 text-muted-foreground text-sm">
      Role: <span className="font-medium">{profile.primaryRole}</span>
    </div>
    <div className="flex flex-wrap gap-2 justify-center mb-3">
      {profile.tags.map((tag: string) => (
        <span key={tag} className="bg-muted text-muted-foreground px-2 py-0.5 rounded text-xs">{tag}</span>
      ))}
    </div>
    <Button size="sm" className="w-full mb-2">Connect</Button>
    <Button variant="secondary" size="sm" className="w-full">Engage</Button>
  </Card>
);

export default ProfileCard;
