import { useMutation } from "convex/react";
import { useCallback, useState } from "react";
import { atom, useAtom } from "jotai";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

const modalState = atom(false);

type RequestType = { name: string; workspaceId: Id<"workspaces"> };
type ResponseType = Id<"channels">;

export const useCreateChannelModal = () => {
  const [open, setOpen] = useAtom(modalState);
  const [data, setData] = useState<ResponseType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");

  const mutation = useMutation(api.channels.create);

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
    open,
    setOpen,
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
