import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Overlay,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
  rgba,
} from "@mantine/core";
import FileDropZone from "./components/FileDropzone";
import { useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

interface File {
  index: string;
  loading: boolean;
  url: string;
}

function App() {
  const [files, setFiles] = useState<File[]>([
    // { index: "1", loading: true, url: "" },
    // { index: "2", loading: true, url: "" },
    // { index: "3", loading: true, url: "" },
  ]);
  const [selectedFile, setSelectedFile] = useState<null | File>(null);

  const fileUpload = (file: any) => {
    console.log(file);
    const src = URL.createObjectURL(file);
    setFiles((prevFiles) => [
      ...prevFiles,
      {
        index: file.name,
        loading: false,
        url: src,
      },
    ]);
    // avoid memory leaks
    return () => URL.revokeObjectURL(src);
  };

  const handleFileSelection = (file: File) => {
    setSelectedFile(file);
  };

  const removeFile = (id: string) => {
    const newFiles = files.filter((file) => file.index !== id);
    setFiles(newFiles);
  };

  return (
    <>
      <div className="absolute">
        <div className="meshContainer">
          <div className="bg-shape1 bg-primary bg-blur"></div>
          <div className="bg-shape2 bg-purple bg-blur"></div>
          <div className="bg-shape3 bg-teal bg-blur"></div>
        </div>
      </div>
      <Stack mt={140} align="center" gap="lg" px="lg">
        <Text ta="center" fw={700} size="xl">
          Upload Document for Text Extraction
        </Text>
        <Card radius="md" padding="lg" shadow="md" bg={rgba("#FFFFFF", 0.6)}>
          <Group justify="space-between" gap={16}>
            <FileDropZone handleFileUpload={fileUpload} />
            <ScrollArea w={500} h={302}>
              <Stack gap={8} mt={1}>
                {files.length > 0 &&
                  files.map((file) => (
                    <motion.div
                      key={file.index}
                      className="resultCard"
                      layoutId={file.index}
                      onClick={() => handleFileSelection(file)}
                    >
                      <Card padding="sm" shadow="none" radius="md">
                        <Group justify="space-between">
                          <Text>{file.index}</Text>

                          <ActionIcon
                            variant="light"
                            aria-label="Settings"
                            color={file.loading ? "violet" : "red"}
                            size="md"
                            loading={file.loading}
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(file.index);
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
      {selectedFile && <Overlay color="#000" backgroundOpacity={0.25} />}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            layoutId={selectedFile.index}
            className="resultCardWrapper"
          >
            <Card
              className="resultCardModal"
              padding="lg"
              radius="md"
              withBorder
              shadow="none"
              w={900}
              h={575}
              mt={30}
            >
              <Stack justify="space-between" h="100%">
                <Stack>
                  <Group justify="space-between" mb="sm">
                    <Text fw={700} size="xl">
                      Text Extraction Image
                    </Text>
                    <Badge color="grape" variant="light">
                      {selectedFile.index}
                    </Badge>
                  </Group>

                  {selectedFile.loading ? (
                    <>
                      {selectedFile.url && (
                        <div className="parent">
                          <img
                            src={selectedFile.url}
                            alt="Uploaded"
                            height={200}
                          />
                        </div>
                      )}
                      <Text fw={700} size="xl" mt="sm" w="100%">
                        Text Extraction Output
                      </Text>
                      <ScrollArea h={120}>
                        <Skeleton height={8} radius="xl" width="80%" />
                        <Skeleton height={8} mt={6} radius="xl" width="70%" />
                        <Skeleton height={8} mt={6} radius="xl" width="74%" />
                        <Skeleton height={8} mt={6} radius="xl" width="70%" />
                        <Skeleton height={8} mt={6} radius="xl" width="75%" />
                        <Skeleton height={8} mt={6} radius="xl" width="83%" />
                        <Skeleton height={8} mt={6} radius="xl" width="90%" />
                        <Skeleton height={8} mt={6} radius="xl" width="95%" />
                        <Skeleton height={8} mt={6} radius="xl" width="70%" />
                        <Skeleton height={8} mt={6} radius="xl" width="74%" />
                        <Skeleton height={8} mt={6} radius="xl" width="70%" />
                        <Skeleton height={8} mt={6} radius="xl" width="75%" />
                        <Skeleton height={8} mt={6} radius="xl" width="83%" />
                        <Skeleton height={8} mt={6} radius="xl" width="90%" />
                        <Skeleton height={8} mt={6} radius="xl" width="95%" />
                      </ScrollArea>
                    </>
                  ) : (
                    <Group>
                      {selectedFile.url && (
                        <div className="parent">
                          <img
                            src={selectedFile.url}
                            alt="Uploaded"
                            height={200}
                          />
                        </div>
                      )}
                      <Text fw={700} size="xl" mt="sm" w="100%">
                        Text Extraction Output
                      </Text>
                      <ScrollArea h={120} px="sm">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Assumenda ut fugiat optio nesciunt! Quidem,
                        consequatur dicta unde accusamus officiis, eius neque
                        quis, recusandae rem doloribus harum odit et assumenda
                        modi. Lorem ipsum dolor sit, amet consectetur
                        adipisicing elit. Assumenda ut fugiat optio nesciunt!
                        Quidem, consequatur dicta unde accusamus officiis, eius
                        neque quis, recusandae rem doloribus harum odit et
                        assumenda modi. Lorem ipsum dolor sit, amet consectetur
                        adipisicing elit. Assumenda ut fugiat optio nesciunt!
                        Quidem, consequatur dicta unde accusamus officiis, eius
                        neque quis, recusandae rem doloribus harum odit et
                        assumenda modi.
                      </ScrollArea>
                    </Group>
                  )}
                </Stack>
                <Button
                  color="blue"
                  onClick={() => setSelectedFile(null)}
                  fullWidth
                  mt="md"
                  radius="md"
                >
                  Close
                </Button>
              </Stack>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
