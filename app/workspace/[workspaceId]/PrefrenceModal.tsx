import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRemoveWorkspace } from "@/features/workspaces/api/useDeleteWorkspace";
import { useUpdateWorkspace } from "@/features/workspaces/api/useUpdateWorkspace";
import { useWorkspaceId } from "@/hooks/useWorkSpaceId";
import { useConfirm } from "@/hooks/useConfirm";

interface PreferenceModalProps {
  initialVlaue: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const PreferenceModal = ({
  initialVlaue,
  open,
  setOpen,
}: PreferenceModalProps) => {
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This action is irreversible"
  );

  const workspaceId = useWorkspaceId();
  const [editOpen, setEditOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: initialVlaue,
    },
  });
  const value = form.watch("name");

  const updateWorkspace = useUpdateWorkspace();
  const removeWorkspace = useRemoveWorkspace();

  const handleClose = () => {
    setOpen(false);
    form.reset();
  };

  const handleUpdateWorkspace = form.handleSubmit(async ({ name }) => {
    try {
      await updateWorkspace.mutateAsync({
        id: workspaceId,
        name,
      });
      setEditOpen(false);
      toast.success("Workspace updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update workspace");
    }
  });

  const handleRemoveWorkspace = async () => {
    const ok = await confirm();
    if (!ok) return;
    try {
      await removeWorkspace.mutateAsync({
        id: workspaceId,
      });
      toast.success("Workspace removed");
      router.replace("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove workspace");
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>{initialVlaue}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger
                nativeButton={false}
                render={
                  <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 w-full text-left" />
                }
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Workspace name</p>
                  <p className="text-sm text-[#1264A3] hover:underline font-semibold">
                    Edit
                  </p>
                </div>
                <p className="text-sm mt-1 text-muted-foreground">{value}</p>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename this workspace</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleUpdateWorkspace}>
                  <Input
                    {...form.register("name", {
                      required: true,
                      minLength: 3,
                      maxLength: 80,
                    })}
                    disabled={updateWorkspace.isPending}
                    autoFocus
                    placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
                  />
                  <DialogFooter>
                    <DialogClose
                      render={
                        <Button
                          variant="outline"
                          disabled={updateWorkspace.isPending}
                        />
                      }
                    >
                      Cancel
                    </DialogClose>
                    <Button type="submit" disabled={updateWorkspace.isPending}>
                      Save
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <button
              disabled={removeWorkspace.isPending}
              onClick={handleRemoveWorkspace}
              className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600 w-full"
            >
              <TrashIcon className="size-4" />
              <p className="text-sm font-semibold">Delete workspace</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};