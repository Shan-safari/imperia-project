
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMatching } from "@/hooks/useMatching";
import { useAuthStore } from "@/store/authStore";
import { MatchingCard } from "@/components/matching/MatchingCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, ArrowLeft } from "lucide-react";

export default function InstantMatching() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const {
    currentMatch,
    loading,
    hasMoreMatches,
    loadMatches,
    acceptMatch,
    skipMatch,
    currentMatchIndex,
    totalMatches
  } = useMatching();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    loadMatches();
  }, [isAuthenticated, navigate, loadMatches]);

  const handleAccept = async () => {
    if (!currentMatch) return;
    await acceptMatch(currentMatch.userId, currentMatch.totalScore);
  };

  const handleSkip = async () => {
    if (!currentMatch) return;
    await skipMatch(currentMatch.userId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Finding your perfect matches...</p>
        </div>
      </div>
    );
  }

  if (!currentMatch && !hasMoreMatches) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">No More Matches</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              You've seen all available matches for now. Check back later for new connections!
            </p>
            <div className="space-y-2">
              <Button onClick={loadMatches} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Matches
              </Button>
              <Button variant="outline" onClick={() => navigate("/dashboard")} className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")} 
            className="absolute left-4 top-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold mb-2">Instant Matching</h1>
          <p className="text-muted-foreground mb-4">
            Discover your perfect connections with AI-powered matching
          </p>
          
          {/* Progress */}
          {totalMatches > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Match {currentMatchIndex + 1} of {totalMatches}</span>
                <span>{Math.round(((currentMatchIndex + 1) / totalMatches) * 100)}% Complete</span>
              </div>
              <Progress value={((currentMatchIndex + 1) / totalMatches) * 100} className="w-full" />
            </div>
          )}
        </div>

        {/* Current Match */}
        {currentMatch && (
          <MatchingCard
            match={currentMatch}
            onAccept={handleAccept}
            onSkip={handleSkip}
          />
        )}

        {/* Action Hints */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>💡 Send a message within 5 minutes to earn a "Fast Responder" badge!</p>
        </div>
      </div>
    </div>
  );
}
