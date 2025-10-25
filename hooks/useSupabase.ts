import { useSyncUserMutation } from "@/services/supabaseApi";
import { getUserByClerkId, User } from "@/services/supabaseService";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";

/**
 * Hook to sync Clerk user with Supabase and get user ID
 * This is the main hook you'll use to get the current user's Supabase ID
 *
 * Usage:
 * const { userId, supabaseUser, loading } = useSupabaseUser();
 */
export const useSupabaseUser = () => {
  const { user: clerkUser } = useUser();
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncUser] = useSyncUserMutation();

  useEffect(() => {
    const sync = async () => {
      if (!clerkUser) {
        setSupabaseUser(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Try to get existing user first
        try {
          const existingUser = await getUserByClerkId(clerkUser.id);
          setSupabaseUser(existingUser);
        } catch {
          // User doesn't exist, sync with Supabase
          const result = await syncUser({
            clerkId: clerkUser.id,
            email: clerkUser.primaryEmailAddress?.emailAddress || "",
            username: clerkUser.username || undefined,
            avatarUrl: clerkUser.imageUrl || undefined,
          }).unwrap();

          setSupabaseUser(result);
        }
      } catch (error) {
        console.error("Error syncing user:", error);
      } finally {
        setLoading(false);
      }
    };

    sync();
  }, [clerkUser?.id]);

  return {
    supabaseUser,
    userId: supabaseUser?.id,
    loading,
  };
};
