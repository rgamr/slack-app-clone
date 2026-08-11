import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const CustomPicker = dynamic(() => import("./CustomPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[350px] w-full flex items-center justify-center">
      <Loader2 className="animate-spin size-8 text-muted-foreground" />
    </div>
  ),
});

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface EmojiPopoverProps {
  children: ReactNode;
  hint?: string;
  onEmojiSelect: (emojiValue: string) => void;
}

export const EmojiPopover = ({
  children,
  hint = "Emoji",
  onEmojiSelect,
}: EmojiPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleSelect = (emoji: { native: string }) => {
    onEmojiSelect(emoji.native);
    setPopoverOpen(false);
    setTimeout(() => {
      setTooltipOpen(false);
    }, 500);
  };

  return (
    <TooltipProvider delay={50}>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Tooltip
          open={tooltipOpen}
          onOpenChange={setTooltipOpen}
        >
          <TooltipTrigger render={
            <PopoverTrigger render={children as React.ReactElement} />
          } />
          <TooltipContent className="bg-black text-white border border-white/5">
            <p className="font-medium text-xs">{hint}</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent className="p-0 w-full border-none shadow-none">
          <CustomPicker onEmojiSelect={handleSelect} />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};