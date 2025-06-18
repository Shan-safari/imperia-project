
import { supabase } from "@/integrations/supabase/client";

export interface MatchingProfile {
  id: string;
  name: string;
  role: string;
  secondary_role?: string;
  industry?: string;
  location?: string;
  skills?: string[];
  vision?: string;
  experience?: string;
  language?: string;
  availability?: string;
  engagement_score?: number;
  badges?: string[];
  embedding_vector?: number[];
}

export interface MatchScore {
  userId: string;
  profile: MatchingProfile;
  totalScore: number;
  vectorSimilarity: number;
  roleMatch: number;
  industryMatch: number;
  locationMatch: number;
  languageMatch: number;
  engagementScore: number;
}

// Simple text embedding function (placeholder for actual embedding service)
export function generateEmbedding(text: string): number[] {
  // This is a simplified embedding generator
  // In production, you'd use a proper model like all-MiniLM-L6-v2
  const words = text.toLowerCase().split(/\s+/);
  const embedding = new Array(384).fill(0);
  
  words.forEach((word, index) => {
    const hash = simpleHash(word);
    for (let i = 0; i < 10; i++) {
      const pos = (hash + i) % 384;
      embedding[pos] += Math.sin(hash * (i + 1)) * 0.1;
    }
  });
  
  // Normalize the embedding
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return magnitude > 0 ? embedding.map(val => val / magnitude) : embedding;
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function calculateCosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function calculateRoleMatch(userRole: string, userSecondary: string | undefined, targetRole: string, targetSecondary: string | undefined): number {
  let score = 0;
  
  // Primary to Secondary role matching (ideal scenario)
  if (userSecondary && userSecondary === targetRole) score += 1.0;
  if (targetSecondary && targetSecondary === userRole) score += 1.0;
  
  // Secondary to Secondary matching
  if (userSecondary && targetSecondary && userSecondary === targetSecondary) score += 0.8;
  
  // Primary to Primary matching (less ideal but still valuable)
  if (userRole === targetRole) score += 0.5;
  
  return Math.min(score, 1.0);
}

export function calculateIndustryMatch(userIndustry: string | undefined, targetIndustry: string | undefined): number {
  if (!userIndustry || !targetIndustry) return 0.5; // Neutral if no industry specified
  return userIndustry.toLowerCase() === targetIndustry.toLowerCase() ? 1.0 : 0.3;
}

export function calculateLocationMatch(userLocation: string | undefined, targetLocation: string | undefined): number {
  if (!userLocation || !targetLocation) return 0.5; // Neutral if no location specified
  
  const userLoc = userLocation.toLowerCase();
  const targetLoc = targetLocation.toLowerCase();
  
  if (userLoc === targetLoc) return 1.0;
  
  // Check for same city/region (simplified)
  const userParts = userLoc.split(',').map(s => s.trim());
  const targetParts = targetLoc.split(',').map(s => s.trim());
  
  const commonParts = userParts.filter(part => targetParts.includes(part));
  return commonParts.length > 0 ? 0.7 : 0.2;
}

export function calculateLanguageMatch(userLang: string | undefined, targetLang: string | undefined): number {
  if (!userLang || !targetLang) return 1.0; // Assume compatible if not specified
  return userLang.toLowerCase() === targetLang.toLowerCase() ? 1.0 : 0.3;
}

export async function findMatches(userId: string, limit: number = 10): Promise<MatchScore[]> {
  try {
    // Get user's profile
    const { data: userProfile, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !userProfile) {
      throw new Error('User profile not found');
    }

    // Generate user embedding if not exists
    let userEmbedding = userProfile.embedding_vector;
    if (!userEmbedding) {
      const profileText = [
        userProfile.role,
        userProfile.secondary_role,
        userProfile.industry,
        userProfile.vision,
        userProfile.experience,
        ...(userProfile.skills || []),
        ...(userProfile.tags || [])
      ].filter(Boolean).join(' ');
      
      userEmbedding = generateEmbedding(profileText);
      
      // Update user profile with embedding
      await supabase
        .from('profiles')
        .update({ embedding_vector: userEmbedding })
        .eq('id', userId);
    }

    // Get potential matches (exclude self and existing matches)
    const { data: existingMatches } = await supabase
      .from('matches')
      .select('user_2_id')
      .eq('user_1_id', userId)
      .eq('status', 'active');

    const excludeIds = [userId, ...(existingMatches?.map(m => m.user_2_id) || [])];

    const { data: candidates, error: candidatesError } = await supabase
      .from('profiles')
      .select('*')
      .not('id', 'in', `(${excludeIds.join(',')})`)
      .limit(50); // Get more candidates to score and filter

    if (candidatesError) {
      throw new Error('Error fetching candidates');
    }

    const matchScores: MatchScore[] = [];

    for (const candidate of candidates || []) {
      // Generate candidate embedding if not exists
      let candidateEmbedding = candidate.embedding_vector;
      if (!candidateEmbedding) {
        const profileText = [
          candidate.role,
          candidate.secondary_role,
          candidate.industry,
          candidate.vision,
          candidate.experience,
          ...(candidate.skills || []),
          ...(candidate.tags || [])
        ].filter(Boolean).join(' ');
        
        candidateEmbedding = generateEmbedding(profileText);
        
        // Update candidate profile with embedding
        await supabase
          .from('profiles')
          .update({ embedding_vector: candidateEmbedding })
          .eq('id', candidate.id);
      }

      // Calculate individual scores
      const vectorSimilarity = calculateCosineSimilarity(userEmbedding, candidateEmbedding);
      const roleMatch = calculateRoleMatch(
        userProfile.role,
        userProfile.secondary_role,
        candidate.role,
        candidate.secondary_role
      );
      const industryMatch = calculateIndustryMatch(userProfile.industry, candidate.industry);
      const locationMatch = calculateLocationMatch(userProfile.location, candidate.location);
      const languageMatch = calculateLanguageMatch(userProfile.language, candidate.language);
      const engagementScore = (candidate.engagement_score || 0) / 100; // Normalize to 0-1

      // Apply weights and calculate total score
      const totalScore = 
        (vectorSimilarity * 0.40) +
        (roleMatch * 0.20) +
        (industryMatch * 0.15) +
        (locationMatch * 0.10) +
        (languageMatch * 0.05) +
        (engagementScore * 0.10);

      matchScores.push({
        userId: candidate.id,
        profile: candidate,
        totalScore: Math.round(totalScore * 100), // Convert to percentage
        vectorSimilarity: Math.round(vectorSimilarity * 100),
        roleMatch: Math.round(roleMatch * 100),
        industryMatch: Math.round(industryMatch * 100),
        locationMatch: Math.round(locationMatch * 100),
        languageMatch: Math.round(languageMatch * 100),
        engagementScore: Math.round(engagementScore * 100)
      });
    }

    // Sort by total score and return top matches
    return matchScores
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, limit);

  } catch (error) {
    console.error('Error finding matches:', error);
    throw error;
  }
}

export async function createMatch(userId: string, targetUserId: string, aiScore: number): Promise<string> {
  try {
    // Check if user has available match slots
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('match_quota')
      .eq('id', userId)
      .single();

    if (!userProfile || userProfile.match_quota <= 0) {
      throw new Error('No available match slots');
    }

    // Create the match
    const { data: match, error } = await supabase
      .from('matches')
      .insert({
        user_1_id: userId,
        user_2_id: targetUserId,
        ai_score: aiScore,
        status: 'active',
        expires_at: new Date(Date.now() + 20 * 60 * 1000).toISOString() // 20 minutes from now
      })
      .select()
      .single();

    if (error) throw error;

    // Decrease match quota
    await supabase
      .from('profiles')
      .update({ match_quota: userProfile.match_quota - 1 })
      .eq('id', userId);

    // Log engagement
    await logEngagement(userId, 'accepted_match', { match_id: match.id });

    return match.id;
  } catch (error) {
    console.error('Error creating match:', error);
    throw error;
  }
}
