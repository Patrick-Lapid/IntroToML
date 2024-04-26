import { Button, Stack, Group, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useRef } from "react";
import { useMediaQuery } from "@mantine/hooks";

interface DropZoneProps {
  handleFileUpload: (file: any) => void;
}

const FileDropZone = (props: DropZoneProps) => {
  const openRef = useRef<() => void>(null);
  const mediumScreen = useMediaQuery("(min-width: 670px)");
  return (
    <Stack gap="sm">
      <Dropzone
        onDrop={(files) => props.handleFileUpload(files[0])}
        onReject={(files) => console.log("rejected files", files)}
        miw={mediumScreen ? 600 : 200}
        openRef={openRef}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      <Button
        variant="light"
        color="violet"
        onClick={() => openRef.current?.()}
      >
        Upload Files
      </Button>
    </Stack>
  );
};

export default FileDropZone;
