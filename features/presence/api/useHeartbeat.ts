import { useMutation as useReactQueryMutation } from "@tanstack/react-query";
import { useMutation as useConvexMutation } from "convex/react";

import { api } from "../../../convex/_generated/api";

export const useHeartbeat = () => {
  const mutation = useConvexMutation(api.presence.heartbeat);

  const heartbeat = useReactQueryMutation({
    mutationFn: mutation,
  });

  return heartbeat;
};
