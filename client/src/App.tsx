import { Card, Group, Stack, Text } from "@mantine/core";
import Typewriter from "typewriter-effect";
import FileDropZone from "./components/FileDropzone";

function App() {
  return (
    <div>
      <Stack mt={80} align="center" gap="lg">
        <Text ta="center" fw={700} size="xl">
          Upload Document for Text Extraction
        </Text>
        <Card bg="#fbfbff" radius="md" padding="lg" shadow="md">
          <Group justify="space-between">
            <FileDropZone />
            <div style={{ width: 500 }}>
              <Typewriter
                options={{
                  strings: ["Example Text 1", "Example Text 2"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </Group>
        </Card>
      </Stack>
    </div>
  );
}

export default App;
