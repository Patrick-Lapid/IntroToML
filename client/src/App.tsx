import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Overlay,
  ScrollArea,
  Stack,
  Text,
  rgba,
} from "@mantine/core";
import FileDropZone from "./components/FileDropzone";
import { useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [files, setFiles] = useState([4, 5, 6]);
  const [selectedId, setSelectedId] = useState<null | string>(null);

  return (
    <>
      <div className="absolute">
        <div className="meshContainer">
          <div className="bg-shape1 bg-primary bg-blur"></div>
          <div className="bg-shape2 bg-purple bg-blur"></div>
          <div className="bg-shape3 bg-teal bg-blur"></div>
        </div>
      </div>
      <Stack mt={140} align="center" gap="lg">
        <Text ta="center" fw={700} size="xl">
          Upload Document for Text Extraction
        </Text>
        <Card radius="md" padding="lg" shadow="md" bg={rgba("#FFFFFF", 0.6)}>
          <Group justify="space-between" gap={16}>
            <FileDropZone />
            <ScrollArea w={500} h={302}>
              <Stack gap={8} mt={1}>
                {files.length > 0 &&
                  files.map((file, index) => (
                    <motion.div
                      className="resultCard"
                      layoutId={index.toString()}
                      onClick={() => setSelectedId(index.toString())}
                    >
                      <Card padding="sm" shadow="none" radius="md">
                        <Group justify="space-between">
                          <Text>Test.pdf</Text>

                          <ActionIcon
                            variant="light"
                            aria-label="Settings"
                            color="red"
                            size="md"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <IconTrash
                              style={{ width: "70%", height: "70%" }}
                              stroke={1.5}
                            />
                          </ActionIcon>
                        </Group>
                      </Card>
                    </motion.div>
                  ))}
              </Stack>
            </ScrollArea>
          </Group>
        </Card>
      </Stack>
      {selectedId && <Overlay color="#000" backgroundOpacity={0.25} />}
      <AnimatePresence>
        {selectedId && (
          <motion.div layoutId={selectedId} className="resultCardWrapper">
            <Card
              padding="lg"
              radius="md"
              withBorder
              shadow="none"
              h={400}
              mt={30}
            >
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Norway Fjord Adventures</Text>
                <Badge color="pink">On Sale</Badge>
              </Group>

              <Text size="sm" c="dimmed">
                With Fjord Tours you can explore more of the magical fjord
                landscapes with tours and activities on and around the fjords of
                Norway
              </Text>

              <Button
                color="blue"
                onClick={() => setSelectedId(null)}
                fullWidth
                mt="md"
                radius="md"
              >
                Book classic tour now
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
