"use client";

import React from "react";
import { Provider } from "react-redux";

import { Toaster } from "sonner";

import { ThemeProvider } from "@/provider/theme-provider";
import { persistor, store } from "@/redux/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, gcTime: 24 * 60 * 60 * 1000 },
  },
});
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
          <QueryClientProvider client={queryClient}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              enableColorScheme={false}
            >
              {children}
              <Toaster
                duration={3000}
                position="bottom-right"
                richColors
                visibleToasts={5}
                mobileOffset={{ bottom: 24, right: 16 }}
              />
            </ThemeProvider>
          </QueryClientProvider>
        </CookiesProvider>
      </Provider>
    </>
  );
}
