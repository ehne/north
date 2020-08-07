import {useColorMode,Stack, Text, Button,Set,Provider as BumbagProvider } from 'bumbag';

export default function DarkModeToggle() {
        const { colorMode, setColorMode } = useColorMode();

        return (
          <Stack>
            <Set>
              <Button onClick={() => setColorMode(colorMode!="default" ? "default": "dark")}>{colorMode=="default" ? "light": "dark"}</Button>

            </Set>
          </Stack>
        )
  }