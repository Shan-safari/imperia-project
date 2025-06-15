
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User as UserIcon, UserPlus, X } from "lucide-react";

const ProfileCard = ({
  profile,
  onConnect,
  onSkip,
}: {
  profile: any;
  onConnect?: () => void;
  onSkip?: () => void;
}) => (
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
    <div className="flex w-full gap-2">
      <Button size="sm" className="flex-1" onClick={onConnect}>
        <UserPlus className="w-4 h-4 mr-1" />Connect
      </Button>
      <Button variant="secondary" size="sm" className="flex-1" onClick={onSkip}>
        <X className="w-4 h-4 mr-1" /> Skip
      </Button>
    </div>
  </Card>
);

export default ProfileCard;
