
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User as UserIcon } from "lucide-react";

const HelpRequestCard = ({ request }: { request: any }) => (
  <Card className="flex flex-col gap-3 p-6 bg-card rounded-xl shadow">
    <div className="flex items-center gap-4 mb-1">
      <img src={request.user.avatar} className="w-10 h-10 rounded-full" alt={request.user.name} />
      <div>
        <div className="font-medium">{request.user.name}</div>
        <div className="text-xs text-muted-foreground">{request.user.primaryRole}</div>
      </div>
    </div>
    <div>
      <div className="font-semibold mb-1">{request.title}</div>
      <div className="text-muted-foreground text-sm mb-1">{request.description}</div>
      <div className="flex flex-wrap gap-2">
        {request.tags.map((tag: string) => (
          <span key={tag} className="bg-muted text-muted-foreground px-2 py-0.5 rounded text-xs">{tag}</span>
        ))}
      </div>
    </div>
    <div className="flex w-full gap-2 mt-2">
      <Button size="sm" className="flex-1">Volunteer to Help</Button>
      <Button variant="secondary" size="sm" className="flex-1">Leave Advisory Comment</Button>
    </div>
  </Card>
);

export default HelpRequestCard;
