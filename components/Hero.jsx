"use client";
import { fetchPokeData, selectPokeData } from "@/lib/features/pokeDataSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokeCard from "./PokeCard";
import { Button, Center, Group, Loader, ScrollArea } from "@mantine/core";

export default function Hero() {
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
      <ScrollArea
        viewportRef={scrollRef}
        h={"75vh"}
        offsetScrollbars
        scrollbars="y"
        scrollbarSize={15}
        onScrollPositionChange={onScrollPositionChange}
        type="always"
      >
        <Group justify="space-between">
          {data.map((pokeData) => (
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
