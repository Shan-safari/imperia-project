
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  MapPin, 
  Briefcase, 
  Star, 
  Clock, 
  Heart, 
  X,
  Zap
} from "lucide-react";
import { MatchScore } from "@/services/matchingService";

interface MatchingCardProps {
  match: MatchScore;
  onAccept: () => void;
  onSkip: () => void;
}

export function MatchingCard({ match, onAccept, onSkip }: MatchingCardProps) {
  const { profile, totalScore } = match;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const hasFastResponderBadge = profile.badges?.includes('fast_responder');

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Picture and Score */}
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.profile_picture_url} alt={profile.name} />
              <AvatarFallback className="text-2xl">
                <User className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold ${getScoreColor(totalScore)}`}>
              {totalScore}%
            </div>
          </div>

          {/* Name and Role */}
          <div className="text-center">
            <h3 className="text-xl font-bold">{profile.name || "Anonymous"}</h3>
            <p className="text-muted-foreground">{profile.role}</p>
            {profile.secondary_role && (
              <p className="text-sm text-muted-foreground">
                Looking for: {profile.secondary_role}
              </p>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 justify-center">
            {hasFastResponderBadge && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                <Zap className="w-3 h-3 mr-1" />
                Fast Responder
              </Badge>
            )}
            {profile.badges?.filter(b => b !== 'fast_responder').map((badge) => (
              <Badge key={badge} variant="outline">
                {badge.replace('_', ' ').toUpperCase()}
              </Badge>
            ))}
          </div>

          {/* Profile Info */}
          <div className="w-full space-y-2">
            {profile.industry && (
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{profile.industry}</span>
              </div>
            )}
            
            {profile.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{profile.location}</span>
              </div>
            )}

            {profile.engagement_score && profile.engagement_score > 0 && (
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Engagement: {Math.round(profile.engagement_score)}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <div className="w-full">
              <h4 className="text-sm font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-1">
                {profile.skills.slice(0, 6).map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {profile.skills.length > 6 && (
                  <Badge variant="outline" className="text-xs">
                    +{profile.skills.length - 6} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Vision/Bio */}
          {profile.vision && (
            <div className="w-full">
              <h4 className="text-sm font-medium mb-2">Vision</h4>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {profile.vision}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 w-full">
            <Button 
              variant="outline" 
              size="lg" 
              className="flex-1"
              onClick={onSkip}
            >
              <X className="w-5 h-5 mr-2" />
              Skip
            </Button>
            <Button 
              size="lg" 
              className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
              onClick={onAccept}
            >
              <Heart className="w-5 h-5 mr-2" />
              Connect
            </Button>
          </div>

          {/* Match Breakdown */}
          <details className="w-full">
            <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
              View Match Details
            </summary>
            <div className="mt-2 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Profile Similarity:</span>
                <span>{match.vectorSimilarity}%</span>
              </div>
              <div className="flex justify-between">
                <span>Role Match:</span>
                <span>{match.roleMatch}%</span>
              </div>
              <div className="flex justify-between">
                <span>Industry Match:</span>
                <span>{match.industryMatch}%</span>
              </div>
              <div className="flex justify-between">
                <span>Location Match:</span>
                <span>{match.locationMatch}%</span>
              </div>
            </div>
          </details>
        </div>
      </CardContent>
    </Card>
  );
}
