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
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";

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
  const pcView = useMediaQuery("(min-width: 600px)");

  return (
    <Group gap={"lg"} justify="space-between">
      <Text w={120}>
        {statName.charAt(0).toUpperCase() + statName.slice(1)}
      </Text>
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
  const [isHovered, setIsHovered] = useState(false);
  const pcView = useMediaQuery("(min-width: 600px)");
  const pokeTypeColors = {
    bug: "rgba(21, 138, 64, 0.75)",
    dark: "rgba(122, 130, 125, 1)",
    dragon: "rgba(96, 138, 235, 1)",
    electric: "rgba(235, 218, 94, 1)",
    fairy: "rgba(255, 150, 229, 1)",
    fighting: "orange",
    fire: "red",
    flying: "cyan",
    ghost: "rgba(136, 132, 176, 1)",
    grass: "lime",
    ground: "rgba(143, 121, 109, 1)",
    ice: "rgba(121, 222, 242, 1)",
    normal: "rgba(161, 117, 146, 1)",
    poison: "rgba(139, 52, 201, 1)",
    psychic: "pink",
    rock: "rgba(125, 110, 106, 1)",
    steel: "rgba(134, 163, 127, 1)",
    water: "cyan",
  };

  return (
    <>
      <Modal radius={"lg"} opened={opened} onClose={close} centered size={"lg"}>
        <Stack p={"md"} align="center">
          <Image fit="contain" h={130} w={130} src={imgUrl} />
          <Text fz={28} ta={"center"} fw={600}>
            {id}. {name.charAt(0).toUpperCase() + name.slice(1)}
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
        m={"xs"}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        style={
          isHovered
            ? {
                transition: "0.4s",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",
                cursor: "pointer",
              }
            : {
                cursor: "pointer",
                transition: "0.4s",
              }
        }
        withBorder
        radius={"lg"}
        w={pcView ? 335 : "max-content"}
        onClick={open}
        bg={pokeTypeColors[types[0].type.name]}
      >
        <Group
          gap={pcView ? "lg" : 5}
          p={5}
          align="flex-start"
          justify="space-between"
        >
          <Stack py={15}>
            <Stack gap={0}>
              <Text w={100} size="md">
                {id}.
              </Text>
              <Text
                w={100}
                size="xl"
                fw={600}
                style={{ wordBreak: "break-word" }}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Text>
            </Stack>
            <Stack gap={5}>
              {types.map((el, index) => (
                <Badge variant="light" key={index} color={"white"} size="md">
                  {el.type.name}
                </Badge>
              ))}
            </Stack>
          </Stack>
          <Image
            fit="contain"
            style={
              isHovered
                ? { animation: "tiltshaking 0.4s ease-in-out 2 forwards" }
                : {}
            }
            h={pcView ? 145 : 120}
            w={pcView ? 145 : 120}
            src={imgUrl}
          />
        </Group>
      </Card>
    </>
  );
}
