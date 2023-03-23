import { type Lyric } from "@prisma/client";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useState } from "react";

const toggleGroupItemClasses =
  "hover:bg-gray-300 color-white-300 data-[state=on]:bg-gray-500 data-[state=on]:text-white-400 flex h-[35px] w-[35px] items-center justify-center bg-black text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none";

const LanguageToggle = ({
  langs,
  activeLangs,
  setLangs,
}: {
  langs: string[];
  activeLangs: string[];
  setLangs: (value: string[]) => void;
}) => {
  return (
    <ToggleGroup.Root
      className="inline-flex space-x-px rounded bg-black"
      type="multiple"
      value={activeLangs}
      onValueChange={(value) => {
        // Ensure at least one toggle is active
        if (value && value.length !== 0 && value.length <= 3) setLangs(value);
      }}
      aria-label="Language"
    >
      {langs?.map((lang, i) => (
        <ToggleGroup.Item
          className={toggleGroupItemClasses}
          key={i}
          value={lang}
          aria-label={lang}
        >
          {lang}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
};
export default LanguageToggle;
