
import { supabase } from "@/integrations/supabase/client";

export type EngagementType = 
  | 'sent_message' 
  | 'accepted_match' 
  | 'replied' 
  | 'scheduled_msg' 
  | 'payment' 
  | 'skipped_match' 
  | 'ignored_match';

export async function logEngagement(
  userId: string, 
  type: EngagementType, 
  metadata: Record<string, any> = {}
): Promise<void> {
  try {
    const { error } = await supabase
      .from('engagement_logs')
      .insert({
        user_id: userId,
        type,
        metadata
      });

    if (error) throw error;

    // Update engagement score
    await updateUserEngagementScore(userId);
  } catch (error) {
    console.error('Error logging engagement:', error);
    throw error;
  }
}

export async function updateUserEngagementScore(userId: string): Promise<void> {
  try {
    const { data, error } = await supabase.rpc('calculate_engagement_score', {
      user_uuid: userId
    });

    if (error) throw error;

    await supabase
      .from('profiles')
      .update({ engagement_score: data })
      .eq('id', userId);
  } catch (error) {
    console.error('Error updating engagement score:', error);
    throw error;
  }
}

export async function awardFastResponderBadge(userId: string, matchId: string): Promise<void> {
  try {
    await supabase.rpc('award_fast_responder_badge', {
      user_uuid: userId,
      match_uuid: matchId
    });
  } catch (error) {
    console.error('Error awarding fast responder badge:', error);
    throw error;
  }
}

export async function expireOldMatches(): Promise<void> {
  try {
    await supabase.rpc('expire_old_matches');
  } catch (error) {
    console.error('Error expiring old matches:', error);
    throw error;
  }
}

export async function updateAllEngagementScores(): Promise<void> {
  try {
    await supabase.rpc('update_engagement_scores');
  } catch (error) {
    console.error('Error updating all engagement scores:', error);
    throw error;
  }
}
