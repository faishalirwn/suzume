import * as ToggleGroup from "@radix-ui/react-toggle-group";

const LanguageToggle = ({
  langs,
  activeLangs,
  setActiveLangs,
  karaokeMode,
}: {
  langs: string[];
  activeLangs: string[];
  setActiveLangs: (value: string[]) => void;
  karaokeMode: boolean;
}) => {
  if (karaokeMode) {
    return (
      <ToggleGroup.Root
        className="inline-flex space-x-px rounded "
        type="single"
        value={activeLangs[0]}
        onValueChange={(value) => {
          // Ensure at least one toggle is active
          if (value) {
            setActiveLangs([value]);
          }
        }}
        aria-label="Language"
      >
        {langs.map((lang, i) => (
          <ToggleGroup.Item
            className="flex h-[35px] w-[60px] items-center justify-center bg-[#1d1d1d] text-base leading-4 text-white first:rounded-l last:rounded-r hover:bg-[#353535] focus:z-10 focus:outline-none data-[state=on]:bg-white data-[state=on]:text-black"
            key={i}
            value={lang}
            aria-label={lang}
          >
            {lang}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    );
  } else {
    return (
      <ToggleGroup.Root
        className="inline-flex space-x-px rounded "
        type={"multiple"}
        value={activeLangs}
        onValueChange={(value) => {
          // Ensure at least one toggle is active
          console.log(value);
          if (value && value.length !== 0 && value.length <= 3) {
            setActiveLangs(value);
          }
        }}
        aria-label="Language"
      >
        {langs.map((lang, i) => (
          <ToggleGroup.Item
            className="flex h-[35px] w-[60px] items-center justify-center bg-[#1d1d1d] text-base leading-4 text-white first:rounded-l last:rounded-r hover:bg-[#353535] focus:z-10 focus:outline-none data-[state=on]:bg-white data-[state=on]:text-black"
            key={i}
            value={lang}
            aria-label={lang}
          >
            {lang}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    );
  }
};
export default LanguageToggle;
