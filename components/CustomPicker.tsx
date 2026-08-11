import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";

const CustomPicker = (props: any) => {
  const { resolvedTheme } = useTheme();

  return (
    <EmojiPicker
      theme={resolvedTheme === "dark" ? Theme.DARK : Theme.LIGHT}
      onEmojiClick={(emoji: EmojiClickData) => {
        if (props.onEmojiSelect) {
          props.onEmojiSelect({ native: emoji.emoji });
        }
      }}
      {...props}
    />
  );
};

export default CustomPicker;
