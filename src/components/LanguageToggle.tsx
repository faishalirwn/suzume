import * as ToggleGroup from "@radix-ui/react-toggle-group";

const toggleGroupItemClasses =
  "hover:bg-[#eee] hover:text-[#939393] text-[#9f9f9f] data-[state=on]:bg-[#e0e0e0] data-[state=on]:text-[#676767] flex h-[35px] w-[50px] items-center justify-center bg-white text-base leading-4 first:rounded-l last:rounded-r font-medium focus:z-10 focus:outline-none";

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
      className="inline-flex space-x-px rounded bg-white"
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
