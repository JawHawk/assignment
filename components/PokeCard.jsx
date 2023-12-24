"use client";
import {
  Badge,
  Card,
  Group,
  Image,
  Modal,
  Progress,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

function ProgressGroup({ statName, statValue }) {
  const maxStatValues = {
    speed: 200,
    "special-defense": 250,
    "special-attack": 194,
    defense: 250,
    attack: 190,
    hp: 255,
  };
  const statColor = {
    speed: "yellow",
    "special-defense": "blue",
    "special-attack": "red",
    defense: "blue",
    attack: "red",
    hp: "teal",
  };

  return (
    <Group gap={"lg"} justify="space-between">
      <Text w={120}>{statName}</Text>
      <Text w={40}>{statValue}</Text>
      <Progress
        w={300}
        value={(statValue * 100) / maxStatValues[statName]}
        size={"lg"}
        radius={"lg"}
        color={statColor[statName]}
      />
    </Group>
  );
}

export default function PokeCard({ pokeData }) {
  const { imgUrl, id, name, types, stats } = pokeData;
  const [opened, { open, close }] = useDisclosure(false);
  const pokeTypeColors = {
    bug: "rgba(21, 138, 64, 1)",
    dark: "",
    dragon: "",
    electric: "",
    fairy: "",
    fighting: "",
    fire: "",
    flying: "",
    ghost: "",
    grass: "",
    ground: "",
    ice: "",
    normal: "",
    poison: "",
    psychic: "",
    rock: "",
    steel: "",
    water: "",
  };

  return (
    <>
      <Modal radius={"lg"} opened={opened} onClose={close} centered size={"lg"}>
        <Stack p={"md"} align="center">
          <Image fit="contain" h={130} w={130} src={imgUrl} />
          <Text fz={28} ta={"center"} fw={600}>
            {name}
          </Text>
          {stats.map((el, index) => (
            <ProgressGroup
              key={index}
              statName={el.stat.name}
              statValue={el.base_stat}
            />
          ))}
        </Stack>
      </Modal>
      <Card
        style={{ cursor: "pointer" }}
        shadow="lg"
        withBorder
        radius={"lg"}
        w={325}
        onClick={open}
        bg={"teal"}
      >
        <Group gap={"lg"} align="flex-start" justify="space-between">
          <Stack py={15}>
            <Text w={100} size="xl" fw={600}>
              {name}
            </Text>
            <Stack gap={5}>
              {types.map((el, index) => (
                <Badge key={index} color={"green"}>
                  {el.type.name}
                </Badge>
              ))}
            </Stack>
          </Stack>
          <Image fit="contain" h={150} w={150} src={imgUrl} />
        </Group>
      </Card>
    </>
  );
}
