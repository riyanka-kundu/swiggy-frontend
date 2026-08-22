"use client";

import React from "react";
import { Provider } from "react-redux";

import { Toaster } from "sonner";

import { persistor, store } from "@/redux/store/store";
import { CookiesProvider } from "react-cookie";
import { PersistGate } from "redux-persist/integration/react";

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}></PersistGate>
        <CookiesProvider>
          <Toaster />
          {children}
        </CookiesProvider>
        <Toaster position="top-right" theme="dark" richColors duration={3000} />
      </Provider>
    </>
  );
}
