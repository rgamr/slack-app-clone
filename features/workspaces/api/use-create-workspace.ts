import { useMutation } from "convex/react";
import { useCallback, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

type RequestType = { name: string };
type ResponseType = Id<"workspaces">;

export const useCreateWorkspace = () => {
  const [data, setData] = useState<ResponseType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");

  const mutation = useMutation(api.workspaces.create);

  const mutate = useCallback(async (values: RequestType, options?: { 
    onSuccess?: (data: ResponseType) => void; 
    onError?: (error: Error) => void; 
    onSettled?: () => void 
  }) => {
    try {
      setData(null);
      setError(null);
      setStatus("pending"); 
      const result = await mutation(values);
      setData(result);
      setStatus("success");
      if (options?.onSuccess) {
        options.onSuccess(result);
      }
      return result;
    } catch (e) {
      setError(e as Error);
      setStatus("error");
      if (options?.onError) {
        options.onError(e as Error);
      }
      throw e;
    } finally {
      if (options?.onSettled) {
        options.onSettled();
      }
    }
  }, [mutation]);

  return {
    mutate,
    mutateAsync: mutate,
    data,
    error,
    isPending: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
    status,
  };
};
