"use client";
import "@mantine/core/styles.css";
import "./globals.css";

import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { store } from "@/lib/store";

import React from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <MantineProvider defaultColorScheme="light">
            {children}
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
