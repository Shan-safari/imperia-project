
import { useState, useCallback } from 'react';
import { findMatches, createMatch, MatchScore } from '@/services/matchingService';
import { logEngagement } from '@/services/engagementService';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

export function useMatching() {
  const [matches, setMatches] = useState<MatchScore[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const { user } = useAuthStore();
  const { toast } = useToast();

  const loadMatches = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const matchResults = await findMatches(user.id, 20);
      setMatches(matchResults);
      setCurrentMatchIndex(0);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load matches. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  const acceptMatch = useCallback(async (targetUserId: string, aiScore: number) => {
    if (!user) return;

    try {
      const matchId = await createMatch(user.id, targetUserId, aiScore);
      
      toast({
        title: "Match Created!",
        description: "You have a new connection. Start chatting now!",
      });

      // Move to next match
      setCurrentMatchIndex(prev => prev + 1);
      
      return matchId;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create match",
        variant: "destructive"
      });
    }
  }, [user, toast]);

  const skipMatch = useCallback(async (targetUserId: string) => {
    if (!user) return;

    try {
      await logEngagement(user.id, 'skipped_match', { 
        target_user_id: targetUserId 
      });

      // Move to next match
      setCurrentMatchIndex(prev => prev + 1);
    } catch (error) {
      console.error('Error skipping match:', error);
    }
  }, [user]);

  const currentMatch = matches[currentMatchIndex];
  const hasMoreMatches = currentMatchIndex < matches.length - 1;

  return {
    matches,
    currentMatch,
    loading,
    hasMoreMatches,
    loadMatches,
    acceptMatch,
    skipMatch,
    currentMatchIndex,
    totalMatches: matches.length
  };
}
