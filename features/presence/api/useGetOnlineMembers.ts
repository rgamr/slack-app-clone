import { useQuery } from "convex/react";

import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

interface UseGetOnlineMembersProps {
  workspaceId: Id<"workspaces">;
}

export const useGetOnlineMembers = ({ workspaceId }: UseGetOnlineMembersProps) => {
  const data = useQuery(api.presence.getOnlineMembers, { workspaceId });
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
