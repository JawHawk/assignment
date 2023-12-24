"use client";
import Hero from "@/components/Hero";
import {
  Box,
  Center,
  Group,
  Select,
  Space,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";

export default function Home() {
  const [textInput, settextInput] = useState("");
  const [selectValue, setselectValue] = useState("");
  const pcView = useMediaQuery("(min-width: 600px)");

  return (
    <Center>
      <Box p={"xl"} w={"90%"}>
        <Group
          justify="space-between"
          gap={"sm"}
          wrap={pcView ? "no-wrap" : "wrap"}
        >
          <TextInput
            value={textInput}
            onChange={(event) => {
              settextInput(event.currentTarget.value);
              setselectValue(null);
            }}
            size="lg"
            w={"75%"}
            placeholder="Search Pokemon or Id"
            miw={250}
          />
          <Select
            leftSection={
              <Tooltip label="Scroll Filters for more types">
                <IconInfoCircle size={18} />
              </Tooltip>
            }
            size="lg"
            data={[
              "water",
              "bug",
              "fire",
              "poison",
              "electric",
              "flying",
              "dark",
              "ice",
              "dragon",
              "fairy",
              "fighting",
              "ghost",
              "grass",
              "ground",
              "normal",
              "psychic",
              "rock",
              "steel",
            ]}
            clearable
            searchable
            nothingFoundMessage="No such type"
            placeholder="Filter Types"
            value={selectValue}
            onChange={(val) => {
              setselectValue(val);
              settextInput("");
            }}
          />
        </Group>
        <Space h={50} />
        <Hero selectValue={selectValue} textInput={textInput} />
      </Box>
    </Center>
  );
}
