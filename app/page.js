"use client";
import Hero from "@/components/Hero";
import { Box, Center, Group, Select, Space, TextInput } from "@mantine/core";

export default function Home() {
  return (
    <Center>
      <Box p={"xl"} w={"90%"}>
        <Group justify="space-between" gap={"sm"} wrap="no-wrap">
          <TextInput size="lg" w={"75%"} placeholder="Pokemon" miw={250} />
          <Select
            size="lg"
            defaultValue="water"
            data={["water"]}
            allowDeselect={false}
          />
        </Group>
        <Space h={75} />
        <Hero />
      </Box>
    </Center>
  );
}
