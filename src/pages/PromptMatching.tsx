
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, ArrowLeft, Sparkles, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function PromptMatching() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { toast } = useToast();
  
  const [prompt, setPrompt] = useState(location.state?.initialPrompt || "");
  const [isSearching, setIsSearching] = useState(false);
  const [matches, setMatches] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
  }, [isAuthenticated, navigate]);

  const findPromptMatches = async () => {
    if (!prompt.trim() || !user) return;

    setIsSearching(true);
    setHasSearched(true);

    try {
      // Save user's prompt to their profile
      await supabase
        .from('profiles')
        .update({ 
          vision: prompt,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      // Find users with similar prompts/visions
      const { data: candidates, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user.id)
        .not('vision', 'is', null)
        .limit(20);

      if (error) throw error;

      // Simple text similarity matching (in production, you'd use proper NLP/embeddings)
      const promptWords = prompt.toLowerCase().split(/\s+/);
      const scoredMatches = candidates
        ?.map(candidate => {
          const candidateWords = (candidate.vision || '').toLowerCase().split(/\s+/);
          const commonWords = promptWords.filter(word => 
            candidateWords.some(cWord => cWord.includes(word) || word.includes(cWord))
          );
          const similarity = commonWords.length / Math.max(promptWords.length, candidateWords.length);
          
          return {
            ...candidate,
            similarity: Math.round(similarity * 100)
          };
        })
        .filter(match => match.similarity > 20)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 10) || [];

      setMatches(scoredMatches);

      if (scoredMatches.length === 0) {
        toast({
          title: "No matches found",
          description: "Try refining your prompt or check back later for new users.",
          variant: "destructive"
        });
      }

    } catch (error) {
      console.error('Error finding matches:', error);
      toast({
        title: "Error",
        description: "Failed to find matches. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      findPromptMatches();
    }
  };

  const connectWithUser = async (targetUserId: string) => {
    if (!user) return;

    try {
      // Create a match (simplified version)
      const { error } = await supabase
        .from('matches')
        .insert({
          user_1_id: user.id,
          user_2_id: targetUserId,
          ai_score: 85, // Default score for prompt matches
          status: 'active',
          expires_at: new Date(Date.now() + 20 * 60 * 1000).toISOString()
        });

      if (error) throw error;

      toast({
        title: "Connection Request Sent!",
        description: "You can now start chatting with this user.",
      });

      navigate("/messages");
    } catch (error) {
      console.error('Error creating connection:', error);
      toast({
        title: "Error",
        description: "Failed to connect. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")} 
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">AI-Powered Prompt Matching</h1>
          <p className="text-muted-foreground">
            Describe what you're looking for and we'll find users with similar interests and goals.
          </p>
        </div>

        {/* Prompt Input */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Describe Your Connection Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Be specific about what you're looking for... (e.g., 'I'm a fintech startup founder looking for a technical co-founder with blockchain experience' or 'I need a mentor who has scaled a SaaS business to 7 figures')"
                className="min-h-[120px] text-lg p-4 pr-16 resize-none"
              />
              <Button
                onClick={findPromptMatches}
                disabled={!prompt.trim() || isSearching}
                className="absolute bottom-4 right-4"
              >
                {isSearching ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Send className="w-5 h-5 mr-2" />
                )}
                {isSearching ? "Searching..." : "Find Matches"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {hasSearched && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Matching Results ({matches.length} found)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {matches.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No matches found for your prompt.</p>
                  <p className="text-sm">Try adjusting your description or check back later.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {matches.map((match: any) => (
                    <div key={match.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{match.name || "Anonymous User"}</h3>
                          <p className="text-sm text-muted-foreground">{match.role}</p>
                          {match.secondary_role && (
                            <p className="text-sm text-muted-foreground">
                              Also: {match.secondary_role}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {match.similarity}% match
                          </Badge>
                          <Button 
                            onClick={() => connectWithUser(match.id)}
                            size="sm"
                          >
                            Connect
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm font-medium mb-1">Their Goal:</p>
                        <p className="text-sm text-muted-foreground italic">
                          "{match.vision}"
                        </p>
                      </div>

                      {(match.industry || match.location || match.experience) && (
                        <div className="flex flex-wrap gap-2 text-xs">
                          {match.industry && (
                            <Badge variant="outline">{match.industry}</Badge>
                          )}
                          {match.location && (
                            <Badge variant="outline">{match.location}</Badge>
                          )}
                          {match.experience && (
                            <Badge variant="outline">{match.experience}</Badge>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
