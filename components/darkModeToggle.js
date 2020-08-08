import {
  useColorMode,
  Stack,
  Text,
  Button,
  Set,
  Provider as BumbagProvider,
} from "bumbag";
import { SunIcon, MoonIcon } from "@primer/octicons-react";

export default function DarkModeToggle() {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Stack>
      <Set>
        <Button
        size="small"
          onClick={() =>
            setColorMode(colorMode != "default" ? "default" : "dark")
          }
        >
          {colorMode == "default" ? <SunIcon/> : <MoonIcon/>}
        </Button>
      </Set>
    </Stack>
  );
}
