
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User as UserIcon } from "lucide-react";

const MatchCard = ({ match }: { match: any }) => {
  const { user, aiScore, status } = match;
  return (
    <Card className="flex flex-col items-center p-5 bg-card rounded-xl shadow gap-2">
      <img src={user.avatar} alt={user.name} className="w-16 h-16 object-cover rounded-full border-2 border-secondary mb-2" />
      <h3 className="font-bold text-lg">{user.name}</h3>
      <div className="text-muted-foreground text-sm mb-1">{user.primaryRole}</div>
      <div className="flex flex-wrap gap-2 mb-2">
        {user.tags.map((tag: string) => (
          <span key={tag} className="bg-muted text-muted-foreground px-2 py-0.5 rounded text-xs">{tag}</span>
        ))}
      </div>
      <div className="flex gap-1 items-center mb-2">
        <span
          className={
            aiScore > 80
              ? "bg-green-100 text-green-700"
              : aiScore > 60
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-700"
          + " px-2 py-0.5 text-xs rounded"}
        >
          AI Score: {aiScore}%
        </span>
        <span
          className={
            status === "successful"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          + " px-2 py-0.5 text-xs rounded"}
        >
          {status === "successful" ? "Successful" : "Failed"}
        </span>
      </div>
      <div className="flex gap-2 w-full">
        <Button size="sm" className="flex-1">Connect</Button>
        <Button variant="secondary" size="sm" className="flex-1">Skip</Button>
      </div>
    </Card>
  );
};

export default MatchCard;
