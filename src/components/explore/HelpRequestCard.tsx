
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User as UserIcon, MessageCircle, Handshake } from "lucide-react";

const HelpRequestCard = ({
  request,
  onVolunteer,
  onAdvise
}: {
  request: any;
  onVolunteer?: () => void;
  onAdvise?: () => void;
}) => (
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
      <Button size="sm" className="flex-1" onClick={onVolunteer}>
        <Handshake className="w-4 h-4 mr-1" /> Volunteer to Help
      </Button>
      <Button variant="secondary" size="sm" className="flex-1" onClick={onAdvise}>
        <MessageCircle className="w-4 h-4 mr-1" /> Leave Advisory Comment
      </Button>
    </div>
    {request.advice?.length > 0 && (
      <div className="mt-3 bg-muted rounded p-2">
        <div className="text-xs font-bold mb-1">Advisory Comments:</div>
        <ul className="space-y-1">
          {request.advice.map((ad: any) => (
            <li key={ad.id} className="text-xs text-muted-foreground">
              <span className="font-medium">{ad.user?.name || "Someone"}:</span> {ad.text}
            </li>
          ))}
        </ul>
      </div>
    )}
  </Card>
);

export default HelpRequestCard;
