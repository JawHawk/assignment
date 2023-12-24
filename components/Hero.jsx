"use client";
import { fetchPokeData, selectPokeData } from "@/lib/features/pokeDataSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokeCard from "./PokeCard";
import { Center, Group, Loader, ScrollArea, Text } from "@mantine/core";

export default function Hero({ selectValue, textInput }) {
  const dispatch = useDispatch();

  const { data, status } = useSelector(selectPokeData);
  const scrollRef = useRef(null);
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });

  useEffect(() => {
    dispatch(fetchPokeData());
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      let pos =
        scrollRef.current.scrollHeight -
        scrollPosition.y -
        0.75 * window.innerHeight;

      if (scrollPosition.y > 0 && pos < 75 && status != "loading") {
        dispatch(fetchPokeData());
      }
    }
  }, [scrollPosition]);
  return (
    <div>
      <Group mb={"md"}>
        <Text fw={600} size="lg">
          Fetched & Showing Pokemons from id 1 to {data.length}
        </Text>
        <Text c={"red"}>
          Note: Only those Pokemon will appear in search results whose ids fall
          in the range. Everytime you scroll to bottom, more pokemons are
          fetched
        </Text>
      </Group>
      <ScrollArea
        viewportRef={scrollRef}
        h={"75vh"}
        offsetScrollbars
        scrollbars="y"
        scrollbarSize={15}
        onScrollPositionChange={onScrollPositionChange}
        type="always"
      >
        <Group justify="space-between" align="stretched">
          {!selectValue &&
            !textInput &&
            data.map((pokeData) => (
              <PokeCard key={pokeData.id} pokeData={pokeData} />
            ))}
          {selectValue &&
            data
              .filter((el) => {
                const types = el.types.map((poketype) => poketype.type.name);
                return types.includes(selectValue);
              })
              .map((pokeData) => (
                <PokeCard key={pokeData.id} pokeData={pokeData} />
              ))}
          {textInput &&
            data
              .filter(
                (el) =>
                  el.name.includes(textInput) || el.id.toString() == textInput
              )
              .map((pokeData) => (
                <PokeCard key={pokeData.id} pokeData={pokeData} />
              ))}
        </Group>
        {status == "loading" && (
          <Center>
            <Loader my={"xl"} />
          </Center>
        )}
      </ScrollArea>
    </div>
  );
}
