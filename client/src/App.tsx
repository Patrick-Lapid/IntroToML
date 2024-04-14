import { Card, Group, Stack, Text, rgba } from "@mantine/core";
import Typewriter from "typewriter-effect";
import FileDropZone from "./components/FileDropzone";

function App() {
  return (
    <>
      <div className="absolute">
        <div className="meshContainer">
          <div className="bg-shape1 bg-primary bg-blur"></div>
          <div className="bg-shape2 bg-purple bg-blur"></div>
          <div className="bg-shape3 bg-teal bg-blur"></div>
        </div>
      </div>
      <Stack mt={120} align="center" gap="lg">
        <Text ta="center" fw={700} size="xl">
          Upload Document for Text Extraction
        </Text>
        <Card
          // bg="#fbfbff"
          radius="md"
          padding="lg"
          shadow="md"
          bg={rgba("#FFFFFF", 0.6)}
        >
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
    </>
  );
}

export default App;
