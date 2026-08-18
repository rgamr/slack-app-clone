import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/useWorkSpaceId";
import { cn } from "@/lib/utils";
import { Id } from "../../../convex/_generated/dataModel";

const userItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#F9EDFFCC]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface UserItemProps {
  id: Id<"members">;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemVariants>["variant"];
  isOnline?: boolean;
}

export const UserItem = ({ id, image, label, variant, isOnline }: UserItemProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <Button
      variant="transparent"
      className={cn(userItemVariants({ variant }))}
      size="sm"
    >
      <Link href={`/workspace/${workspaceId}/member/${id}`} className="flex items-center w-full">
        <div className="relative mr-1">
          <Avatar className="size-5 rounded-md">
            <AvatarImage className="rounded-md" src={image} />
            <AvatarFallback className="rounded-md text-xs">
              {label?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-[#1164A3] border-2 border-white rounded-full" style={{ backgroundColor: "#2BAC76" }} />
          )}
        </div>
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};