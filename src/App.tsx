import { Card, Group, Stack, Text } from "@mantine/core";
import FileDropZone from "./components/FileDropzone";

function App() {
  return (
    <div>
      <Stack mt={80} align="center" gap="lg">
        <Text ta="center" fw={700} size="xl">
          Upload Document for Text Extraction
        </Text>
        <Card bg="#fbfbff" radius="md" padding="lg" shadow="md">
          <Group>
            <FileDropZone />
            <div style={{ width: 500 }}>
              <Text>Text Generation</Text>
            </div>
          </Group>
        </Card>
      </Stack>
    </div>
  );
}

export default App;
